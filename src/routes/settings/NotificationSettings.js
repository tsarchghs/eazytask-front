import React from "react";
import { Link } from "react-router-dom";
import WebSidebar from "./WebSidebar";
import MobileNav from "../../components/MobileNav";

class NotificationSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            opened: false
        }
    }
    toggle = opened => () => {
        console.log("this.setState({ opened: !opened })")
        this.setState({ opened: !opened })
    }
    GetNotificationOptions = () => (
        <div className="styled-select">
            <p>Email</p>
            <img onClick={this.toggle(this.state.opened)} src="/images/arr-right.png" alt="" />
            <div className={`styled-select__open ${this.state.opened ? "opened" : ""}`}>
                <div className="styled-select__item">SMS</div>
                <div className="styled-select__item">EMAIL</div>
            </div>
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
                                    <h3>Notifications</h3>
                                    <h4>Choose how do you want to be notified across platform about: <br />
                        New offers, updates and more.</h4>
                                    <div className="profile__select">
                                        <h4>I want to be notified with:</h4>
                                        {this.GetNotificationOptions()}
                                    </div>
                                    {/* <div class="profile__passwords">
                                <div class="profile__password">	
                                    <input type="password" placeholder="Old password">
                                    <img src="/images/noti.png" alt="">
                                </div>
                                <div class="profile__password">	
                                    <input type="password" placeholder="New password">
                                    <img src="/images/noti.png" alt="">
                                </div>
                                <div class="profile__password">	
                                    <input type="password" placeholder="Confirm new password">
                                    <img src="/images/noti.png" alt="">
                                </div>
                            </div> */}
                                    {/* <div class="profile__delete">
                                <div class="filters-card delete-inputs">
                                    <div class="filters-lists">
                                        <div class="filters-list">
                                            <div class="filter-input filter-slide"><span class="filter-input__check"></span><p>It has a lot of problems</p></div>
                                        </div>
                                        <div class="filters-list">
                                            <div class="filter-input filter-slide"><span class="filter-input__check active"></span><p>Hard to use</p></div>
                                        </div>
                                        <div class="filters-list">
                                            <div class="filter-input filter-slide " style="justify-content: space-between;"><p>Other</p><span><img src="/images/arr-right.png" alt=""></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                                    <div className="profile__delete">
                                    </div>
                                </div>
                            </section>
                            <section className="profile__article--mobile hide-on-web">
                                <div className=" edit-task__wrapper">
                                    <section className="landing-info panel edit-task__section">
                                        <div className="container">
                                            <div className="content ">
                                                <header className="logo-text xn-br hide-on-desktop">
                                                    <span className="show__mobile">
                                                        <Link to="/settings">
                                                            <img src="/images/arrow.jpeg" alt="" />
                                                        </Link>
                                                    </span>
                                                    <h4 className="logo-title ">
                                                        Notifications
                              </h4>
                                                </header>
                                                <div className="pa--mobile pb50 max-vh">
                                                    <h4 className="pa-mobile__st">Choose how do you want to be notified across platform about: <br /> New offers, updates and more.</h4>
                                                    <div className="profile__select flex-grow">
                                                        <h4 style={{ color: '#808080' }}>I want to be notified with:</h4>
                                                        {this.GetNotificationOptions()}
                                                    </div>
                                                    {/* <div className="buttons__group">
                                                        <button className="button__style">Confirm</button>
                                                    </div> */}
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

export default NotificationSettings;