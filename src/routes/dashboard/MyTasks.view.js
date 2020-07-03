import React from "react";
import { getMyActiveTasks } from "../../actions/app";
import { connect } from "react-redux";
import queryString from 'query-string';
import { getTasksCount } from "../../actions/task";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

class MyTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 6
        }
    }
    getAllPagesNumber = () => {
        let n = this.props.tasks_count.count / this.state.limit || 1;
        if (String(n).slice(0, 1) == "0") n = 0;
        if (String(n) !== String(n).slice(0, 1)) n++;
        return n;
    }
    componentDidMount(){
        let currentPage = Number(queryString.parse(this.props.location.search).page) || 1
        let { limit } = this.state;
        let { currentUserId } = this.props;
        
        let options = { limit, offset: (currentPage * limit) - limit }
        this.props.getMyActiveTasks(options);
        this.props.getTasksCount({ ...options, UserId: currentUserId })
    }
    getPages = () => {
        let pagesNumber = this.getAllPagesNumber()
        let content = []
        let end = pagesNumber >= this.state.currentPage + 2 ? this.state.currentPage + 2 : pagesNumber
        let start = this.state.currentPage - 2 >= 1 ? this.state.currentPage - 2 : 1
        if (this.state.currentPage - 2 < 1) end += -(this.state.currentPage - 2)
        for (let x = start; x <= end; x++) {
            content.push(<Link to={`?tab=my_tasks&page=${x}`}><div>{x}&nbsp;&nbsp;&nbsp;</div></Link>)
        }
        return content;
    }
    render() {
        let { loading, tasks } = this.props;
        loading = loading || this.props.tasks_count.loading;
        return (
            <div>
                My tasks: <br/>
                { loading &&  "Loading" }
                { !loading && tasks.map(task => (
                    <div>
                        {task.title}
                        <img src={task.thumbnail} width="30" />
                        <br/>
                    </div>
                )) }
                { !loading && !tasks.length && "No tasks to show"}
                { !loading && this.getPages() }
            </div>
        )
    }
}
const mapStateToProps = state => {
    let tasks = state.app.myActiveTasks.ids.map(
        x => state.tasks.byIds[x]
    )
    let { loading } = state.app.myActiveTasks;
    return { loading, tasks, tasks_count: state.tasks.tasks_count, currentUserId: state.auth.profile.id }
}

export default compose(withRouter,connect(mapStateToProps, { getMyActiveTasks, getTasksCount }))(MyTasks);
