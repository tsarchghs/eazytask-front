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
            <Link to={`/task/${task.id}/edit`}>
                <div className="offers-image active">
                    <img src="/images/ustah.jpeg" alt="" />
                    <div>
                        <h4>{task.title}</h4>
                        <p>{new Date(task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
                    </div>
                </div>
            </Link>
        ))
    }
    render(){
        let tasks = this.showTasks();
        return (
            <div className="wrapper">
                <section className="landing-info panel edit-task__section">
                    <div className="container">
                        <div className="content">
                            <header className="flex jcsb aic">
                               <Link to="/">
                                <img className="logo__img" src="/images/logo.svg" alt="" />
                               </Link>
                            </header>
                            <div className="background-title mb5">
                                <h3>My active</h3>
                                <h4>tasks</h4>
                            </div>
                            {this.props.loading && "Loading"}
                            {!this.props.loading &&
                                <section className="tasker-profile">
                                    <div className="offers-images__layout">
                                        <div className="offers-images">
                                            {tasks}
                                            {!tasks.length && "No tasks to show"}
                                        </div>
                                    </div>
                                </section>
                            }
                        </div>
                    </div>
                </section>
            </div>
        )
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