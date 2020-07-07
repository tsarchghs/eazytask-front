import React from "react";
import { connect } from "react-redux";
import { patchUser } from "../../actions/user";
import cloneDeep from "../../utils/cloneDeep";
import Loading from "../../components/loading";
import { withRouter, Link } from "react-router-dom";
import { compose } from "recompose";
import E404 from "../E404";
import MobileNav from "../../components/MobileNav";

class MyProfileEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            onEdit: ""
        }
        this.displayKey = {
            "first_name": "First name",
            "last_name": "Last name",
            "zipCode": "Zip"
        }
    }
    handleOnChange = key => e => e.persist() || this.setState(prevState => {
        prevState.data[key] = e.target.value;
        return prevState;
    })
    getInputValue = key => this.state.data[key] === undefined ? this.props.currentUser[key] : this.state.data[key]
    getKeyDisplay = key => this.displayKey[key] || key[0].toUpperCase() + key.slice(1)
    getStatic = key => (
        <div className="account-profile__input">
            <p>{this.getKeyDisplay(key)}</p>
            <div className="ap__input">
                <h5>{this.getInputValue(key)}</h5>
                <img onClick={() => this.setState({ onEdit: key })} src="/images/edit-pen.png" alt="" />
            </div>
        </div>
    )
    getInput = (key, width) => (
        <React.Fragment>
            <input
                className="input register__form_input"
                style={{width: width || "100%", marginBottom: "-3%"}}
                placeholder={this.getKeyDisplay(key)}
                onChange={this.handleOnChange(key)}
                value={this.getInputValue(key)}
            />
            {/* <img style={{position: "fixed", width:"1.5%", marginLeft: "14%", marginTop: "-8%"}} src="/images/edit-pen.png" alt=""/> */}
        </React.Fragment>
    )
    getStaticOrInput = (key, width) => this.state.onEdit != key ? this.getStatic(key) : this.getInput(key, width);
    onFileChange = e => {
        e.persist()
        e.preventDefault()
        let file = e.target.files[0]
        let useThis = this;
        if (file) {
            console.log("file123",file)
            var fr = new FileReader();
            fr.onload = function (d) {
                let src = d.srcElement.result;
                useThis.setState(prevState => {
                    console.log("file123", file)

                    prevState.data["profile_image"] = { file, src };
                    return prevState;
                })
            }
            fr.readAsDataURL(file);
        }
    }
    getProfileImage = () => {
        if (this.state.data.profile_image) return this.state.data.profile_image.src
        if (this.props.currentUser.profile_image) return this.props.currentUser.profile_image
        return window.__PROFILE_DEFAULT_PICTURE__
    }
    decline = () => this.setState({ data: {}, onEdit: ""})
    update = () => {
        let data = cloneDeep(this.state.data);
        if (data.profile_image) data.profile_image = this.state.data.profile_image.file
        this.props.patchUser({ 
            userId: this.props.currentUser.id, data,
            callUpdateAuthProfile: true
        });
        
        // var useThis = this;
        // setTimeout(() => {
        //     let el = document.getElementById("profileImage") 
        //     if (el) el.src = useThis.props.currentUser.profile_image
        // }, 500);
    }
    showUpdateButton = () => {
        let keys = Object.keys(this.state.data)
        for (let key of keys){
            if (this.state.data[key] != this.props.currentUser[key]) return true;
        }
        return false;
    }
    render(){
        let { currentUser } = this.props;
        return (
            <section className="offers-layout offers-profile">
                <header className="flex jcsb aic hide-on-mobile header-white">
                    <a href="#"><img className="logo__img" src="/images/logo2.png" alt="" /></a>
                    <div className="header-nav-web">
                        <a href="#" className="h4 active">Home <div /></a>
                        <a href="#" className="h4">New Task</a>
                        <a href="#" className="h4">Profile</a>
                    </div>
                </header>
                <div className="offers-picture">
                    <div className="offers-picture__mask" />
                    <div className="offers-buttons">
                        <a href="#" className="button">Edit Cover</a>
                    </div>
                </div>
                <div className="offers-content">
                    <div className="offers__cards">
                        <div className="offers__card">
                            <div className="offers__card--top">
                                <div className="logout-mobile hide-on-web">Log Out</div>
                                <h4 className="flex aic jcc">
                                    <div className="img-circle with-hover">
                                        <div onClick={e => {
                                            if (this.profileImageInputRef) this.profileImageInputRef.click()
                                        }} className="img-circle__mask"><img src="/images/edit-pen.png" alt="" /></div>
                                        <img id="profileImage" src={this.getProfileImage()} alt="" />
                                        <input ref={ref => this.profileImageInputRef = ref} onChange={this.onFileChange} type="file" style={{ display: "none" }} />

                                    </div>
                                </h4>
                                <h4>{currentUser.first_name} {currentUser.last_name[0]}</h4>
                                <p className>{currentUser.email}</p>
                                <div className="offers-buttons hide-on-web">
                                    <Link to="/settings">
                                        <a href="#" className="button hollow">Account Settings</a>
                                    </Link>
                                </div>
                            </div>
                            <div className="account-profile__inputs">
                                <div className="ap__input--double">
                                    {this.getStaticOrInput("first_name", "50%")}
                                    {this.getStaticOrInput("last_name", "50%")}
                                </div>
                                {/* <div className="account-profile__input">
                                    <p>Notification options</p>
                                    <div className="ap__input">
                                        <h5>Avni Bixhaku</h5>
                                        <img src="/images/edit-pen.png" alt="" />
                                    </div>
                                </div> */}

                                <div className="account-profile__input">
                                    <p>Phone</p>
                                    <div className="ap__input">
                                        <h5>None</h5>
                                        <img src="/images/edit-pen.png" alt="" />
                                    </div>
                                </div>
                                <div className="ap__input--double">
                                    {this.getStaticOrInput("zipCode", "50%")}
                                    {this.getStaticOrInput("city", "50%")}
                                </div>
                                {this.getStaticOrInput("address")}
                            </div>
                        </div>
                        {
                            this.showUpdateButton() && 
                            <div className="offers-buttons">
                                <div onClick={this.update} className="button hollow">Save</div>
                            </div>
                        }
                        <div className="offers-buttons hide-on-mobile">
                            <Link to="/settings">
                                <a href="#" className="button hollow">Account Settings</a>
                            </Link>
                            <a onClick={e => {
                                e.preventDefault();
                                this.props.history.push("/logout")
                            }} className="button hollow red">Log Out</a>
                        </div>
                    </div>
                    <div className="mobile-nav  hide-on-web">
                        <Link to="/dashboard">
                            <div className="mob-nav ">
                                <img src="/images/nav-home.png" alt="" />
                                <p>Home</p>
                            </div>
                        </Link>
                        <Link to="/create-task">
                            <div className="mob-nav ">
                                <img src="/images/nav-plus.png" alt="" />
                            </div>
                        </Link>
                        <Link to="/my_profile_edit">
                            <div className="mob-nav active"><img src="/images/nav-profile.png" alt="" />
                                <p>Profile</p>
                            </div>
                        </Link>
                    </div>                
                </div></section>

        )
        return (
            <React.Fragment>
                <Link to="/my_profile">Go back <br /><br /></Link>
                My profile:<br /><br />

                <label style={{ display: "flex" }}>
                    <img 
                        id="profileImage"
                        src={this.getProfileImage()} 
                        style={{ border: "1px solid black", minWidth: 100, maxWidth: 100 }}
                    />
                    <input onChange={this.onFileChange} type="file" style={{ display: "none" }}/>
                    <div>Edit</div>
                </label>
                { this.getStaticOrInput("first_name") }
                { this.getStaticOrInput("last_name") }
                <label>
                    Notification option:
                    <select 
                        value={this.getInputValue("notification_option")} 
                        onChange={this.handleOnChange("notification_option")}
                    >
                        <option value="SMS">SMS</option>
                        <option value="EMAIL">Email</option>
                    </select>
                </label>
                { this.getStaticOrInput("city") }
                { this.getStaticOrInput("address") }
                { this.getStaticOrInput("zipCode") }
                <Link to="/delete_account">
                    <div>Delete account</div>
                </Link>
                <div onClick={this.decline}>Decline</div>
                <button onClick={this.update}>Update</button>
            </React.Fragment>
        )
    }
}

let mapStateToProps = state => {
    return {
        currentUser: state.auth.profile
    }
}

export default compose(withRouter,connect(mapStateToProps, { patchUser }))(MyProfileEdit);