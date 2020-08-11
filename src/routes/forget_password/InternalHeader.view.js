import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

let InternalHeader = props => (
    <header className="w-subtitle">
        <Link to="/login">
            <span className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
        </Link>
        <Link to="/">
            <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
        </Link>
        <p className="show__mobile">{props.translations.text_3[props.app_lang]}</p>
    </header>
)

let mapStateToProps = state => ({
    translations: state.app_lang.data["/forget-password"],
    app_lang: state.app_lang.app_lang,
})

export default connect(mapStateToProps)(InternalHeader)