import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const WebHeader = props => (
    <header className="flex jcsb aic hide-on-mobile">
        <Link to="/">
            <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
        </Link>
        <div className="header-nav-web">
            <Link to="/dashboard">
                <a href="#" className={`h4 ${props.active == "home" ? "active" : ""}`}>
                    {props.common.home[props.app_lang]}
                    { props.active == "home" ? <div/> : null }
                </a>
            </Link>
            <Link to="/create-task">
                <a href="#" className={`h4 ${props.active == "new_task" ? "active" : ""}`}>
                    {props.common.new_task[props.app_lang]}
                    { props.active == "new_task" ? <div/> : null }
                </a>
            </Link>
            <Link to="/my_profile_edit">
                <a href="#" className={`h4 ${props.active == "profile" ? "active" : ""}`}>
                    {props.common.profile[props.app_lang]}
                    { props.active == "profile" ? <div/> : null }

                </a>
            </Link>
        </div>
    </header>
)

let mapStateToProps = state => ({
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})
export default connect(mapStateToProps)(WebHeader);