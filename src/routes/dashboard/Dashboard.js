import React from "react";
import WebDashboard from "./WebDashboard";
import MobileDashboard from "./MobileDashboard";
import axios from "../../utils/axios";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            loading: true,
            payload: undefined
        }
    }
    componentDidMount() {
        this.setState({
            error: undefined,
            loading: true,
            payload: undefined
        })
        axios.get("/get_latest_offer_received_notification_general")
            .then(({ data }) => {
                let payload = data.data;
                this.setState({ loading: false, payload })
            })
            .catch(error => {
                this.setState({ error, loading: false })
            })
    }
    render(){
        return (
            <React.Fragment>
                <section className="hide-on-web">
                    <MobileDashboard offer_notification_info={this.state}/>
                </section>
                <section className="hide-on-mobile">
                    <WebDashboard offer_notification_info={this.state}/>
                </section>
            </React.Fragment>
        )
    }
}

export default Dashboard;