import React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";

const WebHeader2 = props => (
    <header className="flex jcsb aic hide-on-mobile">
        <a onClick={e => e.preventDefault()}>
            <span style={{ pointer: "cursor" }} onClick={() => {
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
                        <a onClick={e => e.preventDefault()} className={`h4 ${props.active == "home" ? "active" : ""}`}>
                            {props.common.home[props.app_lang]}
                            { props.active == "home" ? <div/> : null }
                        </a>
                    </Link>
                    <Link to="/create-task">
                        <a onClick={e => e.preventDefault()} className={`h4 ${props.active == "new_task" ? "active" : ""}`}>
                            {props.common.new_task[props.app_lang]}
                            { props.active == "new_task" ? <div/> : null }
                        </a>
                    </Link>
                    <Link to="/my_profile_edit">
                        <a onClick={e => e.preventDefault()} className={`h4 ${props.active == "profile" ? "active" : ""}`}>
                            {props.common.profile[props.app_lang]}
                            { props.active == "profile" ? <div/> : null }

                        </a>
                    </Link>
                </div>

        }
    </header>
)

let mapStateToProps = state => ({
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})
export default compose(withRouter,connect(mapStateToProps))(WebHeader2);