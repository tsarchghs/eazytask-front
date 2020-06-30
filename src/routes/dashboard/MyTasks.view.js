import React from "react";
import { getMyActiveTasks } from "../../actions/app";
import { connect } from "react-redux";

class MyTasks extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.getMyActiveTasks();
    }
    render() {
        return (
            <div>
                My tasks: <br/>
                { this.props.loading &&  "Loading" }
                { !this.props.loading && this.props.tasks.map(task => (
                    <div>
                        {task.title}
                        <img src={task.thumbnail} width="30" />
                        <br/>
                    </div>
                )) }
                {!this.props.tasks.length && "No tasks to show"}
            </div>
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

export default connect(mapStateToProps, { getMyActiveTasks })(MyTasks);
