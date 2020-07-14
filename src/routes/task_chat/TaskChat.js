import React from "react";
import { connect } from "react-redux";
import { getMessages, postMessages } from "../../actions/messages";
import { getTask } from "../../actions/task";
import Loading from "../../components/loading";
import { Link, withRouter } from "react-router-dom";
import E404 from "../E404";
import io from 'socket.io-client';
import { v4 } from "uuid";
import { baseURL_WS } from "../../configs"
import WebHeader from "../../components/WebHeader";
import { compose } from "recompose";

class TaskChat extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: []
        }
    }
    componentDidMount(){
        let { taskId } = this.props.match.params;
        this.props.getTask(taskId, "fields=question,user,offers,category")
        this.props.getMessages({taskId})
        this.socket = io.connect(baseURL_WS)
        console.log("this.socket", this.socket)
        this.socket.on("connect", () => {
            console.log("socket ON connect")
            this.socket.emit("join_room",{ room_name: "task/" + taskId})
        })
        this.socket.on('share_message', message => {
            console.log("ON_MESSAGE", message)
            // if (message.UserId != this.props.currentUserId)
            this.setState(prevState => {
                if (
                    prevState.messages.find(msg => msg.uniqueID == message.uniqueID)
                ) return prevState;
                if (!message.User) message.User = {
                    id: message.UserId,
                    profile_image: message.user_profile_image,
                }
                prevState.messages.push(message);
                console.log("PUSHING message: ", message)
                return { ...prevState, messages: [ ...prevState.messages ] };
            })
        });
        this.socket.on('disconnect', () => console.log("DISCONNECT"));

    }
    componentWillUnmount(){
        this.socket.disconnect()
    }
    handleOnSubmit = e => {
        e.preventDefault();
        if (!this.state.content) return;
        if (!this.props.currentUserId) return this.props.history.push("/register")
        let { taskId } = this.props.match.params;
        let message = {
            taskId: Number(taskId),
            content: this.state.content,
            client_createdAt: new Date().toISOString()
        }
        this.props.postMessages(message)
        message.UserId = this.props.currentUserId
        message.user_profile_image = this.props.own_profile.profile_image
        message.uniqueID = v4();
        console.log({message})
        this.socket.emit(`send_message`, message)
        this.setState({ content: "" })
    }
    inputAndButton = () => (
        <div className="qanda-textarea">
            <textarea value={this.state.content} onChange={e => this.setState({ content: e.target.value })} name placeholder="Type your question here..." id cols={30} rows={1} />
            <img onClick={this.handleOnSubmit} src={this.state.content ? "/images/send-b.png" : "/images/send-g.png"} alt="" />
            {/* <img src="/images/send-b.png" alt="" /> */}
        </div>

    )
    render(){
        if (this.props.taskInfo.loading) return null;
        if (this.props.taskInfo.error) return <E404/>
        console.log(this.state,this.props.messages);
        return (
            <div className=" edit-task__wrapper">
                <section className="landing-info panel edit-task__section">
                    <div className="container">
                        <div className="content ">
                            <WebHeader/>
                            <section className="qanda-web hide-on-mobile">
                                <div className="qanda-web__top">
                                    <div className="img-circle with-hover">
                                        <div className="img-circle__mask"><img src="/images/edit-pen.png" alt="" /></div>
                                        <img src={this.props.taskInfo.task.User.profile_image || window.__PROFILE_DEFAULT_PICTURE__} alt="" />
                                    </div>
                                    <div className="name-info">
                                        <h5>{this.props.taskInfo.task.title} Q&amp;A</h5>
                                        <p>{this.props.taskInfo.task.User.first_name} {this.props.taskInfo.task.User.last_name[0]}.</p>
                                    </div>
                                </div>
                                <div className="qanda-web__items">
                                    {
                                        this.props.messages.concat(this.state.messages).map(msg => {
                                            if (msg.UserId == this.props.taskInfo.task.User.id){
                                                return (
                                                    <div className="qanda-item">
                                                        <div className="img-circle with-hover">
                                                            <div className="img-circle__mask"><img src="/images/edit-pen.png" alt="" /></div>
                                                            <img src={(msg.User && msg.User.profile_image) || window.__PROFILE_DEFAULT_PICTURE__} alt="" />
                                                        </div>
                                                        <div className>
                                                            <h4 className="active">{msg.content}</h4>
                                                        </div>
                                                    </div>

                                                )
                                            } 
                                            else {
                                                return (
                                                    <div className="qanda-item">
                                                        <div className="img-circle with-hover">
                                                            <div className="img-circle__mask"><img src="/images/edit-pen.png" alt="" /></div>
                                                            <img src={(msg.User && msg.User.profile_image) || window.__PROFILE_DEFAULT_PICTURE__} alt="" />
                                                        </div>
                                                        <div className>
                                                            <h4>{msg.content}</h4>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                    {this.inputAndButton()}
                                </div>
                            </section>
                            <section className="profile__article--mobile qanda hide-on-web">
                                <div className=" edit-task__wrapper">
                                    <section className="landing-info panel edit-task__section">
                                        <div className="container">
                                            <div className="content ">
                                                <header className="logo-text hide-on-desktop">
                                                    <span className="show__mobile">
                                                    <Link to={`/task/${this.props.taskInfo.task.id}`}>
                                                        <img src="/images/arrow.jpeg" alt="" />
                                                    </Link>
                                                    </span>
                                                    <h4 className="logo-title ">
                                                        <div className="img-circle with-hover">
                                                            <div className="img-circle__mask"><img src="/images/edit-pen.png" alt="" /></div>
                                                            <img src={this.props.taskInfo.task.User.profile_image || window.__PROFILE_DEFAULT_PICTURE__} alt="" />
                                                        </div>
                                                        <div className="name-info">
                                                            <h5>{this.props.taskInfo.task.title} Q&amp;A</h5>
                                                            <p>{this.props.taskInfo.task.User.first_name} {this.props.taskInfo.task.User.last_name[0]}.</p>
                                                        </div>
                                                    </h4>
                                                </header>
                                                <div className="pb50 ">
                                                    {
                                                        this.props.messages.concat(this.state.messages).map(msg => {
                                                            if (msg.UserId == this.props.taskInfo.task.User.id) {
                                                                return (
                                                                    <div className="qanda-item">
                                                                        <div className="img-circle with-hover">
                                                                            <div className="img-circle__mask"><img src="/images/edit-pen.png" alt="" /></div>
                                                                            <img src={(msg.User && msg.User.profile_image) || window.__PROFILE_DEFAULT_PICTURE__} alt="" />
                                                                        </div>
                                                                        <div className>
                                                                            <h4 className="active">{msg.content}</h4>
                                                                        </div>
                                                                    </div>

                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <div className="qanda-item">
                                                                        <div className="img-circle with-hover">
                                                                            <div className="img-circle__mask"><img src="/images/edit-pen.png" alt="" /></div>
                                                                            <img src={(msg.User && msg.User.profile_image) || window.__PROFILE_DEFAULT_PICTURE__} alt="" />
                                                                        </div>
                                                                        <div className>
                                                                            <h4>{msg.content}</h4>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                                {this.inputAndButton()}
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </div>

        )
        return (
            <div>
                <div>
                    <img src={this.props.taskInfo.task.User.profile_image || window.__PROFILE_DEFAULT_PICTURE__} width="30" />
                    { this.props.taskInfo.task.title} Q&A <br/> 
                    {this.props.taskInfo.task.User.first_name} {this.props.taskInfo.task.User.last_name[0]}
                </div><br/>
                Test<br/>
                Messages: <br/>
                {
                    this.props.messages.concat(this.state.messages).map(msg => (
                        <div>
                            <img width="30" src={(msg.User && msg.User.profile_image) || window.__PROFILE_DEFAULT_PICTURE__} />
                            Content: {msg.content}, UserId: {msg.UserId}, {msg.User.first_name} {msg.User.last_name[0]}<br/>
                        </div>
                    ))
                }
                {!this.props.messages.concat(this.state.messages).length && "No messages to show" }<br/>
                <form onSubmit={this.handleOnSubmit}>
                    <input value={this.state.content} onChange={e => this.setState({content: e.target.value})} />
                    <button>Send</button>
                </form>
            </div>
        )
    }
}

let mapStateToProps = (state, ownProps) => {
    let { taskId } = ownProps.match.params;
    let task = state.messages.tasks[taskId] || { byIds: {}, allIds: [] }
    let messages = task.allIds
                    .map(id => task.byIds[id])
                    .filter(msg => msg.TaskId == taskId)

    let taskInfo = state.tasks.byIds[taskId] || { loading: true };
    return {
        messages, 
        own_profile: state.auth.profile, 
        currentUserId: state.auth.profile ? state.auth.profile.id : undefined,
        taskInfo: { error: taskInfo.error, loading: taskInfo.loading, task: taskInfo }
    }
}

export default compose(withRouter,connect(mapStateToProps, { getTask, getMessages, postMessages }))(TaskChat);