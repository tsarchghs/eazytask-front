import React from "react";
import WebSidebar from "./WebSidebar";
import { Link } from "react-router-dom";
import MobileNav from "../../components/MobileNav";

class ChangePasswordSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            old_password: "",
            new_password: "",
            confirm_new_password: ""
        }
    }
    getConfirmButton = () => {
        let { old_password, new_password, confirm_new_password } = this.state;
        let bool_ = old_password && new_password && confirm_new_password
        return <button style={!bool_ ? {backgroundColor: "darkgrey"} : {}} className="button__style">Confirm</button>
    }
    getInput = (key, placeholder) => (
        <div className="profile__password">
            <input value={this.state[key]} onChange={e => this.setState({ [key]: e.target.value })} type="password" placeholder={placeholder} />
            <img src="/images/shield-b.png" alt="" />
        </div>
    )
    render(){
        return (
            <div className=" edit-task__wrapper">
                <section className="landing-info panel edit-task__section">
                    <div className="container">
                        <div className="content ">
                            <header className="flex jcsb aic hide-on-mobile">
                                <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                                <div className="header-nav-web">
                                    <a href="#" className="h4 active">Home <div /></a>
                                    <a href="#" className="h4">New Task</a>
                                    <a href="#" className="h4">Profile</a>
                                </div>
                            </header>
                            <section className="profile__article hide-on-mobile">
                                <WebSidebar/>
                                <div className="profile__article--content">
                                    <h3>Change Password</h3>
                                    <h4>Choose a strong password and don’t reuse it from somewhere else. <br />
                    Use at least 8 characters. Don’t use a password from another site, <br />
                    or something too obvious like your pet’s name. </h4>
                                    <div className="profile__passwords flex-grow">
                                        { this.getInput("old_password", "Old password") }
                                        { this.getInput("new_password", "New password") }
                                        { this.getInput("confirm_new_password", "Confirm new password") }
                                    </div>
                                    <div className="buttons__group">
                                        { this.getConfirmButton() }
                                    </div>
                                </div>
                            </section>
                            <section className="profile__article--mobile hide-on-web">
                                <div className=" edit-task__wrapper">
                                    <section className="landing-info panel edit-task__section">
                                        <div className="container">
                                            <div className="content ">
                                                <header className="logo-text xn-br hide-on-desktop">
                                                    <Link to="/settings">
                                                        <span className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                                                    </Link>
                                                    <h4 className="logo-title ">
                                                        Change Password
                          </h4>
                                                </header>
                                                <div className="pa--mobile pb50 max-vh">
                                                    <h4 className="pa-mobile__st">Choose a strong password and don’t reuse it from somewhere else. <br /> Use at least 8 characters. Don’t use a password from another site, <br /> or something too obvious like your pet’s name. </h4>
                                                    <div className="profile__passwords flex-grow">
                                        { this.getInput("old_password", "Old password") }
                                        { this.getInput("new_password", "New password") }
                                        { this.getInput("confirm_new_password", "Confirm new password") }
                                                    </div>
                                                    <div className="buttons__group">
                                                        { this.getConfirmButton() }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <MobileNav/>
                            </section>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}

export default ChangePasswordSettings