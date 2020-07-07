import React from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "recompose";
import WebSidebar from "./WebSidebar";
import MobileNav from "../../components/MobileNav";

const redirectTo = (history, path) => () => history.push(path)

const MobileSettings = props => {
    let { history } = props;
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
                                {/* <h3>Eazytask</h3>
                                <h4 className="text-green">Eazytask verbinden Privatpersonen für die Erledigung von Kleinaufträgen. Gewinne jetzt Zeit und Flexibilität - völlig gebührenfrei.</h4>
                                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi netus placerat magna iaculis sit lorem. Suspendisse in faucibus ut neque egestas. Consectetur a mattis vel commodo arcu malesuada turpis dolor duis. Enim elit pellentesque orci, porttitor nulla sit pretium. Sit purus, risus, iaculis neque proin non felis, ac. Laoreet mauris blandit praesent enim sed. Viverra non convallis sed blandit faucibus consectetur. Egestas posuere id eu scelerisque tristique at odio nisl. Sed eu enim molestie mauris risus, nullam pretium ut semper. Viverra nulla est, maecenas nibh. Felis, odio amet nam et lacus vitae, ornare. Hac proin mattis et sagittis rhoncus aliquam. Diam diam arcu lorem pharetra facilisis urna sit. Cras praesent est ac lorem morbi suspendisse aliquam vel.</h4> */}
                            </div>
                        </section>
                        <section className="profile__article--mobile hide-on-web">
                            <div className=" edit-task__wrapper">
                                <section className="landing-info panel edit-task__section">
                                    <div className="container">
                                        <div className="content ">
                                            <header className="logo-text xn-br hide-on-desktop">
                                                <span className="show__mobile">
                                                <Link to="/my_profile_edit">
                                                    <img src="/images/arrow.jpeg" alt="" />
                                                </Link>
                                                </span>
                                                <h4 className="logo-title ">
                                                </h4>
                                            </header>
                                            <div className="pa--mobile pb50 max-vh nopadding">
                                                <div className="mobile-account__menu">
                                                    <div onClick={redirectTo(history,"/settings/notifications")} className="active"><img src="/images/noti-b.png" alt="" />Notifications</div>
                                                    <div onClick={redirectTo(history,"/settings/change_password")}><img src="/images/shield-b.png" alt="" />Change Password</div>
                                                    <div onClick={redirectTo(history,"/settings/change_preferences")}><img src="/images/info-b.png" alt="" />Change Preferences</div>
                                                    <div onClick={redirectTo(history,"/settings/delete_account")}><img src="/images/exit-b.png" alt="" />Delete Account</div>
                                                    <div onClick={redirectTo(history,"/settings/about")}><img src="/images/info-b.png" alt="" />About</div>
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

export default withRouter(MobileSettings);