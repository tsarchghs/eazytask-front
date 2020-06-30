import React from "react";
import { connect } from "react-redux";
import { patchUser } from "../../actions/user";
import { Redirect } from "react-router-dom";
import MainStep from "./MainStep.view";
import OtherStep from "./OtherStep.view";

class DeleteAccount extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            reason: "",
            checkedValue: "",
            step: "MAIN"
        }
        this.inputs = [
            { value: "Hard to use" },
            { value: "It has a lot of problems" },
            { value: "I don't need it" },
            { value: "I have a better platform" },
            { value: "It's not available in my country" },
        ]
    }
    goToStep = val => () => {
        let patch = { step: val }
        if (val === "OTHER") patch["reason"] = ""
        if (val === "THANK") this.delete();
        this.setState(patch);
    }
    onChange = val => () => this.setState({ reason: val })
    delete = () => {
        this.props.patchUser({ 
            userId: this.props.currentUserId,
            data: {
                reason: this.state.reason, 
                deleted: true
            }, 
            callUpdateAuthProfile: true 
        })
    }
    render(){
        switch (this.state.step) {
            case "MAIN": return <MainStep
                onChange={this.onChange}
                reason={this.state.reason}
                items={this.inputs}
                goToStep={this.goToStep}
            />
            case "OTHER": return <OtherStep
                reason={this.state.reason}
                onChange={this.onChange}
                goToStep={this.goToStep}
            />
            case "THANK": return <Redirect to="/delete_account/thank" />
        }    
    }
}

let mapStateToProps = state => ({
    currentUserId: state.auth.profile.id
})

export default connect(mapStateToProps, { patchUser })(DeleteAccount);