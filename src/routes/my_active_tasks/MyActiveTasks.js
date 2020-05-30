import React from "react";
import { connect } from "react-redux";
import { getMyActiveTasks } from "../../actions/app";

class MyActiveTasks extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getMyActiveTasks();
    }
    showTasks(){
        return this.props.tasks.map(task => (
            <li key={task.id}>{task.title}</li>
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