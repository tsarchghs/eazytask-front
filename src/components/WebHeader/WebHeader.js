import React from "react";
import { Link } from "react-router-dom";

const WebHeader = props => (
    <header className="flex jcsb aic hide-on-mobile">
        <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
        <div className="header-nav-web">
            <Link to="/dashboard">
                <a href="#" className={`h4 ${props.active == "home" ? "active" : ""}`}>
                    Home
                    { props.active == "home" ? <div/> : null }
                </a>
            </Link>
            <Link to="/create-task">
                <a href="#" className={`h4 ${props.active == "new_task" ? "active" : ""}`}>
                    New Task
                    { props.active == "new_task" ? <div/> : null }
                </a>
            </Link>
            <Link to="/my_profile_edit">
                <a href="#" className={`h4 ${props.active == "profile" ? "active" : ""}`}>
                    Profile
                    { props.active == "profile" ? <div/> : null }

                </a>
            </Link>
        </div>
    </header>
)

export default WebHeader;