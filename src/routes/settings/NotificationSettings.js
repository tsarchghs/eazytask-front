import React from "react";
import { Link } from "react-router-dom";
import WebSidebar from "./WebSidebar";
import MobileNav from "../../components/MobileNav";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { patchUser } from "../../actions/user";
import { compose } from "recompose";
import WebHeader from "../../components/WebHeader";

class NotificationSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            opened: false,
            notification_option: props.currentUser.notification_option
        }
    }
    toggle = opened => () => {
        console.log("this.setState({ opened: !opened })")
        this.setState({ opened: !opened })
    }
    GetNotificationOptions = () => (
        <div className="styled-select">
            <p>{this.state.notification_option}</p>
            <img onClick={this.toggle(this.state.opened)} src="/images/arr-right.png" alt="" />
            <div className={`styled-select__open ${this.state.opened ? "opened" : ""}`}>
                <div onClick={e => this.setState({ notification_option: "SMS", opened: false })} className="styled-select__item">SMS</div>
                <div onClick={e => this.setState({ notification_option: "EMAIL", opened: false })} className="styled-select__item">EMAIL</div>
            </div>
        </div>    
    )
    update = () => {
        let { notification_option } = this.state;
        this.props.patchUser({ 
            userId: this.props.currentUser.id, data: { notification_option },
            callUpdateAuthProfile: true
        });
    }
    render(){
        return (
            <div className=" edit-task__wrapper">
                <section className="landing-info panel edit-task__section">
                    <div className="container">
                        <div className="content ">
                            <WebHeader/>
                            <section className="profile__article hide-on-mobile">
                                <WebSidebar/>
                                <div className="profile__article--content">
                                    <h3>Notifications</h3>
                                    <h4>Choose how do you want to be notified across platform about: <br />
                        New offers, updates and more.</h4>
                                    <div className="profile__select">
                                        <h4>I want to be notified with:</h4>
                                        {this.GetNotificationOptions()}
                                        { 
                                            this.props.currentUser.notification_option != this.state.notification_option && 
                                            <button 
                                                onClick={this.update}
                                                classNmae="button__style" 
                                                style={{backgroundColor:"darkgray"}}>
                                                Save
                                            </button>
                                        }
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
                                                        { 
                                                            this.props.currentUser.notification_option != this.state.notification_option && 
                                                            <button 
                                                                onClick={this.update}
                                                                classNmae="button__style" 
                                                                style={{backgroundColor:"darkgray"}}>
                                                                Save
                                                            </button>
                                                        }
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

let mapStateToProps = state => {
    return {
        currentUser: state.auth.profile
    }
}

export default compose(withRouter,connect(mapStateToProps, { patchUser }))(NotificationSettings);
