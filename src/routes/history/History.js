import React from "react";
import { connect } from "react-redux";
import { getMyHistory } from "../../actions/task";

class History extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getMyHistory()
    }
    getShow = task => {
        let show;
        if (task.status == "ACTIVE") {
            show = `Done on ${new Date(task.due_date).toLocaleDateString().replace(/\//g, ".")}`;
        } else if (task.status == "DELETED") {
            show = "Deleted"
        } else if (task.status == "DEACTIVATED") {
            show = "Deactivated"
        }
        return show;
    }
    render(){
        let { loading, err, tasks } = this.props;

        return (
            <div>
                { loading && "Loading.." }
                { err && err.name }
                { !loading && !err && tasks.map(task => (
                    <div>
                        Title: {task.title}<br/>
                        Status: {this.getShow(task)}<br/><br/>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => {
    let tasks = state.tasks.my_history.ids.map(id => state.tasks.byIds[id]);
    return { ...state.tasks.my_history, tasks }
}

export default connect(mapStateToProps, { getMyHistory })(History);