import React from "react";
import { Link } from "react-router-dom";
import InternalHeader from "./InternalHeader.view";

export default props => (
    <div className="container">
        <div className="content">
            <InternalHeader/>
            <section className="two-column__layout setup__mobile create-task reset-password text-center">
                <div className="two-column__info flex flex-column">
                    <div className="background-title mb30">
                        <h1>Password updated</h1>
                        <p className="web__subtitle">Now you can login with your new password</p>
                    </div>
                    <h4 className="show__mobile title-with-subtitle text-center">
                        Password updated
                <p className="text-center">Now you can login with your new <br />password</p>
                    </h4>
                    <div className="flex-grow img-wrapper flex aic jcc one-section-show">
                        <img className="img__mobile " src="/images/smile.png" alt="" />
                    </div>
                    <div className="buttons__group aic">
                        <Link to="/login">
                            <button className="button__style">Login</button>
                        </Link>
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