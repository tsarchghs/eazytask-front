import React from "react";
import { Link } from "react-router-dom";

import TaskItem from "./TaskItem.view"
import { connect } from "react-redux";
import { getActiveListing } from "../../actions/app";

class TaskList extends React.Component {
    componentDidMount(){
        this.props.getActiveListing();
    }
    getListUI(){
        switch (this.props.loading){
            case true: return <div>Loading</div>
            case false: return (
                <ul>
                    {this.props.tasks.map(task => (
                        <TaskItem item={task} />
                    ))}
                </ul>
            )
        }
    }
    render() {
        return (
            <React.Fragment> <br/>
                <h4 style={{ display: "inline" }}>Active listing  </h4>
                <Link to="/active_listing">
                    <h6 style={{display: "inline"}}>Discover all</h6>
                </Link>
                { this.getListUI() }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    let tasks = state.app.activeListing.ids.map(
        x => state.tasks.byIds[x]
    )
    let { loading } = state.app.activeListing;
    return { loading, tasks }
}

export default connect(mapStateToProps, { getActiveListing })(TaskList);