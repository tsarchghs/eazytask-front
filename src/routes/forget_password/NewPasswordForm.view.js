import React from "react";
import { withRouter, Link } from "react-router-dom";
import queryString from "query-string";

const NewPasswordForm = props => {
    if (props.app_resetPassowrd.success)  
        props.history.push("?success=true")  
    let { loading } = props.app_resetPassowrd;
    return (
        <div className="container">
            <div className="content">
                <header className="w-subtitle">
                    <Link to={`?email=${queryString.parse(props.location.search).email}`}>
                        <span className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                    </Link>
                    <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                    <p className="show__mobile">Reset account</p>
                </header>
                <section className="two-column__layout setup__mobile create-task reset-password">
                    <div className="two-column__info flex flex-column">
                        <div className="background-title mb30">
                            <h1>New password</h1>
                            <p className="web__subtitle">Please write your new password down below</p>
                            <p className="shadow__title no-contain">Reset when you forgot password</p>
                        </div>
                        <h4 className="show__mobile title-with-subtitle text-center">
                            New password
                <p className="text-center">Please write your new password <br /> down below </p>
                        </h4>
                        <form onSubmit={props.onSubmit} className="register__form flex-grow">
                            {
                                props.app_resetPassowrd.err &&
                                props.app_resetPassowrd.err.response &&
                                props.app_resetPassowrd.err.response.data &&
                                props.app_resetPassowrd.err.response.data.errors.map(err => <div>{err}<br /></div>)
                            }
                            <input 
                                value={props.new_password}
                                onChange={props.onNewPasswordChange}

                            type="password" placeholder="New Password" className="input" />
                            <input 
                                value={props.confirm_new_password}
                                onChange={props.onConfirmNewPasswordChange}

                            type="password" placeholder="Confirm Password" className="input" />
                            <button type="submit" style={{display: "none"}}>Next</button>
                        </form>
                        {/* 	<div class="flex-grow img-wrapper flex aic jcc">
					<img class="img__mobile " src="/images/auth.png" alt="">
				</div> */}
                        <div className="buttons__group">
                            <button onClick={props.onSubmit} type="submit" className="button__style">Next</button>
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
            New password<br />
            Please write your new password down below<br /> <br />
            <form onSubmit={props.onSubmit}>
                {
                    props.app_resetPassowrd.err &&
                    props.app_resetPassowrd.err.response &&
                    props.app_resetPassowrd.err.response.data &&
                    props.app_resetPassowrd.err.response.data.errors.map(err => <div>{err}<br/></div>)

                }
                <label>
                    New password: <input
                        type="password"
                        value={props.new_password}
                        onChange={props.onNewPasswordChange}
                    />
                    Confirm new password: <input
                        type="password"
                        value={props.confirm_new_password}
                        onChange={props.onConfirmNewPasswordChange}
                    />
                </label>
                {
                    loading ? "Loading" :
                    <button type={props.buttonType} style={props.buttonStyle}>Submit</button>
                }
            </form>
        </React.Fragment>
    )
}

export default withRouter(NewPasswordForm);