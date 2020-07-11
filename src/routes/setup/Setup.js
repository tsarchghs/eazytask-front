import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { isValidPhoneNumber } from 'react-phone-number-input'

import WelcomeUser from "./WelcomeUser.view";
import NotificationOption from "./NotificationOption.view";
import PhoneInput from "./PhoneInput.view"
import PhoneVerificationCode from "./PhoneVerificationCode.view";
import ProfilePicture from "./ProfilePicture.view";
import CoverPicture from "./CoverPicture.view"
import Location from "./Location.view"
import BecomeTasker from "./BecomeTasker.view"
import MySkills from "./MySkills.view"
import MyLanguages from "./MyLanguages.view"
import MyCities from "./MyCities.view"
import ReadyToGo from "./ReadyToGo.view"

import { connect } from "react-redux";
import { patchUser } from "../../actions/user"; 
import { postTasker } from "../../actions/tasker";

import { compose } from "recompose";

import queryString from "query-string";
import axios from "../../utils/axios";


class Setup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            step: 0,
            prevStep: 0,
            data: {
                profile_picture_file: undefined,
                cover_picture_file: undefined,
                zipCode: "", 
                address: "",
                city: "",
                phone: "",
                notification_option: "EMAIL",
                skills: [],
                languages: [],
                cities: [],
                phone_number:"+383 43 434 397"
            },
            steps: [
                "WELCOME_USER",
                "PROFILE_PICTURE",
                "COVER_PICTURE",
                "LOCATION",
                "NOTIFICATION_OPTION",
                "BECOME_TASKER",
                "MY_SKILLS",
                "MY_CITIES",
                "MY_LANGUAGES",
                "READY_TO_GO"
            ]
        }
        this.lastStepIndex = this.state.steps.length - 1
    }
    onFileChange = key => (e,ref) => {
        e.persist()
        this.setState(prevState => {
            let file = e.target.files[0]
            prevState.data[key] = file;
            console.log({ ref })
            if (ref){
                if (!file) {
                    ref.src = "/images/plus.png"
                    ref.className = "plus-img"
                }
                else {
                    var fr = new FileReader();
                    fr.onload = function () {
                        console.log({ref})
                        ref.src = fr.result;
                        ref.className = ""
                    }
                    fr.readAsDataURL(file);
                }
            }
            return prevState;
        })
    }
    componentDidUpdate(prevProps){
        if (prevProps.location.search != this.props.location.search){
            let { search } = this.props.location;
            let { step } = queryString.parse(search);
            if (!step) step = 0;
            step = Number(step);
            this.setState({ 
                step, prevStep: step - 1
            })
        }
    }
    onChange = key => e => {
        if (e.persist) e.persist()
        this.setState(prevState => {
            prevState.data[key] = e.target.value;
            return prevState;
        })
    }
    onListChange = (type,key,value) => this.setState(prevState => {
        let alreadyExists = prevState.data[key].indexOf(value) !== -1;
        if (type === "ADD" && !alreadyExists) 
            prevState.data[key].push(value);
        else if (type === "REMOVE" && alreadyExists) 
            prevState.data[key] = prevState.data[key].filter(x => x !== value) 
        return prevState;
    })
    getDataPropertyValueOnChange = (key,value) => () => this.setState(prevState => {
        prevState.data[key] = value;
        return prevState;
    })
    onListAdd = key => value => this.onListChange("ADD", key, value);
    onListRemove = key => value => this.onListChange("REMOVE",key,value);
    setupAccount = () => {
        this.props.patchUser({
            userId: this.props.id,
            data: { ...this.state.data, setupCompleted: true },
            callUpdateAuthProfile: true
        });
        if (this.state.prevStep == 8) {
            console.log("POST_TASKER")
            this.props.postTasker(this.state.data);
        }
    }
    showCurrentStep = () => {
        switch (this.state.step) {
            case 0: return <WelcomeUser first_name={this.props.first_name} />
            case 1: return <ProfilePicture onChange={this.onFileChange("profile_image")} />
            case 2: return <CoverPicture onChange={this.onFileChange("cover_image")} />
            case 3: return <Location
                onZipCodeChange={this.onChange("zipCode")} zipCode={this.state.data.zipCode}
                onAddressChange={this.onChange("address")} address={this.state.data.address}
                onCityChange={this.onChange("city")} city={this.state.data.city}
            />
            case 4: return <NotificationOption 
                email={this.state.data.email}
                emailOnchange={this.onChange("email")}
                phone={this.onChange("phone")}
                notification_option={this.state.data.notification_option} 
                phone={this.state.data.phone}
                phoneOnChange={val => this.getDataPropertyValueOnChange("phone",val)()}
                setSMS={this.getDataPropertyValueOnChange("notification_option", "SMS")}
                setEMAIL={this.getDataPropertyValueOnChange("notification_option","EMAIL")}
            />
            case 4.1: return <PhoneInput 
                value={this.state.data.phone_number} 
                onChange={value => this.onChange("phone_number")({ target: { value } })}
            />
            case 4.2: return <PhoneVerificationCode mainButtonClick={this.getButtonOnClick()} phone_number={this.state.data.phone_number}/>
            case 5: return <BecomeTasker />
            case 6: return <MySkills
                skills={this.state.data.skills}
                addSkill={this.onListAdd("skills")}
                removeSkill={this.onListRemove("skills")}
            />
            case 7: return <MyCities
                cities={this.state.data.cities}
                addCity={this.onListAdd("cities")}
                removeCity={this.onListRemove("cities")}
            />
            case 8: return <MyLanguages
                languages={this.state.data.languages}
                addLanguage={this.onListAdd("languages")}
                removeLanguage={this.onListRemove("languages")}
            />
            case 9: return <ReadyToGo />
        }
    }
    getStepImage = () => {
        switch (this.state.steps[this.state.step]){
            case "WELCOME_USER": return "/images/Group.png"
            case "NOTIFICATION_OPTION": return "/images/checklist.png"
            case "PROFILE_PICTURE": return "/images/user_profile.png"
            case "COVER_PICTURE": return "/images/user_profile.png"
            case "LOCATION": return "/images/world_connection.png"
            case "BECOME_TASKER": return "/images/checklist.png"
            case "MY_SKILLS": return "/images/super_man.png"
            case "MY_LANGUAGES": return "/images/conversation.png"
            case "MY_CITIES": return "/images/map.png"
            case "READY_TO_GO": return ""
        }
    }
    nextStep = step => () => {
        this.props.history.push("?step=" + step)
        if (step == 1 && this.state.step == 0) this.setState({ step: 1})
        // this.setState(prevState => {
        //     prevState.prevStep = step - 1;
        //     prevState.step = step;
        //     return step;
        // })
    }
    showSkipBool = () => 
        this.state.step !== this.lastStepIndex &&
        this.state.step <= 5
    getSkipForNowInfo = () => {
        if (this.state.step === 0) 
            return { onClick: this.setupAccount, show: "Skip for now" }
        else if (this.state.steps[this.state.step] === "BECOME_TASKER") 
            return { onClick: this.nextStep(this.lastStepIndex), show: "No, thanks" }
        else return { onClick: this.nextStep(this.state.step + 1), show: "Skip for now" }
    }
    getButtonText = () => {
        if (this.state.step === 0) return "Setup"
        if (this.state.step === this.lastStepIndex - 1) return "Finish"
        if (this.state.step === 4) return "Finish"
        if (this.state.step !== this.lastStepIndex) return "Next"
        else return "Go"
    }
    getButtonOnClick = () => {
        if (this.state.step === this.lastStepIndex) return this.setupAccount
        else {
            if (this.state.step == 4 && this.state.data.notification_option == "SMS") return this.nextStep(4.1);
            if (this.state.step == 4.1) return this.nextStep(4.2);
            if (this.state.step == 4.2) return this.nextStep(5);
            return this.nextStep(this.state.step + 1)
        }
    }
    getDots = () => {
        if (this.state.step === 0) return [];
        if (this.state.step === 5) return [];
        let sliceValues = []
        if (this.state.step > 0 && this.state.step < 5) sliceValues = [1,5]
        else sliceValues = [6,this.state.steps.length -1];
        return this.state.steps.slice(...sliceValues).map((x,i) => {
            let getOnClick = () => {
                console.log(this.state.step,index)
                if (this.state.step <= index) return () => {}
                else return this.nextStep(index);
            }
            let index = this.state.steps.indexOf(x)
            let onStep = this.state.step - sliceValues[0] + 1
            let active = onStep >= i + 1;
            return <span onClick={getOnClick()} className={`dot ${active ? "active" : ""}`} />
        })
    }
    getHeader = () => {
        let show = {
            "MY_SKILLS": "My skills",
            "MY_LANGUAGES": "My languages",
            "MY_CITIES": "My area of activity"
        }
        let step_name = this.state.steps[this.state.step] 
        switch (step_name) {
            case "WELCOME_USER":
                return <header>
                    <a href="#"><img class="logo__img" src="/images/logo.svg" alt=""/></a>
                </header> 
            case "PROFILE_PICTURE":
            case "COVER_PICTURE":
            case "NOTIFICATION_OPTION":
            case "BECOME_TASKER":
            case "READY_TO_GO":
            case "LOCATION":
                return (
                    <header>
                        <span onClick={this.nextStep(this.state.prevStep)} class="show__mobile"><img src="/images/arrow.jpeg" alt=""/></span>
                        <a href="#"><img class="logo__img" src="/images/logo.svg" alt=""/></a>
                    </header>
                )
            case "MY_SKILLS":
            case "MY_LANGUAGES":
            case "MY_CITIES":
                return (
                    <header className="logo-text">
                        <span onClick={this.nextStep(this.state.prevStep)} class="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                        <h4 class="hide-on-desktop">{show[step_name]}</h4>
                        <a href="#"><img class="logo__img" src="/images/logo.svg" alt="" /></a>
                    </header>
                )
        }
    }
    getInsideButtonGroup(){
        if (this.state.step == 4.2){
            return <div>SDSASD</div>
        }
        let displaySkip = this.showSkipBool() && this.getSkipForNowInfo();
        let buttonDisabled = this.state.step == 4.1 && !isValidPhoneNumber(this.state.data.phone_number);
        return (
            <React.Fragment>
                {   
                    displaySkip && 
                    <button onClick={displaySkip.onClick} className="button__style no-color">{displaySkip.show}</button>
                }
                <button 
                    className={`button__style ${buttonDisabled ? "not-filled" : ""}`} 
                    onClick={!buttonDisabled && this.getButtonOnClick()}>
                        {this.getButtonText()}
                </button>
            </React.Fragment>
        )
    }
    render(){
        console.log(this.state, "this.state")
        if (this.props.setupCompleted) return <Redirect to="/" />
        let coverPicture = this.state.step == 2 ? " profile__cover" : ""
        return (
            <div className="container">
                <div className={"content" + (this.state.step === this.lastStepIndex ? " setup-ready" : "") }>
                    { this.getHeader() }
                    <section className={`two-column__layout setup__mobile ${coverPicture}`}>
                        <div className="two-column__info flex flex-column">
                            { this.showCurrentStep() }
                            <div className="buttons__group">
                                {
                                    this.getInsideButtonGroup()
                                }
                            </div>
                        </div>
                        {
                            this.state.step !== this.lastStepIndex &&
                            <div className="two-column__img">
                                <div className="two-column__image">
                                    <img src={this.getStepImage()} alt="" />
                                </div>
                                <div className="dots__group">
                                    { this.getDots() }
                                </div>
                            </div>
                        }
                    </section>
                </div>
            </div>
        )

    }
}

const mapStateToProps = state => ({
    ...state.auth.profile
})

export default compose(withRouter,connect(mapStateToProps, { patchUser, postTasker }))(Setup);