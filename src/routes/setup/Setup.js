import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import WelcomeUser from "./WelcomeUser.view";
import ProfilePicture from "./ProfilePicture.view";

class Setup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            step: 0,
            steps: [
                "WELCOME_USER",
                "PROFILE_PICTURE",
                "COVER_PICTURE"
            ]
        }
    }
    nextStep = () => {
        this.setState(prevState => {
            prevState.step++;
            return prevState;
        })
    }
    showCurrentStep = () => {
        switch (this.state.step) {
            case 0: return <WelcomeUser first_name={this.props.first_name} />
            case 1: return <ProfilePicture first_name={this.props.first_name} />
        }
    }
    getButtonText = () => {
        if (this.state.step === 0) return "Setup"
        else if (this.state.step !== this.state.steps.length - 1) return "Next"
        else return "Go"
    }
    setupAccount = () => console.log("setupAccount");

    getSkipForNowOnClick = () => {
        if (this.state.step === 0) return this.setupAccount()
        else return this.nextStep()
    }
    getButtonOnClick = () => {
        if (this.state.step === this.state.steps.length - 1) return this.setupAccount()
        else return this.nextStep()
    }
    render(){
        if (this.props.setupCompleted) return <Redirect to="/"/>
        console.log({step:this.state.step})
        return (
            <React.Fragment>
                { this.showCurrentStep() }
                <button onClick={this.getSkipForNowOnClick}>Skip for now</button><br/>
                <button onClick={this.getButtonOnClick}>{this.getButtonText()}</button>
            </React.Fragment>            
        )
    }
}

const mapStateToProps = state => ({
    ...state.auth.profile
})

export default connect(mapStateToProps)(Setup);