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
            { value: "Hard to use", show: this.getTrans(props.translations.text_3) },
            { value: "It has a lot of problems", show: this.getTrans(props.translations.text_4) },
            { value: "I don't need it", show: this.getTrans(props.translations.text_5) },
            { value: "I have a better platform", show: this.getTrans(props.translations.text_6) },
            { value: "It's not available in my country", show: this.getTrans(props.translations.text_7) },
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
    getTrans = obj => {
        let data = obj[this.props.app_lang];
        if (typeof(data) == "string") return data;
        if (data.length) {
            return data.map(str => <React.Fragment>
                {str}<br/>
            </React.Fragment>)
        }
    }
    render(){
        let { translations, app_lang, common } = this.props;
        let commonProps = { translations, app_lang, common, getTrans: this.getTrans }

        switch (this.state.step) {
            case "MAIN": return <MainStep
                {...commonProps}
                from={this.props.from}
                onChange={this.onChange}
                reason={this.state.reason}
                items={this.inputs}
                goToStep={this.goToStep}
            />
            case "OTHER": return <OtherStep
                {...commonProps}
                reason={this.state.reason}
                onChange={this.onChange}
                goToStep={this.goToStep}
            />
            case "THANK": return <Redirect to="/delete_account/thank" />
        }    
    }
}

let mapStateToProps = state => ({
    currentUserId: state.auth.profile.id,
    translations: state.app_lang.data["/settings"].delete_account.mobile,
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common

})

export default connect(mapStateToProps, { patchUser })(DeleteAccount);