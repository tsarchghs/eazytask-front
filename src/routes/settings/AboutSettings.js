import React from "react";
import WebSidebar from "./WebSidebar";
import MobileNav from "../../components/MobileNav";
import { Link } from "react-router-dom";
import WebHeader from "../../components/WebHeader";
import { connect } from "react-redux";

const getTrans = (app_lang,obj) => {
    let data = obj[app_lang];
    if (typeof(data) == "string") return data;
    if (data.length) {
        return data.map(str => <React.Fragment>
            {str}<br/>
        </React.Fragment>)
    }
}

const AboutSettings = props => (
    <div className=" edit-task__wrapper">
        <section className="landing-info panel edit-task__section">
            <div className="container">
                <div className="content ">
                    <WebHeader/>
                    <section className="profile__article hide-on-mobile">
                        <WebSidebar/>
                        <div className="profile__article--content">
                            <h3>{getTrans(props.app_lang,props.translations.text_1)}</h3>
                            <h4 className="text-green">{getTrans(props.app_lang,props.translations.text_2)}</h4>
                            <h4 style={{ fontWeight: "initial" }}>{getTrans(props.app_lang,props.translations.text_3)}</h4>
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
                                                About us
                          </h4>
                                        </header>
                                        <div className="pa--mobile pb50 max-vh">
                                            <h4 className="text-green">{getTrans(props.app_lang,props.translations.text_2)}</h4>
                                            <h4>{getTrans(props.app_lang,props.translations.text_3)}</h4>
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

let mapStateToProps = state => ({
    translations: state.app_lang.data["/settings"].about,
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})

export default connect(mapStateToProps)(AboutSettings);