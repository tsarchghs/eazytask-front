import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import queryString from "query-string";

import MyTasks from "./MyTasks.view";
import Discover from "./Discover.view";
import More from "./More.view";

class Dashboard extends React.Component {
    constructor(props){
        super(props);
    }
    getActiveTabUI = () => {
        let { search } = this.props.location;
        let params = queryString.parse(search);
        if (!params.tab) params.tab = "my_tasks";
        switch (params.tab){
            case "my_tasks": return <MyTasks/>
            case "discover": return <Discover/>
            case "more": return <More/>
        }
    }
    render(){
        return (
            <React.Fragment>
                Howdy {this.props.own_profile.first_name}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/notifications">Notifications</Link>

                <br/>
                <div style={{display: "flex" }}>
                    <Link to="?tab=my_tasks">
                        <div style={{marginLeft: 50}}>My tasks</div>
                    </Link>
                    <Link to="?tab=discover">
                        <div style={{marginLeft: 50}}>Discover</div>
                    </Link>
                    <Link to="?tab=more">
                        <div style={{marginLeft: 50}}>More</div>
                    </Link>
                </div>
                <hr/>
                <div>
                    { this.getActiveTabUI() }
                </div>
                <hr />
                <div style={{ display: "flex" }}>
                    <Link to="/dashboard">
                        <div style={{ marginLeft: 50 }}>Home</div>
                    </Link>
                    <Link to="/create-task">
                        <div style={{ marginLeft: 50 }}>+</div>
                    </Link>
                    <Link to="/my_profile_edit">
                        <div style={{ marginLeft: 50 }}>{"<PersonIcon>"}</div>
                    </Link>
                </div>     
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    own_profile: state.auth.profile
})

export default compose(withRouter,connect(mapStateToProps,{ }))(Dashboard);