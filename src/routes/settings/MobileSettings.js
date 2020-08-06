import React from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "recompose";
import WebSidebar from "./WebSidebar";
import MobileNav from "../../components/MobileNav";
import { connect } from "react-redux";
import WebHeader from "../../components/WebHeader";

const redirectTo = (history, path) => () => history.push(path)
let getTrans = (app_lang,obj) => obj[app_lang]

const MobileSettings = props => {
    let { history } = props;
    let { app_lang, common } = props
    let { settings } = common;
    return (
        <div className=" edit-task__wrapper">
            <section className="landing-info panel edit-task__section">
                <div className="container">
                    <div className="content ">
                        <WebHeader active="profile"/>
                        <section className="profile__article hide-on-mobile">
                            <WebSidebar active="profile"/>
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
                                            <header style={{ minHeight: 35 }} className="logo-text xn-br hide-on-desktop">
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
                                                    <div onClick={redirectTo(history,"/settings/notifications")} className="active"><img src="/images/noti-b.png" alt="" />
                                                        {getTrans(app_lang,settings.text_1)}
                                                    </div>
                                                    <div onClick={redirectTo(history,"/settings/change_password")}><img src="/images/shield-b.png" alt="" />
                                                        {getTrans(app_lang,settings.text_2)}
                                                    </div>
                                                    <div onClick={redirectTo(history,"/settings/change_preferences")}><img src="/images/info-b.png" alt="" />
                                                        {getTrans(app_lang,settings.text_3)}
                                                    </div>
                                                    <div onClick={redirectTo(history,"/settings/delete_account")}><img src="/images/exit-b.png" alt="" />
                                                        {getTrans(app_lang,settings.text_4)}
                                                    </div>
                                                    <div onClick={redirectTo(history,"/settings/about")}><img src="/images/info-b.png" alt="" />
                                                        {getTrans(app_lang,settings.text_5)}
                                                    </div>
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

let mapStateToProps = state => ({
    common: state.app_lang.common,
    app_lang: state.app_lang.app_lang
})

export default compose(withRouter,connect(mapStateToProps))(MobileSettings);