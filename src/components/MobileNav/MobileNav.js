import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

let MobileNav = props => (
    <div className="mobile-nav hide-on-web">
        <Link to="/dashboard">
            <div className={"mob-nav " + (props.active == "home" ? "active" : "")}>
                <img src="/images/nav-home.png" alt="" />
                <p>{props.common.home[props.app_lang]}</p>
            </div>
        </Link>
        <Link to="/create-task">
            <div className={"mob-nav " + (props.active == "create-task" ? "active" : "")}>
                <img src="/images/nav-plus.png" alt="" />
                <p>{props.common.new[props.app_lang]}</p>
            </div>
        </Link>
        <Link to="/my_profile_edit">
            <div className={"mob-nav " + (props.active == "my-profile-edit" ? "active" : "")}>
                <img src="/images/nav-profile.png" alt="" />
                <p>{props.common.profile[props.app_lang]}</p>
            </div>
        </Link>
    </div>
)

let mapStateToProps = state => ({
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})
export default connect(mapStateToProps)(MobileNav);