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
                    <Link to="/dashboard">
                        <img className="logo__img" src="/images/logo.svg" alt="" />
                    </Link>
                    <p className="show__mobile">{props.getTrans(props.translations.text_6)}</p>
                </header>
                <section className="two-column__layout setup__mobile create-task reset-password text-center">
                    <div className="two-column__info flex flex-column">
                        <div className="background-title mb30">
                            <h1>{props.getTrans(props.translations.text_6)}</h1>
                            <p className="web__subtitle">{props.getTrans(props.translations.text_8)}</p>
                        </div>
                        <h4 className="show__mobile title-with-subtitle text-center">
                            {props.getTrans(props.translations.text_6)}
                            <p className="text-center">{props.getTrans(props.translations.text_10)}</p>
                        </h4>
                        <div className="flex-grow img-wrapper flex aic jcc one-section-show">
                            <img className="img__mobile " src="/images/smile.png" alt="" />
                        </div>
                        <div className="buttons__group aic">
                            <button onClick={() => {
                                window.location.href = "/my_profile_edit"
                            }} className="button__style">{props.getTrans(props.translations.text_9)}</button>
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