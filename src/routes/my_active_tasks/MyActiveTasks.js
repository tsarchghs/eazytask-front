import React from "react";
import { connect } from "react-redux";
import { getMyActiveTasks } from "../../actions/app";
import { Link } from "react-router-dom";

class MyActiveTasks extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getMyActiveTasks();
    }
    showTasks(){
        return this.props.tasks.map(task => (
            <Link  to={`/task/${task.id}`}>
                <li key={task.id}>{task.title}</li>
            </Link>
        ))
    }
    render(){
        return (
            <React.Fragment>
                <div>My active tasks</div>
                { this.props.loading && "Loading" }
                { !this.props.loading && 
                    <ul>
                        { this.showTasks() }
                    </ul>
                }
            </React.Fragment>
        ) 
    }
}

const mapStateToProps = state => {
    let tasks = state.app.myActiveTasks.ids.map(
        x => state.tasks.byIds[x]
    )
    let { loading } = state.app.myActiveTasks;
    return { loading, tasks }
}

export default connect(mapStateToProps, { getMyActiveTasks })(MyActiveTasks);