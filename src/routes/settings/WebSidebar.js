import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

let getClassName = (param,param2) => console.log(param,param2) || param == param2 ? "active" : ""

const WebSidebar = props => {
    let param = props.location.pathname.split("/")[2];
    return (
        <div className="profile__article--sidebar">
            <Link to="/settings/notifications">
                <div className={getClassName("notifications",param)}><img src="/images/noti-b.png" alt="" />Notifications</div>
            </Link>
            <Link to="/settings/change_password">
                <div className={getClassName("change_password",param)}><img src="/images/shield-b.png" alt="" />Change Password</div>
            </Link>
            <Link to="/settings/change_preferences">
                <div className={getClassName("change_preferences",param)}><img src="/images/info-b.png" alt="" />Change Preferences</div>
            </Link>
            <Link to="/settings/delete_account">
                <div className={getClassName("delete_account",param)}><img src="/images/exit-b.png" alt="" />Delete Account</div>
            </Link>
            <Link to="/settings/about">
                <div className={getClassName("about",param)}><img src="/images/info-b.png" alt="" />About</div>
            </Link>
        </div>
    )
}

export default withRouter(WebSidebar);