import React from "react";
import { connect } from "react-redux";
import { patchUser } from "../../actions/user";
import cloneDeep from "../../utils/cloneDeep";
import Loading from "../../components/loading";
import { Link } from "react-router-dom";
import E404 from "../E404";

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
    getInputValue = key => this.state.data[key] || this.props.currentUser[key]
    getKeyDisplay = key => this.displayKey[key] || key[0].toUpperCase() + key.slice(1)
    getStatic = key => (
        <label style={{display: "flex"}}>
            {this.getKeyDisplay(key)}: {this.getInputValue(key)}  &nbsp;&nbsp;&nbsp;
            <div onClick={() => this.setState({onEdit: key})}>Edit</div>
        </label>
    )
    getInput = key => (
        <label style={{ display: "flex" }}>
            {this.getKeyDisplay(key)}:
            <input value={this.getInputValue(key)} onChange={this.handleOnChange(key)} /> 
            <div onClick={() => this.setState({ onEdit: "" })}>Done</div>

        </label>
    )
    getStaticOrInput = key => this.state.onEdit != key ? this.getStatic(key) : this.getInput(key);
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

        var useThis = this;
        setTimeout(() => {
            let el = document.getElementById("profileImage") 
            if (el) el.src = useThis.props.currentUser.profile_image
        }, 500);
    }
    render(){
        console.log({state: this.state})
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

export default connect(mapStateToProps, { patchUser })(MyProfileEdit);