import React from "react";
import { connect } from "react-redux";
import { patchUser } from "../../actions/user";
import cloneDeep from "../../utils/cloneDeep";
import Loading from "../../components/loading";
import { withRouter, Link } from "react-router-dom";
import { compose } from "recompose";
import E404 from "../E404";
import MobileNav from "../../components/MobileNav";
import { wrap } from "lodash";

class MyProfileEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            onEdit: ""
        }
        this.displayKey = {
            "first_name": this.getTrans(props.translations.text_1),
            "last_name": this.getTrans(props.translations.text_2),
            "zipCode": this.getTrans(props.translations.text_4),
            "address": this.getTrans(this.props.translations.text_6)
        }
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside = event => {
        if (!this.state.onEdit) return;
        let wrapperRef = this[this.state.onEdit + "_ref"]
        console.log(event,wrapperRef)
        if (wrapperRef && !wrapperRef.contains(event.target)) {
            this.setState({ onEdit: "" })
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
            <div style={{minHeight: 42}} className="ap__input">
                <h5>{this.getInputValue(key)}</h5>
                <img onClick={() => this.setState({ onEdit: key }, () => this[key + "_ref"].focus())} src="/images/edit-pen.png" alt="" />
            </div>
        </div>
    )
    getInput = (key, width) => (
        <React.Fragment>
            <input
                ref={input => this[key + "_ref"] = input}
                className="input register__form_input"
                style={{
                    width: key == "address" ? "100%" : "50%",
                    marginBottom: key == "address" ? 10 : "-3%",
                    marginTop: key == "address" ? 23 : undefined,
                    padding: "10px 20px",
                    borderRadius: 13,
                    backgroundColor: "#ececec",
                    border: "none",
                    height: 42
                }}
                placeholder={this.getKeyDisplay(key)}
                onChange={this.handleOnChange(key)}
                value={this.getInputValue(key)}
            />
            {/* <img style={{position: "fixed", width:"1.5%", marginLeft: "14%", marginTop: "-8%"}} src="/images/edit-pen.png" alt=""/> */}
        </React.Fragment>
    )
    getStaticOrInput = (key, width) => this.state.onEdit != key ? this.getStatic(key) : this.getInput(key, width);
    onFileChange = key => e => {
        e.preventDefault();
        e.persist();
        let file = e.target.files[0]
        let useThis = this;
        if (file) {
            console.log("file123",file)
            var fr = new FileReader();
            fr.onload = function (d) {
                let src = d.srcElement.result;
                useThis.setState(prevState => {
                    console.log("file123", file)

                    prevState.data[key] = { file, src };
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
    update = e => {
        e.preventDefault()
        let data = cloneDeep(this.state.data);
        if (data.profile_image) data.profile_image = this.state.data.profile_image.file
        if (data.cover_image) data.cover_image = this.state.data.cover_image.file
        this.props.patchUser({ 
            userId: this.props.currentUser.id, data,
            callUpdateAuthProfile: true
        });
        
        var useThis = this;
        if (this.state.data.profile_image){
            setTimeout(() => {
                let el = document.getElementById("profileImage") 
                if (el) {
                    el.src = "";
                    el.src = useThis.state.data.profile_image.src
                }
                setTimeout(() => {
                    let el = document.getElementById("profileImage") 
                    if (el) {
                        el.src = "";
                        el.src = useThis.state.data.profile_image.src
                    }
                }, 500);
            }, 500);
        }
        if (this.state.data.cover_image){
            setTimeout(() => {
                let el = document.getElementById("coverImage") 
                if (el) {
                    let orig = el.style.backgroundImage
                    el.style.backgroundImage = "";
                    el.style.backgroundImage = orig;
                }
                setTimeout(() => {
                    let el = document.getElementById("coverImage")
                    if (el) {
                        let orig = el.style.backgroundImage
                        el.style.backgroundImage = "";
                        el.style.backgroundImage = orig;
                        }
                }, 1500);
            }, 500);
        }
    }
    showUpdateButton = () => {
        let keys = Object.keys(this.state.data)
        for (let key of keys){
            if (this.state.data[key] != this.props.currentUser[key]) return true;
        }
        return false;
    }
    redirectTo = path => e => {
        e.preventDefault();
        this.props.history.push(path);
    }
    getOffersPictureStyle = () => {
        let { currentUser } = this.props;
        if (this.state.data.cover_image) return { backgroundImage: `url("${this.state.data.cover_image.src}"` }
        let defaultCover = window.location.protocol + "//" + window.location.host + "/" + window.__USER_COVER_DEFAULT_PICTURE__
        return { backgroundImage: `url("${currentUser.cover_image || defaultCover }")`}
    }
    getTrans = obj => obj[this.props.app_lang]
    render(){
        let { currentUser } = this.props;
        console.log(this.state.data)
        return (
            <section className="offers-layout offers-profile">
                <header className="flex jcsb aic hide-on-mobile header-white">
                    <Link to="/">
                        <a href="#"><img className="logo__img" src="/images/logo2.png" alt="" /></a>
                    </Link>
                    <div className="header-nav-web">
                        <a href="#" onClick={this.redirectTo("/dashboard")} className="h4">Home </a>
                        <a href="#" onClick={this.redirectTo("/create-task")} className="h4">New Task</a>
                        <a href="#" onClick={this.redirectTo("/my_profile_edit")} className="h4 active">Profile<div/></a>
                    </div>
                </header>
                <div id="coverImage" style={this.getOffersPictureStyle()} className="offers-picture">
                    <div className="offers-picture__mask" />
                    <div className="offers-buttons">
                        <a 
                            href="#" 
                            className="button" 
                            onClick={e => {
                                e.preventDefault()
                                if (this.coverImageInputRef) this.coverImageInputRef.click()
                        }}>{this.getTrans(this.props.translations.text_10)}</a>
                    </div>
                    <input ref={ref => this.coverImageInputRef = ref} onChange={this.onFileChange("cover_image")} type="file" style={{ display: "none" }} />
                </div>
                <div className="offers-content pb50">
                    <div className="offers__cards">
                        <div className="offers__card">
                            <div className="offers__card--top">
                                <div onClick={() => this.props.history.push("/logout")} className="logout-mobile hide-on-web">Log Out</div>
                                <h4 className="flex aic jcc">
                                    <div className="img-circle with-hover">
                                        <div onClick={e => {
                                            if (this.profileImageInputRef) this.profileImageInputRef.click()
                                        }} className="img-circle__mask"><img src="/images/edit-pen.png" alt="" /></div>
                                        <img id="profileImage" src={this.getProfileImage()} alt="" />
                                        <input ref={ref => this.profileImageInputRef = ref} onChange={this.onFileChange("profile_image")} type="file" style={{ display: "none" }} />

                                    </div>
                                </h4>
                                <h4>{currentUser.first_name} {currentUser.last_name}</h4>
                                <p className>{currentUser.email}</p>
                                <div className="offers-buttons hide-on-web">
                                    <Link to="/settings">
                                        <a href="#" className="button hollow">{this.getTrans(this.props.translations.text_7)}</a>
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
                                    <p>{this.getTrans(this.props.translations.text_3)}</p>
                                    <div className="ap__input">
                                        <h5>{this.props.currentUser.phone_number}</h5>
                                        {/* <img src="/images/edit-pen.png" alt="" /> */}
                                    </div>
                                </div>
                                {this.getStaticOrInput("address")}
                                <div className="ap__input--double">
                                    {this.getStaticOrInput("zipCode", "50%")}
                                    {this.getStaticOrInput("city", "50%")}
                                </div>
                            </div>
                        </div>
                        {
                            this.showUpdateButton() && 
                            <div className="offers-buttons">
                                <div onClick={this.update} className="button hollow">{this.getTrans(this.props.translations.text_9)}</div>
                            </div>
                        }
                        <div className="offers-buttons hide-on-mobile">
                            <Link to="/settings">
                                <a href="#" className="button hollow">{this.getTrans(this.props.translations.text_7)}</a>
                            </Link>
                            <a onClick={e => {
                                e.preventDefault();
                                this.props.history.push("/logout")
                            }} className="button hollow red">{this.getTrans(this.props.translations.text_8)}</a>
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
    }
}

let mapStateToProps = state => {
    return {
        currentUser: state.auth.profile,
        translations: state.app_lang.data["/my_profile_edit"],
        app_lang: state.app_lang.app_lang,
        common: state.app_lang.common
    }
}

export default compose(withRouter,connect(mapStateToProps, { patchUser }))(MyProfileEdit);