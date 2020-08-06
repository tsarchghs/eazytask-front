import React from "react";
import { compose } from "recompose";
import { Link, withRouter } from "react-router-dom";
import { getActiveListing3 } from "../../actions/app";
import { getTasksCount } from "../../actions/task";
import { connect } from "react-redux";
import queryString from 'query-string';
import SideTaskCard from "../../components/SideTaskCard";

class Discover extends React.Component {
    state = {
        limit: 5
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
        if (String(n).slice(0, 1) == "0") n = 0;
        if (String(n) !== String(n).slice(0, 1)) n++;
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
    getTrans = obj => obj[this.props.app_lang]
    showTasks = () => {
        return this.props.tasks.map(task => 
            <SideTaskCard task={task} beforeTitleText={this.getTrans(this.props.translations.text_2)} />
        )
    }
    render() {
        let { loading } = this.props;
        return (
            <div>
                {loading && <p className="special">{this.getTrans(this.props.common.loading)}<br/></p>}
                { !loading && this.showTasks() }
                { 
                    !loading && this.props.tasks_count.count > this.props.tasks.length && 
                    <Link to="/active_listing" style={{ textAlign: "center", marginLeft: "41%" }}>View all</Link>
                }
                {/* { !loading && <div style={{ display: "flex" }}>{this.getPages()}</div> } */}
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
        loading, tasks, tasks_count: state.tasks.tasks_count,
        translations: state.app_lang.data["/dashboard"].mobile,
        app_lang: state.app_lang.app_lang,
        common: state.app_lang.common
    }
}


export default compose(
    connect(mapStateToProps, { getActiveListing3, getTasksCount }),
    withRouter
)(Discover);