import React from "react";
import { withRouter, Link } from "react-router-dom";
import queryString from "query-string";
import InternalHeader from "./InternalHeader.view";

let showError = {
    "requestBody.confirm_new_password is a required field": "Confirm new password is a required field",
    "requestBody.new_password is a required field": "New password is a required field",
    "requestBody.confirm_new_password must be at least 6 characters": "Confirm new password must be at least 6 characters",
    "requestBody.new_password must be at least 6 characters": "New password must be at least 6 characters",
    "requestBody.confirm_new_password must be one of the following values: Ref(new_password)": "Confirm new password is not the same as new password."
}

class NewPasswordForm extends React.Component {
    componentDidMount(){
        this.inputRef.focus()
    }
    render(){
        if (this.props.app_resetPassowrd.success)
            this.props.history.push("?success=true")
        let { loading } = this.props.app_resetPassowrd;
        return (
            <div className="container">
                <div className="content">
                    <InternalHeader/>
                    <section className="two-column__layout setup__mobile create-task reset-password">
                        <div className="two-column__info flex flex-column">
                            <div className="background-title mb30">
                                <h1>{this.props.getTrans(this.props.translations.text_5)}</h1>
                                <p className="web__subtitle">Please write your new password down below</p>
                                <p className="shadow__title no-contain">Reset when you forgot password</p>
                            </div>
                            <h4 className="show__mobile title-with-subtitle text-center">
                                {this.props.getTrans(this.props.translations.text_5)}
                <p className="text-center">Please write your new password <br /> down below </p>
                            </h4>
                            <form onSubmit={this.props.onSubmit} className="register__form flex-grow">
                                {
                                    this.props.app_resetPassowrd.err &&
                                    this.props.app_resetPassowrd.err.response &&
                                    this.props.app_resetPassowrd.err.response.data &&
                                    this.props.app_resetPassowrd.err.response.data.errors.map(err => <div class="register__form--error">{showError[err] || err}<br /></div>)
                                }
                                <br />
                                <input
                                    ref={ref => this.inputRef = ref}
                                    value={this.props.new_password}
                                    onChange={this.props.onNewPasswordChange}
                                    type="password" 
                                    placeholder={this.props.getTrans(this.props.translations.text_6)} className="input" />
                                <input
                                    value={this.props.confirm_new_password}
                                    onChange={this.props.onConfirmNewPasswordChange}
                                    type="password" 
                                    placeholder={this.props.getTrans(this.props.translations.text_7)}
                                    className="input" />
                                <button type="submit" style={{ display: "none" }}>
                                    {this.props.getTrans(this.props.translations.text_2)}
                                </button>
                            </form>
                            {/* 	<div class="flex-grow img-wrapper flex aic jcc">
					<img class="img__mobile " src="/images/auth.png" alt="">
				</div> */}
                            <div className="buttons__group">
                                <button onClick={this.props.onSubmit} type="submit" className="button__style">
                                    {this.props.getTrans(this.props.translations.text_2)}
                                </button>
                            </div>
                        </div>
                        <div className="two-column__img">
                            <div className="two-column__image">
                                <img src="/images/auth.png" alt="" />
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

export default withRouter(NewPasswordForm);