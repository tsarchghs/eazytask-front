import React from "react";
import { connect } from "react-redux";
import { getTask } from "../../actions/task";
import { GET_TASK } from "../../actionTypes";
import Loading from "../../components/loading";
import E404 from "../E404";

class Task extends React.Component {
    componentDidMount(){
        this.props.getTask(this.props.match.params.taskId)
    }
    render(){
        if (this.props.task_status.error)
            if (this.props.task_status.errorResponse.response.status === 404) return <E404/>
        if (this.props.task_status.loading) return <Loading/>
        return (
            <div>
                Task - {JSON.stringify(this.props.task)}
            </div> 
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    let { taskId } = ownProps.match.params
    let task = state.tasks.byIds[taskId]
    let task_status = state.tasks[GET_TASK][taskId] || {}
    return { task, task_status }
}

export default connect(mapStateToProps, { getTask })(Task);