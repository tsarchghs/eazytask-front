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

import * as Yup from "yup";

class Setup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            valid: true,
            step: 0,
            prevStep: 0,
            data: {
                profile_image: {},
                cover_image: {},
                zipCode: "", 
                address: "",
                city: "",
                phone: "",
                notification_option: "EMAIL",
                skills: [],
                languages: [],
                cities: [],
                phone_number:"+41"
            },
            setupTasker: false,
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
        this.validations = {
            "PROFILE_PICTURE": {
                isValid: async () => this.state.data.profile_image && this.state.data.profile_image.type
            },
            "COVER_PICTURE": {
                isValid: () => this.state.data.cover_image && this.state.data.cover_image.type
            },
            "LOCATION": Yup.object().shape({ 
                zipCode: Yup.string().required(this.getTrans(props.translations.text_42)),
                address: Yup.string().required(this.getTrans(props.translations.text_43)),
                city: Yup.string().required(this.getTrans(props.translations.text_44))
            }),
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
        }, async () => {
            let stepKey = this.state.steps[this.state.step]
            let valid = this.validations[stepKey] ? await this.validations[stepKey].isValid(this.state.data) : true;
            console.log("this.validations[stepKey]",this.validations[stepKey],valid)
            this.setState({ valid })    
        })
    }
    componentDidUpdate(prevProps){
        if (prevProps.location.search != this.props.location.search){
            let { search } = this.props.location;
            let { step } = queryString.parse(search);
            if (!step) step = 0;
            step = Number(String(step).slice(0,3));
            let prevStep = String(step).indexOf(".") !== -1 ? Math.round(step - 0.1) : step - 1 ;
            console.log({step,prevStep});
            this.setState({ 
                step, prevStep
            })
        }
    }
    onChange = key => async e => {
        if (e.persist) e.persist()
        this.setState(prevState => {
            prevState.data[key] = e.target.value;
            return prevState;
        }, async () => {
            let stepKey = this.state.steps[this.state.step]
            let valid = this.validations[stepKey] ? await this.validations[stepKey].isValid(this.state.data) : true;
            this.setState({ valid })    
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
        if (this.state.setupTasker) {
            console.log("POST_TASKER")
            this.props.postTasker(this.state.data);
        }
    }
    handleInputKeyDown = e => {
        if (e.key == "Enter") {
            let buttonDisabled = this.state.step == 4.1 && !isValidPhoneNumber(this.state.data.phone_number) || !this.state.valid;
            if (!buttonDisabled) this.getButtonOnClick()()
        }
    }
    showCurrentStep = () => {
        let { translations, app_lang, common } = this.props;
        let commonProps = { handleInputKeyDown: this.handleInputKeyDown, translations, app_lang, common, getTrans: this.getTrans }
        switch (this.state.step) {
            case 0: return <WelcomeUser {...commonProps} first_name={this.props.first_name} />
            case 1: return <ProfilePicture {...commonProps} onChange={this.onFileChange("profile_image")} />
            case 2: return <CoverPicture {...commonProps} onChange={this.onFileChange("cover_image")} />
            case 3: return <Location {...commonProps}
                onZipCodeChange={this.onChange("zipCode")} zipCode={this.state.data.zipCode}
                onAddressChange={this.onChange("address")} address={this.state.data.address}
                onCityChange={this.onChange("city")} city={this.state.data.city}
            />
            case 4: return <NotificationOption {...commonProps} 
                email={this.state.data.email}
                emailOnchange={this.onChange("email")}
                phone={this.onChange("phone")}
                notification_option={this.state.data.notification_option} 
                phone={this.state.data.phone}
                phoneOnChange={val => this.getDataPropertyValueOnChange("phone",val)()}
                setSMS={this.getDataPropertyValueOnChange("notification_option", "SMS")}
                setEMAIL={this.getDataPropertyValueOnChange("notification_option","EMAIL")}
            />
            case 4.1: return <PhoneInput {...commonProps} 
                value={this.state.data.phone_number} 
                onChange={value => this.onChange("phone_number")({ target: { value }})}
            />
            case 4.2: return <PhoneVerificationCode {...commonProps} mainButtonClick={this.getButtonOnClick()} phone_number={this.state.data.phone_number}/>
            case 5: return <BecomeTasker {...commonProps} />
            case 6: return <MySkills {...commonProps}
                skills={this.state.data.skills}
                addSkill={this.onListAdd("skills")}
                removeSkill={this.onListRemove("skills")}
            />
            case 7: return <MyCities {...commonProps}
                cities={this.state.data.cities}
                addCity={this.onListAdd("cities")}
                removeCity={this.onListRemove("cities")}
            />
            case 8: return <MyLanguages {...commonProps}
                languages={this.state.data.languages}
                addLanguage={this.onListAdd("languages")}
                removeLanguage={this.onListRemove("languages")}
            />
            case 9: return <ReadyToGo {...commonProps} />
        }
    }
    getStepImage = () => {
        if (this.state.step == 4.1) return "/images/world_connection.png"
        if (this.state.step == 4.2) return "/images/world_connection.png"
        switch (this.state.steps[this.state.step]){
            case "WELCOME_USER": return "/images/Group.png"
            case "NOTIFICATION_OPTION": return "/images/notifications_1.png"
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
    nextStep = step => async () => {
        this.props.history.push("?step=" + step)
        if (step == 1 && this.state.step == 0) this.setState({ step: 1 })
        
        let stepKey = this.state.steps[step]
        let valid = this.validations[stepKey] ? await this.validations[stepKey].isValid(this.state.data) : true;
        this.setState({ valid })

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
            return { onClick: this.setupAccount, show: this.getTrans(this.props.translations.text_36) }
        else if (this.state.steps[this.state.step] === "BECOME_TASKER") 
            return { onClick: this.nextStep(this.lastStepIndex), show: this.getTrans(this.props.translations.text_41) }
        else if (this.state.step == 4.1) 
            return { onClick: () => {
                this.nextStep(5)()
                this.setState(prevState => {
                    prevState.data.notification_option = "EMAIL"
                    return { ...prevState, data: { ...prevState.data } }
                })
            } 
                , show: this.getTrans(this.props.translations.text_36) } 
        else return { onClick: this.nextStep(this.state.step + 1), show: this.getTrans(this.props.translations.text_36) }
    }
    getButtonText = () => {
        if (this.state.step === 4) return this.getTrans(this.props.translations.text_35)
        if (this.state.step === 5) return this.getTrans(this.props.translations.text_45)
        if (this.state.step === 0) return this.getTrans(this.props.translations.text_40)
        if (this.state.step === this.lastStepIndex - 1) return this.getTrans(this.props.translations.text_37)
        if (this.state.step === 4) {
            if (this.state.data.notification_option == "EMAIL") return this.getTrans(this.props.translations.text_37)
            else if (this.state.data.notification_option == "SMS") return this.getTrans(this.props.translations.text_35)
        }
        if (this.state.step !== this.lastStepIndex) return this.getTrans(this.props.translations.text_35)
        else return this.getTrans(this.props.translations.text_34)
    }
    getButtonOnClick = () => {
        if (this.state.step === this.lastStepIndex) return this.setupAccount
        else {
            if (this.state.step == 4 && this.state.data.notification_option == "SMS") return this.nextStep(4.1);
            if (this.state.step == 4.1) return () => {
                console.log(55);
                this.nextStep(4.2)();
            }
            if (this.state.step == 4.2) return this.nextStep(5);
            if (this.state.step == 5) return () => {
                this.setState({ setupTasker: true })
                this.nextStep(this.state.step + 1)()
            }
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
            "MY_SKILLS": this.getTrans(this.props.translations.text_26),
            "MY_LANGUAGES": this.getTrans(this.props.translations.text_30),
            "MY_CITIES": this.getTrans(this.props.translations.text_28)
        }
        let step_name = this.state.steps[this.state.step] 
        let Header1 = (
            <header>
                <span onClick={this.nextStep(this.state.prevStep)} class="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                <img style={{cursor:"pointer"}} class="logo__img" src="/images/logo.svg" alt="" />
            </header>
        )
        if (this.state.step == 4.1) return Header1
        if (this.state.step == 4.2) return Header1
        switch (step_name) {
            case "WELCOME_USER":
                return <header>
                    <img style={{ cursor: "pointer" }} class="logo__img" src="/images/logo.svg" alt=""/>
                </header> 
            case "PROFILE_PICTURE":
            case "COVER_PICTURE":
            case "NOTIFICATION_OPTION":
            case "BECOME_TASKER":
            case "READY_TO_GO":
            case "LOCATION":
                return Header1
            case "MY_SKILLS":
            case "MY_LANGUAGES":
            case "MY_CITIES":
                return (
                    <header className="logo-text">
                        <span onClick={this.nextStep(this.state.prevStep)} class="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                        <h4 class="hide-on-desktop">{show[step_name]}</h4>
                        <img style={{ cursor: "pointer" }} class="logo__img" src="/images/logo.svg" alt="" />
                    </header>
                )
        }
    }
    getInsideButtonGroup(){
        if (this.state.step == 4.2) return null;

        let displaySkip = this.showSkipBool() && this.getSkipForNowInfo();
        let buttonDisabled = (this.state.step == 4.1 && (
                !isValidPhoneNumber(this.state.data.phone_number) ||
                this.state.data.phone_number.indexOf("+41") === -1
            )) || !this.state.valid;
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
    getTrans = obj => obj[this.props.app_lang]
    render(){
        console.log(this.state, "this.state")
        if (this.props.setupCompleted) return <Redirect to="/" />
        let coverPicture = this.state.step == 2 ? " profile__cover" : ""
        return (
            <div className="container">
                <div className={"content" + (this.state.step === this.lastStepIndex ? " setup-ready" : "") }>
                    { this.getHeader() }
                    <section className={`two-column__layout setup__mobile ${coverPicture}`} style={{ height: "calc(99vh - 114.6px)"}}>
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
                                    <img 
                                        style={
                                            this.getStepImage() === "/images/notifications_1.png" ||
                                            this.getStepImage() === "/images/checklist.png" || 
                                            this.getStepImage() === "/images/super_man.png" ||
                                            this.getStepImage() === "/images/map.png"
                                             ? { width: "70%" } : (
                                                 this.getStepImage() === "/images/conversation.png" 
                                                 ? { width: "85%" }
                                                 : { }
                                             )
                                        }
                                    src={this.getStepImage()} alt="" />
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
    ...state.auth.profile,
    translations: state.app_lang.data["/setup"],
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})

export default compose(withRouter,connect(mapStateToProps, { patchUser, postTasker }))(Setup);