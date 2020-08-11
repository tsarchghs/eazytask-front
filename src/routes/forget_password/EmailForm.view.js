import React from "react";
import { Link } from "react-router-dom";
import InternalHeader from "./InternalHeader.view";

class EmailForm extends React.Component {
    componentDidMount(){
        this.emailRef.focus()
    }
    render(){
        return (
            <div className="container">
                <div className="content">
                    <InternalHeader/>
                    <section className="two-column__layout setup__mobile create-task reset-password">
                        <div className="two-column__info flex flex-column">
                            <div className="background-title mb30">
                                <h1>Forgot password?</h1>
                                <p className="web__subtitle">Now you can login with your new password</p>
                                <p className="shadow__title no-contain">Reset when you forgot password</p>
                            </div>
                            <h4 className="show__mobile title-with-subtitle text-center">
                                Forgot password?
                                <p>Enter your email</p>
                            </h4>
                            <h4 className="mt30 hide-on-mobile">Enter your email</h4>
                            <form 
                                onSubmit={this.props.onSubmit} 
                                className="register__form flex-grow" 
                                style={{ minHeight: 65}}
                            >
                                <input ref={ref => this.emailRef = ref} value={this.props.email} onChange={this.props.onChange} type="Email" placeholder="Email" className="input" />
                            </form>
                            <div className="flex-grow img-wrapper flex aic jcc hide-on-mobile">
                                <img className="img__mobile " src="/images/auth.png" alt="" />
                            </div>
                            <div className="buttons__group">
                                <button onClick={this.props.onSubmit} type={this.props.buttonType} style={this.props.buttonStyle} type="submit" className="button__style">Next</button>
                            </div>
                        </div>
                        <div className="two-column__img">
                            <div className="two-column__image">
                                <img src="/images/auth.png" alt="" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default EmailForm;