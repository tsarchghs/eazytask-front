import React from "react";
import WebSidebar from "./WebSidebar";
import { Link } from "react-router-dom";
import DeleteAccount from "../delete_account";

import { connect } from "react-redux";
import { patchUser } from "../../actions/user";
import WebHeader from "../../components/WebHeader";

class DeleteAccountSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "reason": ""
        }
        this.inputs = [
            { value: "Hard to use", show: this.getTrans(props.translations.text_5) },
            { value: "It has a lot of problems", show: this.getTrans(props.translations.text_6) },
            { value: "I don't need it", show: this.getTrans(props.translations.text_7) },
            { value: "I have a better platform", show: this.getTrans(props.translations.text_8) },
            { value: "It's not available in my country", show: this.getTrans(props.translations.text_9) },
        ]
    }
    delete = () => {
        this.props.patchUser({
            userId: this.props.currentUserId,
            data: {
                reason: this.state.reason,
                deleted: true
            },
            callUpdateAuthProfile: true,
            redirectTo: "/"
        })
        this.setState({ loading: true })
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
    render() {
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
                                    <h4 style={{ fontWeight: "initial" }}>{this.getTrans(this.props.translations.text_2)} <span className="sp-g">{this.props.currentUserName}</span> <br />
                                    {this.getTrans(this.props.translations.text_3)}
                  </h4>
                                    <h4 className="mt20">{this.getTrans(this.props.translations.text_4)}
                  </h4>
                                    <div className="profile__delete flex-grow">
                                        <div className="filters-card delete-inputs">
                                            <div className="filters-lists">
                                                {
                                                    this.inputs.map(input => (
                                                        <div onClick={() => this.setState({ reason: input.value })} className="filters-list">
                                                            <div className="filter-input filter-slide">
                                                            <span className={`filter-input__check ${this.state.reason == input.value ? "active" :""}`} />
                                                            <p>{input.show}</p></div>
                                                        </div>

                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {/*  */}
                                    <div className="buttons__group">
                                        {
                                            this.state.loading && 
                                                <button 
                                                style={!this.state.reason ? { backgroundColor: "darkgray"} : {}} 
                                                className="button__style">
                                                {this.getTrans(this.props.translations.text_11)}</button>
                                        }
                                        {
                                            !this.state.loading && 
                                            <button 
                                                onClick={this.state.reason ? this.delete : undefined} 
                                                style={!this.state.reason ? { backgroundColor: "darkgray"} : {}} 
                                                className="button__style">
                                            {this.getTrans(this.props.translations.text_10)}</button>
                                        }
                                    </div>
                                </div>
                            </section>
                            <section className="hide-on-web">
                                <DeleteAccount goBack={this.props.goBack} from="/settings"/>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

let mapStateToProps = state => ({
    currentUserId: state.auth.profile.id,
    currentUserName: state.auth.profile.first_name,
    translations: state.app_lang.data["/settings"].delete_account.web,
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})

export default connect(mapStateToProps, { patchUser })(DeleteAccountSettings);