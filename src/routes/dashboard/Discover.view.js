import React from "react";
import { compose } from "recompose";
import { Link, withRouter } from "react-router-dom";
import { getActiveListing3 } from "../../actions/app";
import { getTasksCount } from "../../actions/task";
import { connect } from "react-redux";
import queryString from 'query-string';

class Discover extends React.Component {
    state = {
        limit: 6
    }

    componentDidMount() {
        let currentPage = Number(queryString.parse(this.props.location.search).page) || 1
        this.updateTasks(currentPage)
        this.props.getTasksCount()
    }
    updateTasks = currentPage => {
        let { limit } = this.state;
        let offset;
        if (currentPage == 1) offset = 0
        else offset = (currentPage * limit) - limit

        let options = { limit, offset };
        this.props.getActiveListing3(options);
        this.props.getTasksCount(options)

    }
    getAllPagesNumber = () => {
        let n = this.props.tasks_count.count / this.state.limit || 1;
        if (String(n) !== String(n).slice(0,1)) n++;
        return n;
    }
    getPages = () => {
        let pagesNumber = this.getAllPagesNumber()
        console.log({ pagesNumber})
        let content = []
        console.log("this.state.currentPage", this.state.currentPage, pagesNumber)
        let end = pagesNumber >= this.state.currentPage + 2 ? this.state.currentPage + 2 : pagesNumber
        let start = this.state.currentPage - 2 >= 1 ? this.state.currentPage - 2 : 1
        if (this.state.currentPage - 2 < 1) end += -(this.state.currentPage - 2)
        console.log("this.state.currentPage -2 ", this.state.currentPage - 2)
        for (let x = start; x <= end; x++) {
            content.push(<Link to={`?tab=discover&page=${x}`}><div>{x}&nbsp;&nbsp;&nbsp;</div></Link>)
        }
        return content;
    }
    showTasks = () => {
        return this.props.tasks.map(task => (
            <Link to={`/task/${task.id}`}>
                <li key={task.id}>{task.title}<img src={task.thumbnail} width="30" /></li>
            </Link>
        ))
    }
    render() {
        let { loading } = this.props;
        return (
            <div>
                Discover
                { loading && <div>Loading...<br/></div>}
                { !loading && this.showTasks() }
                { !loading && this.getPages() }
            </div>
        )
    }
}

const mapStateToProps = state => {
    let tasks = state.app.activeListing3.ids.map(
        x => state.tasks.byIds[x]
    )
    let { loading } = state.app.activeListing3;
    console.log({tasksss:tasks})
    return {
        loading, tasks, tasks_count: state.tasks.tasks_count
    }
}


export default compose(
    connect(mapStateToProps, { getActiveListing3, getTasksCount }),
    withRouter
)(Discover);