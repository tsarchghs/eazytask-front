import React from "react";
import axios from "../../utils/axios";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";

class CodeInputs extends React.Component {
    componentDidMount() {
        this["input_0"].focus();
    }
    render() {
        let inputs = []
        for (let x = 0; x < 6; x++) inputs.push(
            <input
                ref={ref => this["input_" + x] = ref}
                type="number"
                value={this.props.values[x]}
                onChange={e => {
                    let { value } = e.target;
                    if (value.length > 1) e.target.value = value[value.length - 1]
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
            success: false,
            loading: false,
            error: undefined,
            values: [],
            valid: false,
            showError: ""
        }
        this.valuesSchema = Yup.array(Yup.string().required().min(1).max(1)).test("len", "Unspecified", val => val.length == 6)
    }
    onSubmit = e => {
        e.preventDefault();
        if (!this.state.valid) return;
        this.setState({ loading: true, showError: "" })
        let code = Number(this.state.values.join(""));
        axios.post("/users/validate_phone_verification_code", { code })
            .then(data => {
                this.setState({
                    error: undefined,
                    success: true,
                    loading: false
                })
                this.props.history.push("?success=1")
            })
            .catch(e => this.setState({
                error: e,
                success: false,
                loading: false,
                showError: "Invalid code"
            }))
    }
    onChange = x => async e => {
        let { value } = e.target;
        let values = this.state.values;
        values[x] = value
        let valid = await this.valuesSchema.isValid(this.state.values);
        console.log("VALID", valid)
        this.setState({ values, valid })
    }
    render(){
        return (
            <div className="container">
                <div className="content">
                    <header className="w-subtitle">
                        <span onClick={e => {
                            try {
                                this.props.history.goBack()
                            } catch (err) {
                                this.props.history.push("/")
                            }
                        }} className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                        <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                        <p className="show__mobile">Reset account</p>
                    </header>
                    <section className="two-column__layout setup__mobile create-task reset-password">
                        <div className="two-column__info flex flex-column">
                            <div className="background-title mb30">
                                <h1>Verification code</h1>
                                <p className="web__subtitle">A code has been to your phone number, please <br /> enter it here</p>
                                <p className="shadow__title no-contain">Reset when you forgot password</p>
                            </div>
                            <h4 className="show__mobile title-with-subtitle text-center">
                                Verification code
                <p className="text-center">A code has been to your phone number, please <br /> enter it here</p>
                            </h4>
                            {this.state.showError}
                            <form className="flex-grow" onSubmit={this.onSubmit}>
                                <div className="small-input flex-grow" style={{ alignItems: 'baseline' }}>
                                    <CodeInputs values={this.state.values} onChange={this.onChange} />
                                </div>
                                <button style={{ display: "hidden" }} type="submit"/>
                            </form>
                            <div className="flex-grow img-wrapper flex aic jcc hide-on-mobile">
                                <img className="img__mobile " src="/images/flymail.png" alt="" />
                            </div>
                            <div className="buttons__group">
                                <button
                                    style={!this.state.valid ? { backgroundColor: "darkgrey" } : {}}
                                    onClick={this.state.loading ? undefined : this.onSubmit}
                                    className="button__style"
                                >Next</button>
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

    }
}

export default withRouter(VerificationCode)