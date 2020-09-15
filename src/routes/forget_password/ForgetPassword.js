import React from "react";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import EmailForm from "./EmailForm.view";
import VerificationCode from "./VerificationCode.view";
import NewPasswordForm from "./NewPasswordForm.view";
import Success from "./Success.view";
import queryString from "query-string";
import { compose } from "recompose";

import { 
    sendVerificationCode, 
    validateVerificationCode,
    resetPassword,
    reInitialiseForgetPassword
} from "../../actions/app";

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            valid: false
        }
        this.emailSchema = Yup.string().required().email()
    }
    componentDidMount() {
        this.props.reInitialiseForgetPassword()
    }
    isEmailValid = async email => this.setState({ valid: await this.emailSchema.isValid(email) });
    onChange = key => e => this.setState({ [key]: e.target.value })
    onEmailFormSubmit = e => {
        e.preventDefault();
        this.props.sendVerificationCode(this.state.email);
        this.props.history.push("?email=" + this.state.email)
    }
    onVerificationCodeSubmit = code => {
        let { search } = this.props.location;
        let params = queryString.parse(search);
        this.props.validateVerificationCode({ email: params.email, code })
    }
    onNewPasswordSubmit = e => {
        e.preventDefault();
        let { search } = this.props.location;
        let params = queryString.parse(search);
        let { new_password, confirm_new_password } = this.state;
        let args = {
            email: params.email, code: Number(params.valid_code),
            new_password, confirm_new_password 
        }
        this.props.resetPassword(args)
    }
    getTrans = obj => {
        let data = obj[this.props.app_lang];
        if (typeof (data) == "string") return data;
        if (data.length) {
            return data.map(str => <React.Fragment>
                {str}<br/>
            </React.Fragment>)
        }
    }
    render() {
        let buttonType = this.state.valid ? "submit" : "button"
        let buttonStyle = this.state.valid ? { backgroundColor: undefined } : { backgroundColor: "darkgrey" }
        
        let { search } = this.props.location;
        let params = queryString.parse(search);

        let commonProps = { 
            getTrans: this.getTrans,
            translations: this.props.translations,
            app_lang: this.props.app_lang,
            common: this.props.common
        }

        if (params.success) return <Success {...commonProps} />
        if (params.valid_code && params.email) return <NewPasswordForm
            onSubmit={this.onNewPasswordSubmit}
            new_password={this.state.new_password}
            onNewPasswordChange={this.onChange("new_password")}
            confirm_new_password={this.state.confirm_new_password}
            onConfirmNewPasswordChange={this.onChange("confirm_new_password")}
            app_resetPassowrd={this.props.app_resetPassowrd}
            {...commonProps}
        />
        if (!params.email) return <EmailForm 
            onSubmit={this.onEmailFormSubmit}
            buttonType={buttonType}
            buttonStyle={buttonStyle}
            email={this.state.email} 
            onChange={e => this.setState({ email: e.target.value, valid: this.isEmailValid(e.target.value) })} 
            {...commonProps}
        />
        if (params.email) return <VerificationCode 
            app_validateVerificationCode={this.props.app_validateVerificationCode} 
            onSubmit={this.onVerificationCodeSubmit} 
            {...commonProps}
        />
    }
}

const mapStateToProps = state => ({
    app_validateVerificationCode: state.app.validateVerificationCode,
    app_resetPassowrd: state.app.resetPassword,
    translations: state.app_lang.data["/forget-password"],
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})

export default 
    compose(
        withRouter, 
        connect(
            mapStateToProps, 
            { 
                sendVerificationCode, 
                validateVerificationCode, 
                resetPassword,
                reInitialiseForgetPassword
            }
        )
    )(ForgetPassword);