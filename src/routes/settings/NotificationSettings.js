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
        let { notification_option } = props.currentUser;
        this.state = {
            opened: false,
            notification_option,
            show: notification_option === "SMS" ? this.getTrans(this.props.translations.text_5) : this.getTrans(this.props.translations.text_4)
        }
    }
    toggle = opened => () => {
        console.log("this.setState({ opened: !opened })")
        this.setState({ opened: !opened })
    }
    GetNotificationOptions = () => (
        <div className="styled-select">
            <p>{this.state.show}</p>
            <img onClick={this.toggle(this.state.opened)} src="/images/arr-right.png" alt="" />
            <div className={`styled-select__open ${this.state.opened ? "opened" : ""}`}>
                <div onClick={e => this.setState({ notification_option: "SMS", show: this.getTrans(this.props.translations.text_5), opened: false })} className="styled-select__item">
                {this.getTrans(this.props.translations.text_5)}
                </div>
                <div onClick={e => this.setState({ notification_option: "EMAIL", show: this.getTrans(this.props.translations.text_4), opened: false })} className="styled-select__item">
                {this.getTrans(this.props.translations.text_4)}
                </div>
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
                            <WebHeader active="profile"/>
                            <section className="profile__article hide-on-mobile">
                                <WebSidebar/>
                                <div className="profile__article--content">
                                    <h3>{this.getTrans(this.props.translations.text_1)}</h3>
                                    <h4 style={{fontWeight: "initial"}}>{this.getTrans(this.props.translations.text_2)}</h4>
                                    <div className="profile__select">
                                        <h4>{this.getTrans(this.props.translations.text_3)}</h4>
                                        {this.GetNotificationOptions()}
                                        { 
                                            this.props.currentUser.notification_option != this.state.notification_option && 
                                            <button 
                                                onClick={this.update}
                                                style={{ padding: 11, width: 147 }}
                                                className="button__style">
                                                {this.getTrans(this.props.translations.text_6)}
                                            </button>
                                        }
                                    </div>
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
                                                    {this.getTrans(this.props.translations.text_1)}
                              </h4>
                                                </header>
                                                <div className="pa--mobile pb50 max-vh">
                                                    <h4 className="pa-mobile__st">{this.getTrans(this.props.translations.text_2)}</h4>
                                                    <div className="profile__select flex-grow">
                                                        <h4 style={{ color: '#808080' }}>{this.getTrans(this.props.translations.text_3)}</h4>
                                                        {this.GetNotificationOptions()}
                                                        { 
                                                            this.props.currentUser.notification_option != this.state.notification_option && 
                                                            <button 
                                                                onClick={this.update}
                                                                className="button__style"
                                                                style={{ padding: 11, width: 147}}
                                                            >
                                                                {this.getTrans(this.props.translations.text_6)}
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
        currentUser: state.auth.profile,
        translations: state.app_lang.data["/settings"].notifications,
        app_lang: state.app_lang.app_lang,
        common: state.app_lang.common
    }
}

export default compose(withRouter,connect(mapStateToProps, { patchUser }))(NotificationSettings);
