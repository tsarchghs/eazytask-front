import React from "react";
import { connect } from "react-redux";
import { getUser } from "../../actions/user";
import { compose } from "recompose";
import { withRouter, Link } from "react-router-dom";
import Loading from "../../components/loading";
import E404 from "../E404";

import TaskerProfile from "./TaskerProfile";
import AskerProfile from "./AskerProfile";

class Profile extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getUser(this.props.match.params.userId,{ fields: "tasker,task"});
    }
    render(){
        if (this.props.loading) return <Loading/>
        if (this.props.error) return <E404/>
        if (this.props.user.Tasker && this.props.user.isTasker) return <TaskerProfile goBack={this.props.goBack} user={this.props.user}/>
        else return <AskerProfile goBack={this.props.goBack} user={this.props.user}/>
    }
}

const mapStateToProps = (state, ownProps) => {
    let { userId } = ownProps.match.params
    let { loading, error, ...user } = state.users.byIds[userId] || { loading: true }
    return { loading, error, user }
}

export default compose(
    withRouter,
    connect(mapStateToProps,{ getUser }),
)(Profile);