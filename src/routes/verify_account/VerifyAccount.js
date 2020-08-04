import React from "react";
import axios from "../../utils/axios";
import { withRouter } from "react-router";

class VerifyAccount extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        axios.post(`/verify_account/${this.props.match.params.token}`).then(() => {
            this.props.history.push("/login?valid_verification_link")
        }).catch(err => {
            this.props.history.push("/login?invalid_verification_link")
        })
    }
    render(){
        return null;
    }
}

export default withRouter(VerifyAccount);