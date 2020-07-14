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
            { value: "Hard to use" },
            { value: "It has a lot of problems" },
            { value: "I don't need it" },
            { value: "I have a better platform" },
            { value: "It's not available in my country" },
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
        })
        this.setState({ loading: true })
    }
    render() {
        return (
            <div className=" edit-task__wrapper">
                <section className="landing-info panel edit-task__section">
                    <div className="container">
                        <div className="content ">
                            <WebHeader/>
                            <section className="profile__article hide-on-mobile">
                                <WebSidebar/>
                                <div className="profile__article--content">
                                    <h3>Delete Account</h3>
                                    <h4>Hi, <span className="sp-g">{this.props.currentUserName}</span> <br />
                    We're sorry to hear you'd like to delete your account. <br />
                    Please tell us why you made this decision so in that way we will try to improve
                  </h4>
                                    <h4 className="mt20">Please tell us why you decided to delete your account.
                  </h4>
                                    <div className="profile__delete flex-grow">
                                        <div className="filters-card delete-inputs">
                                            <div className="filters-lists">
                                                {
                                                    this.inputs.map(input => (
                                                        <div onClick={() => this.setState({ reason: input.value })} className="filters-list">
                                                            <div className="filter-input filter-slide">
                                                            <span className={`filter-input__check ${this.state.reason == input.value ? "active" :""}`} />
                                                            <p>{input.value}</p></div>
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
                                                Deleting...</button>
                                        }
                                        {
                                            !this.state.loading && 
                                            <button 
                                                onClick={this.state.reason ? this.delete : undefined} 
                                                style={!this.state.reason ? { backgroundColor: "darkgray"} : {}} 
                                                className="button__style">
                                            Delete</button>
                                        }
                                    </div>
                                </div>
                            </section>
                            <section className="hide-on-web">
                                <DeleteAccount from="/settings"/>
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
    currentUserName: state.auth.profile.first_name
})

export default connect(mapStateToProps, { patchUser })(DeleteAccountSettings);