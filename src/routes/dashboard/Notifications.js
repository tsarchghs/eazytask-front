import React from "react";
import axios from "../../utils/axios";
import getNotificationInfo from "../../utils/getNotificationInfo";
import { withRouter } from "react-router-dom";

class Notifications extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            error: undefined,
            payload: undefined
        }
    }
    componentDidMount(){
        this.setState({ loading: true })
        axios.get("/get_dashboard_notifications")
            .then(({ data }) => this.setState({ payload: data.data, loading: false }))
            .catch(error => this.setState({ error, loading: false }))
    }
    render(){
        let { loading, error, payload } = this.state;
        if (loading) return "Loading";
        if (error) {
            console.log(error)
            return "Error";
        }
        console.log("this.props1",this.props)
        if (this.props.children) return this.props.children({ loading, error, payload })
        return (
            <div className="home__notifications">
                <h3 className="flex aic fs28 fwn mb30">
                    <img style={{ width: '32px', marginRight: '15px' }} src="/images/noti.png" alt="" />
                    Notifications
                </h3>
                <div className="home__noti-cards">
                    {
                        payload.map(notifc => {
                            let info = getNotificationInfo[notifc.type](notifc);
                            console.log({ info }, this.props)
                            return (
                                <div 
                                    onClick={e => {
                                        axios.post("/read_notification/" + notifc.id)
                                        this.props.history.push(info.pathname)
                                    }} 
                                    className={"home__noti-card " + (!notifc.read ? "highlighted" : "")}
                                    style={{ display: "inline-flex", cursor: "pointer" }}
                                >
                                    <div className="img-circle" style={{ width: '43px', height: '43px', minWidth: '43px' }}><img src={
                                        notifc.user_2.profile_image || window.__PROFILE_DEFAULT_PICTURE__
                                    } alt="" /></div>
                                    <div clas="flex	aic">
                                        <h3 className="fs18 fwb mb0">{notifc.user_2.first_name} {notifc.user_2.last_name[0]}.</h3>
                                        <p className="fs15 fwn mb0 special">{info.text}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>        
        )
    }
}

export default withRouter(Notifications)