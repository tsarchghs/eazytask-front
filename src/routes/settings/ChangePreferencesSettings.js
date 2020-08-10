import React from "react";
import WebSidebar from "./WebSidebar";
import { Link, withRouter } from "react-router-dom";
import MobileNav from "../../components/MobileNav";
import WebHeader from "../../components/WebHeader";
import { compose } from "recompose";
import { connect } from "react-redux";
import { patchUser } from "../../actions/user";

class ChangePreferencesSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.asker = this.getTrans(this.props.translations.text_4)
        this.askerAndTasker = this.getTrans(this.props.translations.text_5)
    }
    toggle = opened => () => {
        this.setState({ opened: !opened })
    }
    GetOptions = () => (
        <div className="styled-select" style={{ zIndex: 999 }}>
            <p>{this.state.show || (!this.props.currentUser.isTasker ? this.asker : this.askerAndTasker)}</p>
            <img style={{ cursor: "pointer" }} onClick={this.toggle(this.state.opened)} src="/images/arr-right.png" alt="" />
            <div className={`styled-select__open ${this.state.opened ? "opened" : ""}`}>
                <div onClick={e => this.setState({ isTasker: false, show: this.asker, opened: false })} className="styled-select__item">
                    {this.asker}
                </div>
                <div onClick={e => this.setState({ isTasker: true, show: this.askerAndTasker, opened: false })} className="styled-select__item">
                    {this.askerAndTasker}
                </div>
            </div>
        </div>
    )
    changedRoleBool = () => this.state.isTasker === undefined || this.state.isTasker === this.props.currentUser.isTasker
    update = () => {
        this.props.patchUser({
            userId: this.props.currentUser.id,
            data: { isTasker: this.state.isTasker },
            callUpdateAuthProfile: true
        })
        console.log("ON_UPDATE")
    }
    getTrans = obj => {
        let data = obj[this.props.app_lang];
        if (typeof(data) == "string") return data;
        if (data.length) {
            return data.map(str => <React.Fragment>
                {str}<br/>
            </React.Fragment>)
        }
    }
    render(){
        return (
            <div className=" edit-task__wrapper">
                <section className="landing-info panel edit-task__section">
                    <div className="container">
                        <div className="content ">
                            <WebHeader active="profile" />
                            <section className="profile__article hide-on-mobile">
                                <WebSidebar />
                                <div className="profile__article--content">
                                    <h3>{this.getTrans(this.props.translations.text_1)}</h3>
                                    <h4 style={{ fontWeight: "initial" }}>{this.getTrans(this.props.translations.text_2)}</h4>
                                    <div className="profile__select">
                                        {/* <h4>{this.getTrans(this.props.translations.text_3)}</h4> */}
                                        {this.GetOptions()}
                                        {
                                            !this.changedRoleBool() &&
                                            <button
                                                onClick={this.update}
                                                style={{ 
                                                    padding: 11, 
                                                    width: 147,

                                                }}
                                                className="button__style">
                                                {this.getTrans(this.props.translations.text_10)}
                                            </button>
                                        }
                                    </div>
                                    <br/><br/>
                                    { 
                                        this.props.currentUser.isTasker &&
                                        <React.Fragment>
                                            <a href="/settings/change_skills">
                                                <div style={{ marginTop: 5 }} className="styled-select">
                                                    <p>{this.getTrans(this.props.translations.text_7)}</p>
                                                    <img src="/images/arr-right.png" alt="" />
                                                    <div className={`styled-select__open`}>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="/settings/change_languages">
                                                <div style={{ marginTop: 5 }} className="styled-select">
                                                    <p>{this.getTrans(this.props.translations.text_8)}</p>
                                                    <img src="/images/arr-right.png" alt="" />
                                                    <div className={`styled-select__open`}>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="/settings/change_cities">
                                                <div style={{ marginTop: 5 }} className="styled-select">
                                                    <p>{this.getTrans(this.props.translations.text_9)}</p>
                                                    <img src="/images/arr-right.png" alt="" />
                                                    <div className={`styled-select__open`}>
                                                    </div>
                                                </div>
                                            </a>
                                        </React.Fragment>
                                    }
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
                                                    <span onClick={this.props.goBack} className="show__mobile">
                                                        <img src="/images/arrow.jpeg" alt="" />
                                                    </span>
                                                    <h4 className="logo-title ">
                                                        Change preferences
                                            </h4>
                                                </header>
                                                <div className="pa--mobile pb50 max-vh">
                                                    <div className="profile__select">
                                                        <h4>You're currently an:</h4>
                                                        {this.GetOptions()}
                                                        {
                                                            !this.changedRoleBool() &&
                                                            <button
                                                                onClick={this.update}
                                                                style={{
                                                                    padding: 11,
                                                                    width: 147,

                                                                }}
                                                                className="button__style">
                                                                Save
                                            </button>
                                                        }
                                                    </div>
                                                    <br /><br />
                                                    {
                                                        this.props.currentUser.isTasker &&
                                                        <React.Fragment>
                                                            <a href="/settings/change_skills">
                                                                <div style={{ marginTop: 5 }} className="styled-select">
                                                                    <p>Skills</p>
                                                                    <img src="/images/arr-right.png" alt="" />
                                                                    <div className={`styled-select__open`}>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <a href="/settings/change_languages">
                                                                <div style={{ marginTop: 5 }} className="styled-select">
                                                                    <p>Languages</p>
                                                                    <img src="/images/arr-right.png" alt="" />
                                                                    <div className={`styled-select__open`}>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <a href="/settings/change_cities">
                                                                <div style={{ marginTop: 5 }} className="styled-select">
                                                                    <p>Cities</p>
                                                                    <img src="/images/arr-right.png" alt="" />
                                                                    <div className={`styled-select__open`}>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </React.Fragment>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <MobileNav />
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
        currentUser: state.auth.profile,
        translations: state.app_lang.data["/settings"].change_preferences,
        app_lang: state.app_lang.app_lang,
        common: state.app_lang.common
    }
}

export default compose(withRouter, connect(mapStateToProps, { patchUser }))(ChangePreferencesSettings);