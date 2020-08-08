import React from "react";
import { Link, withRouter } from "react-router-dom";

const WebHeader2 = props => (
    <header className="flex jcsb aic hide-on-mobile">
            <a href="#">
            <span onClick={() => {
                try {
                    props.history.goBack()
                } catch (err) {
                    props.history.push("/dashboard")
                }
            }} className="arraw hide-on-mobile" style={{cursor: 'pointer'}}><img style={{
                width: 30,
                top: -3,
                position: "relative",
                marginRight: 20
            }} src="/images/arrow.jpeg" alt="" /></span>
                    <Link to="/">
                <img className="logo__img" src="/images/logo.svg" alt="" /></Link>
                </a>
        {
            !props.hideRightSide &&
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

        }
    </header>
)

export default withRouter(WebHeader2);