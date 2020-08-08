import React from "react";
import PhoneInput from "react-phone-number-input";
import { withRouter } from "react-router-dom";

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
                    <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                    <p className="show__mobile">Change phone number</p>
                </header>
                <section className="two-column__layout setup__mobile create-task reset-password">
                    <div className="two-column__info flex flex-column">
                        <div className="background-title mb30">
                            <h1>Update number</h1>
                        </div>
                        <h4 className="show__mobile title-with-subtitle text-center">
                            Update number
                <p>Enter your new phone number</p>
                        </h4>
                        <h4 className="mt30 hide-on-mobile">Enter your new phone number</h4>
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
                            Next</button>
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
                        <p>Profile</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default withRouter(PhoneNumberForm)