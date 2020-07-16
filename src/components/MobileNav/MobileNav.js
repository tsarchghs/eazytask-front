import React from "react";
import { Link } from "react-router-dom";

export default props => (
    <div className="mobile-nav">
        <Link to="/dashboard">
            <div className={"mob-nav " + (props.active == "home" ? "active" : "")}>
                <img src="/images/nav-home.png" alt="" />
                <p>Home</p>
            </div>
        </Link>
        <Link to="/create-task">
            <div className={"mob-nav " + (props.active == "create-task" ? "active" : "")}>
                <img src="/images/nav-plus.png" alt="" />
                <p>New</p>
            </div>
        </Link>
        <Link to="/my_profile_edit">
            <div className={"mob-nav " + (props.active == "my-profile-edit" ? "active" : "")}>
                <img src="/images/nav-profile.png" alt="" />
                <p>Profile</p>
            </div>
        </Link>
    </div>
)