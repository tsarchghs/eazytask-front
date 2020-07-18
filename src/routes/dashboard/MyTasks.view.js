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
    getTrans = obj => obj[this.props.app_lang]
    render() {
        let { loading, tasks } = this.props;
        loading = loading || this.props.tasks_count.loading;
        return (
            <div>
                {loading && this.getTrans(this.props.common.loading) }
                { !loading && tasks.map(task => (
                    <Link to={`/task/${task.id}`}>
                        <div className="home__card" style={{ backgroundImage: `url("${task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__}")` }}>
                            <div className="home__card--mask" />
                            <h5>{this.getTrans(this.props.translations.text_2)} “{task.title}”</h5>
                            <p>{new Date(task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
                        </div>
                    </Link>
                )) }
                { !loading && !tasks.length && 
                    <div className="home__card--lonely">
                        <h4>{this.getTrans(this.props.translations.text_7)}</h4>
                        <p>{this.getTrans(this.props.translations.text_8)}</p>
                        <img className="mb30" src="/images/waiting_1.png" alt="" style={{ width: '35%' }} />
                        <img src="/images/lonely.jpeg" alt="" />
                    </div>

                }
                { !loading && tasks.length ? this.getPages() : null }
            </div>
        )
    }
}
const mapStateToProps = state => {
    let tasks = state.app.myActiveTasks.ids.map(
        x => state.tasks.byIds[x]
    )
    let { loading } = state.app.myActiveTasks;
    return { 
        loading, tasks, tasks_count: state.tasks.tasks_count, currentUserId: state.auth.profile.id,
        translations: state.app_lang.data["/dashboard"].mobile,
        app_lang: state.app_lang.app_lang,
        common: state.app_lang.common
    }
}

export default compose(withRouter,connect(mapStateToProps, { getMyActiveTasks, getTasksCount }))(MyTasks);
