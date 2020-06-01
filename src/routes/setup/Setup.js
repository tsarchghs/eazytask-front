import React from "react";
import { Redirect } from "react-router-dom";

import WelcomeUser from "./WelcomeUser.view";
import NotificationOption from "./NotificationOption.view";
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

class Setup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            step: 0,
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
            },
            steps: [
                "WELCOME_USER",
                "PROFILE_PICTURE",
                "COVER_PICTURE",
                "LOCATION",
                "NOTIFICATION_OPTION",
                "BECOME_TASKER",
                "MY_SKILLS",
                "MY_LANGUAGES",
                "MY_CITIES",
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
                if (!file) ref.src = "/images/plus.png"
                else {
                    var fr = new FileReader();
                    fr.onload = function () {
                        console.log({ref})
                        ref.src = fr.result;
                    }
                    fr.readAsDataURL(file);
                }
            }
            return prevState;
        })
    }
    onChange = key => e => {
        e.persist()
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
        console.log("setupAccount",this.state.data);
        this.props.patchUser({
            userId: this.props.id,
            data: { ...this.state.data, setupCompleted: true },
            callUpdateAuthProfile: true
        });
        this.props.postTasker(this.state.data);
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
            case 5: return <BecomeTasker />
            case 6: return <MySkills
                skills={this.state.data.skills}
                addSkill={this.onListAdd("skills")}
                removeSkill={this.onListRemove("skills")}
            />
            case 7: return <MyLanguages
                languages={this.state.data.languages}
                addLanguage={this.onListAdd("languages")}
                removeLanguage={this.onListRemove("languages")}
            />
            case 8: return <MyCities
                cities={this.state.data.cities}
                addCity={this.onListAdd("cities")}
                removeCity={this.onListRemove("cities")}
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
            case "LOCATION": return "/images/conversation.png"
            case "BECOME_TASKER": return "/images/Group.png"
            case "MY_SKILLS": return "/images/super_man.png"
            case "MY_LANGUAGES": return "/images/world_connection.png"
            case "MY_CITIES": return "/images/map.png"
            case "READY_TO_GO": return ""
        }
    }
    nextStep = step => () => this.setState({ step })
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
        if (this.state.step !== this.lastStepIndex) return "Next"
        else return "Go"
    }
    getButtonOnClick = () => {
        if (this.state.step === this.lastStepIndex) return this.setupAccount
        else return this.nextStep(this.state.step + 1)
    }
    getDots = () => {
        return this.state.steps.map((x,i) => {
            let active = this.state.steps[this.state.step] === x;
            return <span onClick={this.nextStep(i)} className={`dot ${active ? "active" : ""}`} />
        })
    }
    render(){
        console.log(this.props.profile, "PROFILE")
        if (this.props.setupCompleted) return <Redirect to="/" />
        let displaySkip = this.state.step !== this.lastStepIndex && this.getSkipForNowInfo();
        let coverPicture = this.state.step == 2 ? " profile__cover" : ""
        return (
            <div className="container">
                <div className={"content" + (this.state.step === this.lastStepIndex ? " setup-ready" : "") }>
                    <header>
                        <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                    </header>
                    <section className={`two-column__layout setup__mobile ${coverPicture}`}>
                        <div className="two-column__info flex flex-column">
                            { this.showCurrentStep() }
                            <div className="buttons__group">
                                {   
                                    displaySkip && 
                                    <button onClick={displaySkip.onClick} className="button__style no-color">{displaySkip.show}</button>
                                }
                                <button className="button__style" onClick={this.getButtonOnClick()}>{this.getButtonText()}</button>
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

export default connect(mapStateToProps, { patchUser, postTasker })(Setup);