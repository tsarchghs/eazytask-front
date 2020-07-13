import React from "react";
import { Link } from "react-router-dom";

const EmailForm = props => {
    return (
        <div className="container">
            <div className="content">
                <header className="w-subtitle">
                    <Link to="/login">
                        <span className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                    </Link>
                    <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                    <p className="show__mobile">Reset account</p>
                </header>
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
                        <form onSubmit={props.onSubmit} className="register__form">
                            <input value={props.email} onChange={props.onChange} type="Email" placeholder="Email" className="input" />
                        </form>
                        <div className="flex-grow img-wrapper flex aic jcc">
                            <img className="img__mobile " src="/images/auth.png" alt="" />
                        </div>
                        <div className="buttons__group">
                            <button onClick={props.onSubmit} type={props.buttonType} style={props.buttonStyle} type="submit" className="button__style">Next</button>
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
    return (
        <React.Fragment>
            Reset account <br /><br />
            Forgot password?<br />
            Enter your email<br /> <br />
            <form onSubmit={props.onSubmit}>
                <label>
                    Email: <input
                        type="email"
                        value={props.email}
                        onChange={props.onChange}
                    />
                </label>
                <button type={props.buttonType} style={props.buttonStyle}>Submit</button>
            </form>
        </React.Fragment>
    )
}

export default EmailForm;