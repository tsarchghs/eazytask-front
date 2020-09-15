import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";

let getClassName = (param,param2) => param == param2 ? "active" : ""
let getTrans = (app_lang,obj) => obj[app_lang]

const WebSidebar = props => {
    let param = props.location.pathname.split("/")[2];
    let { app_lang, common } = props
    let { settings } = common;
    return (
        <div className="profile__article--sidebar">
            <Link to="/settings/notifications">
                <div className={getClassName("notifications",param)}><img src="/images/noti-b.png" alt="" />
                    {getTrans(app_lang,settings.text_1)}
                </div>
            </Link>
            <Link to="/settings/change_password">
                <div className={getClassName("change_password",param)}><img src="/images/shield-b.png" alt="" />
                    {getTrans(app_lang,settings.text_2)}
                </div>
            </Link>
            <Link to="/settings/change_preferences">
                <div className={getClassName("change_preferences",param)}><img src="/images/info-b.png" alt="" />
                    {getTrans(app_lang,settings.text_3)}
                </div>
            </Link>
            <Link to="/settings/delete_account">
                <div className={getClassName("delete_account",param)}><img src="/images/exit-b.png" alt="" />
                    {getTrans(app_lang,settings.text_4)}
                </div>
            </Link>
            <Link to="/settings/about">
                <div className={getClassName("about",param)}><img src="/images/info-b.png" alt="" />
                    {getTrans(app_lang,settings.text_5)}
                </div>
            </Link>
        </div>
    )
}

let mapStateToProps = state => ({
    common: state.app_lang.common,
    app_lang: state.app_lang.app_lang
})

export default compose(withRouter,connect(mapStateToProps))(WebSidebar);