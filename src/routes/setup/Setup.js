import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import WelcomeUser from "./WelcomeUser.view";
import ProfilePicture from "./ProfilePicture.view";
import CoverPicture from "./CoverPicture.view"
import Location from "./Location.view"
import BecomeTasker from "./BecomeTasker.view"
import MySkills from "./MySkills.view"
import MyLanguages from "./MyLanguages.view"
import MyCities from "./MyCities.view"
import ReadyToGo from "./ReadyToGo.view"

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
                skills: [],
                languages: [],
                cities: [],
            },
            steps: [
                "WELCOME_USER",
                "PROFILE_PICTURE",
                "COVER_PICTURE",
                "LOCATION",
                "BECOME_TASKER",
                "MY_SKILLS",
                "MY_LANGUAGES",
                "MY_CITIES",
                "READY_TO_GO"
            ]
        }
        this.lastStepIndex = this.state.steps.length - 1
    }
    onFileChange = key => e => {
        e.persist()
        this.setState(prevState => {
            prevState.data[key] = e.target.files[0];
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
    onListAdd = key => value => this.onListChange("ADD", key, value);
    onListRemove = key => value => this.onListChange("REMOVE",key,value);
    setupAccount = () => console.log("setupAccount",this.state.data);
    showCurrentStep = () => {
        switch (this.state.step) {
            case 0: return <WelcomeUser first_name={this.props.first_name} />
            case 1: return <ProfilePicture onChange={this.onFileChange("profile_picture_file")} />
            case 2: return <CoverPicture onChange={this.onFileChange("cover_picture_file")} />
            case 3: return <Location
                onZipCodeChange={this.onChange("zipCode")} zipCode={this.state.data.zipCode}
                onAddressChange={this.onChange("address")} address={this.state.data.address}
                onCityChange={this.onChange("city")} city={this.state.data.city}
            />
            case 4: return <BecomeTasker />
            case 5: return <MySkills
                skills={this.state.data.skills}
                addSkill={this.onListAdd("skills")}
                removeSkill={this.onListRemove("skills")}
            />
            case 6: return <MyLanguages
                languages={this.state.data.languages}
                addLanguage={this.onListAdd("languages")}
                removeLanguage={this.onListRemove("languages")}
            />
            case 7: return <MyCities
                cities={this.state.data.cities}
                addCity={this.onListAdd("cities")}
                removeCity={this.onListRemove("cities")}
            />
            case 8: return <ReadyToGo />
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
    render(){
        if (this.props.setupCompleted) return <Redirect to="/"/>
        let displaySkip = this.state.step !== this.lastStepIndex && this.getSkipForNowInfo();
        return (
            <React.Fragment>
                { this.showCurrentStep() } <br/>
                { displaySkip && <React.Fragment><button onClick={displaySkip.onClick}>{displaySkip.show}</button><br/></React.Fragment> }
                <button onClick={this.getButtonOnClick()}>{this.getButtonText()}</button>
            </React.Fragment>            
        )
    }
}

const mapStateToProps = state => ({
    ...state.auth.profile
})

export default connect(mapStateToProps)(Setup);