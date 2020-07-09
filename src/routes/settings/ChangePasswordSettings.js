import React from "react";
import WebHeader from "../../components/WebHeader";
import WebSidebar from "./WebSidebar";
import { withRouter, Link } from "react-router-dom";
import MobileNav from "../../components/MobileNav";
import { connect } from "react-redux";
import { patchUser } from "../../actions/user";
import queryString from "query-string";
import { compose } from "recompose";

class ChangePasswordSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            old_password: "",
            new_password: "",
            confirm_new_password: "",
            errors: "",
            error2: "",
            info: ""
        }
    }
    componentDidMount(){
        this.updateInfoAsNeeded()
    }
    componentDidUpdate(){
        this.updateInfoAsNeeded()
    }
    updateInfoAsNeeded = () => {
        let params = queryString.parse(this.props.location.search);
        if (params.error) {
            let error = "Old password is incorrect"
            if (this.state.info != "" || this.state.error != error){
                this.setState({ info: "", error });
            }
        }
        if (params.success && !this.state.info) {
            this.setState({ 
                error: "", 
                info: "Password updated",
                old_password: "",
                new_password: "",
                confirm_new_password: ""  
            });
        }
    }
    update = () => {
        let { old_password, new_password, confirm_new_password } = this.state;
        if (new_password != confirm_new_password) return this.setState({ error2: "Confirm new password does not match new password"})
        else this.setState({ error2: "" })
        this.props.patchUser({
            userId: this.props.currentUserId,
            data: {
                old_password, password: new_password
            },
            historyPush: this.props.history
        })
        this.setState({ loading: true })

    }
    getConfirmButton = () => {
        let { old_password, new_password, confirm_new_password } = this.state;
        let bool_ = old_password && new_password && confirm_new_password
        let style = !bool_ ? {backgroundColor: "darkgrey"} : {};
        let onClick = bool_ ? this.update : undefined;
        return <button style={style} onClick={onClick} className="button__style">Confirm</button>
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
                            <WebHeader/>
                            <section className="profile__article hide-on-mobile">
                                <WebSidebar/>
                                <div className="profile__article--content">
                                    <h3>Change Password</h3>
                                    <h4>Choose a strong password and don’t reuse it from somewhere else. <br />
                    Use at least 8 characters. Don’t use a password from another site, <br />
                    or something too obvious like your pet’s name. </h4>
                                    { this.state.error2 || this.state.error }
                                    { this.state.info }
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
                                                    { this.state.error2 || this.state.error }
                                                    { this.state.info }

                                                    <div className="profile__passwords flex-grow">
                                                        {this.getInput("old_password", "Old password")}
                                                        {this.getInput("new_password", "New password")}
                                                        {this.getInput("confirm_new_password", "Confirm new password")}
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

let mapStateToProps = state => ({
    currentUserId: state.auth.profile.id
})

export default compose(withRouter,connect(mapStateToProps, { patchUser }))(ChangePasswordSettings)