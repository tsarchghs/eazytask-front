import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import queryString from "query-string";

import MyTasks from "./MyTasks.view";
import Discover from "./Discover.view";
import MyActiveOffers from "./MyActiveOffers.view";
import More from "./More.view";

class MobileDashboard extends React.Component {
    constructor(props){
        super(props);
    }
    getActiveTabUI = () => {
        let { search } = this.props.location;
        let params = queryString.parse(search);
        if (!params.tab) params.tab = "my_tasks";
        switch (params.tab){
            case "my_tasks": return <MyTasks/>
            case "discover": return <Discover/>
            case "offers": return <MyActiveOffers/>
            case "more": return <More/>
        }
    }
    render(){
        let { search } = this.props.location;
        let params = queryString.parse(search);
        if (!params.tab) params.tab = "my_tasks";
        let { tab } = params;
        return (
            <div className=" edit-task__wrapper">
                <section className="landing-info panel edit-task__section">
                    <div className="container">
                        <div className="content pb50">
                            <header className="logo-text">
                                {/* <span class="show__mobile"><img src="/images/arrow.jpeg" alt=""></span> */}
                                <h4 className="hide-on-desktop logo-title">
                                </h4>
                            </header>
                            <section className="home">
                                <div className="home__title">
                                    <h3>Howdy, <br /> <span>{this.props.own_profile.first_name}!</span></h3>
                                    <img src="/images/noti.png" alt="" />
                                </div>
                                <div className="home__cards">
                                    <div className="home__card gradient">
                                        <h5>View “Yard Work” <br /><span>new offers</span></h5>
                                        <img src="/images/succ.png" alt="" />
                                    </div>
                                    <div className="home__tabs">
                                        <Link to="?tab=my_tasks">
                                            <div className={`home__tab ${tab == "my_tasks" && "active"}`}>My tasks</div>
                                        </Link>
                                        <Link to="?tab=discover">
                                            <div className={`home__tab ${tab == "discover" && "active"}`}>Discover</div>
                                        </Link>
                                        <Link to="?tab=offers">
                                            <div className={`home__tab ${tab == "offers" && "active"}`}>Offers</div>
                                        </Link>
                                        <Link to="?tab=more">
                                            <div className={`home__tab ${tab == "more" && "active"}`}>More</div>
                                        </Link>
                                    </div>
                                    <div className="home__card--content">
                                        { this.getActiveTabUI() }
                                    </div>
                                </div>
                            </section>
                            <div className="mobile-nav">
                                <Link to="/dashboard">
                                    <div className="mob-nav active">
                                        <img src="/images/nav-home.png" alt="" />
                                        <p>Home</p>
                                    </div>
                                </Link>
                                <Link to="/create-task">
                                    <div className="mob-nav ">
                                        <img src="/images/nav-plus.png" alt="" />
                                    </div>
                                </Link>
                                <Link to="/my_profile_edit">
                                    <div className="mob-nav"><img src="/images/nav-profile.png" alt="" />
                                        <p>Profile</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    own_profile: state.auth.profile
})

export default compose(withRouter,connect(mapStateToProps,{ }))(MobileDashboard);