import React from "react";
import { Link, withRouter } from "react-router-dom";

const Success = props => {
    return (
        <div className="container">
            <div className="content">
                <header className="w-subtitle text-center">
                    {/* <span onClick={() => {
                        try {
                            props.history.goBack()
                        } catch (err) {
                            props.history.push("/dashboard")
                        }
                    }} className="show__mobile"><img  src="/images/arrow.jpeg" alt="" /></span> */}
                    <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                    <p className="show__mobile">Reset account</p>
                </header>
                <section className="two-column__layout setup__mobile create-task reset-password text-center">
                    <div className="two-column__info flex flex-column">
                        <div className="background-title mb30">
                            <h1>Phone number updated</h1>
                            <p className="web__subtitle">You will be notified now with your new phone number</p>
                        </div>
                        <h4 className="show__mobile title-with-subtitle text-center">
                            Phone number updated
                <p className="text-center">You will be notified now with your new <br />phone number</p>
                        </h4>
                        <div className="flex-grow img-wrapper flex aic jcc one-section-show">
                            <img className="img__mobile " src="/images/smile.png" alt="" />
                        </div>
                        <div className="buttons__group aic">
                            <button onClick={() => {
                                window.location.href = "/my_profile_edit"
                            }} className="button__style">Profile</button>
                        </div>
                    </div>
                    <div className="two-column__img hide-on-desktop">
                        <div className="two-column__image">
                            <img src="/images/smile.png" alt="" />
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

export default withRouter(Success)