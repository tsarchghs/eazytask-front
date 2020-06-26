import React from "react";
import { connect } from "react-redux";
import { getTask } from "../../actions/task";
import { postOffers } from "../../actions/offer";
import Loading from "../../components/loading";
import { Link } from "react-router-dom";
import E404 from "../E404";

class MyProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return (
            <div>Test</div>
        )
    }
}

let mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(MyProfile);