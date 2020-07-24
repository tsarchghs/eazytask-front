import React from "react";
import axios from "../../utils/axios";
import jwt from "jsonwebtoken";

class WithNotificationsInfo extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            error: undefined,
            loading: false,
            payload: undefined
        }
    }
    componentDidMount(){
        let decoded = false;
        let token = localStorage.getItem("eazytask:token");
        if (token) decoded = jwt.decode(token);
        if (decoded) {
            let { userId } = decoded
            if (userId != this.props.task.UserId) return;
        }
        this.setState({ 
            error: undefined,
            loading: true,
            payload: undefined
         })
        axios.get("/get_latest_offer_received_notification/" + this.props.task.id)
            .then(({data}) => {
                let payload = data.data;
                this.setState({ data, loading: false, payload })
            })
            .catch(error => {
                this.setState({ error, loading: false })
            })
    }
    getActive = () => {
        if (this.state.error) return false;
        if (this.state.loading) return false;
        if (this.state.payload) return true;
    }
    render(){
        let active = this.getActive();
        let WrappedComponent = this.props.children;
        return <WrappedComponent task={this.props.task} active={active} />
    }
}

export default WrappedComponent => props => (
    <WithNotificationsInfo {...props}>
        {WrappedComponent}
    </WithNotificationsInfo>
) 