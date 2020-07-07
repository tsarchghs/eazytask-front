import React from "react";
import WebDashboard from "./WebDashboard";
import MobileDashboard from "./MobileDashboard";

const Dashboard = props => {
    return (
        <React.Fragment>
            <section className="hide-on-web">
                <MobileDashboard />
            </section>
            <section className="hide-on-mobile">
                <WebDashboard/>
            </section>
        </React.Fragment>
    )
}

export default Dashboard;