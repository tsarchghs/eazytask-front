import React from "react";
import { connect } from "react-redux";
import { getMessages, postMessages } from "../../actions/messages";
import Loading from "../../components/loading";
import { Link } from "react-router-dom";
import E404 from "../E404";
import io from 'socket.io-client';
import { v4 } from "uuid";
import { baseURL_WS } from "../../configs"

class TaskChat extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: []
        }
    }
    componentDidMount(){
        let { taskId } = this.props.match.params;
        this.props.getMessages({taskId})
        this.socket = io.connect(baseURL_WS)
        console.log("this.socket", this.socket)
        this.socket.on("connect", () => {
            console.log("socket ON connect")
            this.socket.emit("join_room",{ room_name: "task/" + taskId})
        })
        this.socket.on('share_message', message => {
            console.log("ON_MESSAGE", message)
            if (message.UserId != this.props.currentUserId)
            this.setState(prevState => {
                if (
                    prevState.messages.find(msg => msg.uniqueID == message.uniqueID)
                ) return prevState;
                prevState.messages.push(message);
                return prevState;
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
        if (!this.props.currentUserId) return;
        let { taskId } = this.props.match.params;
        let message = {
            taskId: Number(taskId),
            content: this.state.content,
            client_createdAt: new Date().toISOString()
        }
        this.props.postMessages(message)
        message.UserId = this.props.currentUserId
        message.uniqueID = v4();
        this.socket.emit(`send_message`, message)
        this.setState({ content: ""})
    }
    render(){
        return (
            <div>
                Test<br/>
                Messages: <br/>
                {
                    this.props.messages.concat(this.state.messages).map(msg => (
                        <div>Content: {msg.content}, UserId: {msg.UserId}<br/></div>
                    ))
                }
                {!this.props.messages.length && "No messages to show" }<br/>
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
    return {
        messages, currentUserId: state.auth.profile ? state.auth.profile.id : undefined
    }
}

export default connect(mapStateToProps, { getMessages, postMessages })(TaskChat);