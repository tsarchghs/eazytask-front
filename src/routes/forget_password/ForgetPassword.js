import React from "react";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import EmailForm from "./EmailForm.view";
import VerificationCode from "./VerificationCode.view";
import queryString from "query-string";


class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            valid: false
        }
        this.emailSchema = Yup.string().required().email()
    }
    isEmailValid = async email => this.setState({ valid: await this.emailSchema.isValid(email) });
    onChange = key => e => this.setState({ [key]: e.target.value })
    onEmailFormSubmit = e => {
        e.preventDefault();
        this.props.history.push("?email=" + this.state.email)
    }
    onVerificationCodeSubmit = code => {
        console.log("onVerificationCodeSubmit",code)
    }
    render() {
        let buttonType = this.state.valid ? "submit" : "button"
        let buttonStyle = this.state.valid ? { color: "black" } : { color: "red" }
        
        let { search } = this.props.location;
        let params = queryString.parse(search);

        if (!params.email) return <EmailForm 
            onSubmit={this.onEmailFormSubmit}
            buttonType={buttonType}
            buttonStyle={buttonStyle}
            email={this.state.email} 
            onChange={e => this.setState({ email: e.target.value, valid: this.isEmailValid(e.target.value) })} 
        />
        if (params.email) return <VerificationCode onSubmit={this.onVerificationCodeSubmit} />
    }
}

export default withRouter(ForgetPassword);