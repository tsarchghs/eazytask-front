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
                        <h1>{this.props.getTrans(this.props.translations.text_8)}</h1>
                        <p className="web__subtitle">{this.props.getTrans(this.props.translations.web.text_2)}</p>
                    </div>
                    <h4 className="show__mobile title-with-subtitle text-center">
                        {this.props.getTrans(this.props.translations.text_8)}
                        <p className="text-center">{this.props.getTrans(this.props.translations.mobile.text_5)}</p>
                    </h4>
                    <div className="flex-grow img-wrapper flex aic jcc one-section-show">
                        <img className="img__mobile " src="/images/smile.png" alt="" />
                    </div>
                    <div className="buttons__group aic">
                        <Link to="/login">
                            <button className="button__style">
                                {this.props.getTrans(this.props.translations.text_0)}
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="two-column__img hide-on-desktop">
                    <div className="two-column__image">
                        <img src="/images/smile.png" alt="" />
                    </div>
                </div>
            </section>
        </div>
    </div>
)