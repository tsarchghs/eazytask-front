import React from "react";
import { Link } from "react-router-dom";

export default props => {
    return (
        <div className="container">
            <div className="content setup-ready">
                <header>
                    <span className="show__mobile"><img src="/images/arrow.jpg" alt="" /></span>
                    <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                </header>
                <section className="two-column__layout setup__mobile profile__cover">
                    <div className="two-column__info flex flex-column">
                        <div className="background-title mb5">
                            <h1>Ready to go</h1>
                            <p className="shadow__title">setup your account</p>
                        </div>
                        <h4 className="show__mobile">Thanks for your feedback</h4>
                        <p className="mb30 special">We will try hard to make users <br /> experience better </p>
                        <div className="flex-grow">
                            <img src="/images/computer_display_monochromatic.png" style={{ minWidth: '190px', width: '20%', margin: '0 auto' }} alt="" />
                        </div>
                        <div className="buttons__group">
                            {/* <button class="button__style no-color">Skip <span class="show__mobile">for now</span></button> */}
                            <Link to="/">
                                <button className="button__style">Go</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    )
}