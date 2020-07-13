import React from "react";
import * as Yup from "yup";
import { withRouter, Link } from "react-router-dom";
import queryString from "query-string";

class CodeInputs extends React.Component {
    render(){
        let inputs = []
        for (let x=0;x<6;x++) inputs.push(
            <input 
                ref={ref => this["input_" + x] = ref} 
                type="number" 
                value={this.props.values[x]} 
                onChange={e => {
                    let { value } = e.target;
                    if (value.length > 1) e.target.value = value[value.length-1] 
                    this.props.onChange(x)(e);
                    let i;
                    if (value) i = x == 5 ? 0 : x + 1
                    else i = x == 0 ? 5 : x - 1
                    this["input_" + i].focus();
                }} 
            />
        )
        return inputs;
    }
}

class VerificationCode extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            values: [],
            valid: false
        }
        this.valuesSchema = Yup.array(Yup.string().required().min(1).max(1)).test("len", "Unspecified", val => val.length == 6)
    }
    onChange = x => async e => {
        let { value } = e.target;
        this.setState(prevState => {
            prevState.values[x] = value;
            return prevState;
        },async () => {
            let valid = await this.valuesSchema.isValid(this.state.values);
            this.setState({ valid })
        })
    }
    onSubmit = async e => {
        e.preventDefault();
        let isValid = await this.valuesSchema.isValid(this.state.values);
        console.log({isValid});
        if (!isValid) return;
        let code = Number(this.state.values.join(""))
        this.props.onSubmit(code)
    }
    render(){
        let { loading } = this.props.app_validateVerificationCode
        if (this.props.app_validateVerificationCode.success) {
            let code = Number(this.state.values.join(""));
            let { search } = this.props.location;
            let params = queryString.parse(search);
            this.props.history.push(`?valid_code=${code}&email=${params.email}`)
        }
        let buttonType = this.state.valid ? "submit" : "button"
        let buttonStyle = this.state.valid ? { backgroundColor: undefined } : { backgroundColor: "darkgrey" }
        return (

            <div className="container">
                <div className="content">
                    <header className="w-subtitle">
                        <Link to="?">
                            <span className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                        </Link>
                        <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                        <p className="show__mobile">Reset account</p>
                    </header>
                    <section className="two-column__layout setup__mobile create-task reset-password">
                            <div className="two-column__info flex flex-column">
                                <div className="background-title mb30">
                                    <h1>Verification code</h1>
                                    <p className="web__subtitle">A code has been to your email, please <br /> enter it here</p>
                                    <p className="shadow__title no-contain">Reset when you forgot password</p>
                                </div>
                                <h4 className="show__mobile title-with-subtitle text-center">
                                    Verification code
                    <p className="text-center">A code has been to your email, please <br /> enter it here</p>
                                </h4>
                                <form onSubmit={this.onSubmit}>
                                    {
                                        this.props.app_validateVerificationCode.err &&
                                        this.props.app_validateVerificationCode.err.response &&
                                        this.props.app_validateVerificationCode.err.response.data &&
                                        this.props.app_validateVerificationCode.err.response.data.errors &&
                                        this.props.app_validateVerificationCode.err.response.data.errors.map(err => <div>{err}</div>)

                                    }
                                    <div className="small-input">
                                        <CodeInputs
                                            onChange={this.onChange}
                                            values={this.state.values}
                                        />
                                        <button type="submit" style={{display:"none"}}/>
                                    </div>
                                </form>
                                <div className="flex-grow img-wrapper flex aic jcc">
                                    <img className="img__mobile " src="/images/flymail.png" alt="" />
                                </div>
                                <div className="buttons__group">
                                    <button 
                                        type={buttonType} 
                                        style={buttonStyle} 
                                        onClick={this.onSubmit}
                                    className="button__style">Next</button>
                                </div>
                            </div>
                        <div className="two-column__img">
                            <div className="two-column__image">
                                <img src="/images/flymail.png" alt="" />
                            </div>
                            {/* 	<div class="dots__group">
					<span class="dot active"></span>
					<span class="dot"></span>
					<span class="dot"></span>
				</div> */}
                        </div>
                    </section>
                </div>
            </div>

        )
        return (
            <React.Fragment>
                Reset account <br /><br />
                Verification code<br />
                A code has been to your email, please enter it here<br /> <br />
                {
                    this.props.app_validateVerificationCode.err && 
                    this.props.app_validateVerificationCode.err.response && 
                    this.props.app_validateVerificationCode.err.response.data &&
                    this.props.app_validateVerificationCode.err.response.data.errors.map(err => <div>{err}</div>)

                }
                <form onSubmit={this.onSubmit}>
                    <div style={{ display: "flex" }}>
                        <CodeInputs
                            onChange={this.onChange}
                            values={this.state.values}
                        />
                    </div>
                    {
                        loading ? "Loading" :
                        <button type={this.props.buttonType} style={this.props.buttonStyle}>Submit</button>
                    }
                </form>
            </React.Fragment>
        )
    }
}

export default withRouter(VerificationCode);