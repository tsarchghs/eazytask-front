import React from "react";
import PhoneInput from "react-phone-number-input";
import { withRouter, Link } from "react-router-dom";

const PhoneNumberForm = props => {
    return (
        <div className="container">
            <div className="content pb50">
                <header className="w-subtitle">
                <span onClick={() => {
                        try {
                            props.history.goBack()
                        } catch (err) {
                            props.history.push("/dashboard")
                        }
                    }} className="arraw hide-on-mobile" style={{cursor: 'pointer'}}><img src="/images/arrow.jpeg" alt="" style={{width: '30px', top: '-3px', position: 'relative', marginRight: '20px'}} /></span>

                    <span onClick={() => {
                        try {
                            props.history.goBack()
                        } catch (err) {
                            props.history.push("/dashboard")
                        }
                    }} className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                    <Link to="/dashboard">
                        <img className="logo__img" src="/images/logo.svg" alt="" />
                    </Link>
                    <p className="show__mobile">{props.getTrans(props.translations.text_3_m)}</p>
                </header>
                <section className="two-column__layout setup__mobile create-task reset-password">
                    <div className="two-column__info flex flex-column">
                        <div className="background-title mb30">
                            <h1>{props.getTrans(props.translations.text_1)}</h1>
                        </div>
                        <h4 className="show__mobile title-with-subtitle text-center">
                            {props.getTrans(props.translations.text_1)}
                <p>{props.getTrans(props.translations.text_2)}</p>
                        </h4>
                        <h4 className="mt30 hide-on-mobile">{props.getTrans(props.translations.text_2)}</h4>
                        <form onSubmit={props.onSubmit} className="register__form flex-grow" style={{ minHeight: '65px' }}>
                            <PhoneInput defaultCountry="CH" onChange={props.onChange} value={props.value}/>
                        </form>
                        <div className="flex-grow img-wrapper flex aic jcc ct-mob hide-on-mobile">
                            <img className="img__mobile " src="/images/auth.png" alt="" />
                        </div>
                        <div className="buttons__group ">
                            <button 
                                style={props.buttonStyle}
                                onClick={props.onSubmit}
                                className="button__style">
                            {props.getTrans(props.translations.text_0)}</button>
                        </div>
                    </div>
                    <div className="two-column__img">
                        <div className="two-column__image">
                            <img src="/images/auth.png" alt="" />
                        </div>
                    </div>
                </section>
                <div className="mobile-nav hide-on-web">
                    <div className="mob-nav ">
                        <img src="/images/nav-home.png" alt="" />
                        <p>Home</p>
                    </div>
                    <div className="mob-nav ">
                        <img src="/images/nav-plus.png" alt="" />
                    </div>
                    <div className="mob-nav active"><img src="/images/nav-profile.png" alt="" />
                        <p>{props.getTrans(props.translations.text_9)}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default withRouter(PhoneNumberForm)