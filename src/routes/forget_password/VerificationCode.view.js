import React from "react";
import * as Yup from "yup";
import { withRouter, Link } from "react-router-dom";
import queryString from "query-string";
import InternalHeader from "./InternalHeader.view";

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
        this.showError = {
            "requestBody.email must be a valid email": "Invalid code"
        }
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
                    <InternalHeader/>
                    <section className="two-column__layout setup__mobile create-task reset-password">
                            <div className="two-column__info flex flex-column">
                                <div className="background-title mb30">
                                    <h1>{this.props.getTrans(this.props.translations.text_4)}</h1>
                                <p className="web__subtitle">{this.props.getTrans(this.props.translations.mobile.text_3)}</p>
                                </div>
                                <h4 className="show__mobile title-with-subtitle text-center">
                                {this.props.getTrans(this.props.translations.text_4)}
                    <p className="text-center">{this.props.getTrans(this.props.translations.mobile.text_3)}</p>
                                </h4>
                                <form onSubmit={this.onSubmit} className="flex-grow">
                                    {
                                        this.props.app_validateVerificationCode.err &&
                                        this.props.app_validateVerificationCode.err.response &&
                                        this.props.app_validateVerificationCode.err.response.data &&
                                        this.props.app_validateVerificationCode.err.response.data.errors &&
                                        this.props.app_validateVerificationCode.err.response.data.errors.map(err => 
                                            <div>{
                                                (
                                                    this.props.translations.errors[err] && 
                                                    this.props.translations.errors[err][this.props.app_lang]
                                                ) || 
                                                this.showError[err] || err
                                            }</div>
                                        )
                                    }
                                    <div className="small-input">
                                        <CodeInputs
                                            onChange={this.onChange}
                                            values={this.state.values}
                                        />
                                        <button type="submit" style={{display:"none"}}/>
                                    </div>
                                </form>
                                <div className="flex-grow img-wrapper flex aic jcc hide-on-mobile">
                                    <img className="img__mobile " src="/images/flymail.png" alt="" />
                                </div>
                                <div className="buttons__group">
                                    <button 
                                        type={buttonType} 
                                        style={buttonStyle} 
                                        onClick={this.onSubmit}
                                        className="button__style"
                                    >{this.props.getTrans(this.props.translations.text_2)}</button>
                                </div>
                            </div>
                        <div className="two-column__img">
                            <div className="two-column__image">
                                <img src="/images/flymail.png" alt="" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default withRouter(VerificationCode);