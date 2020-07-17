import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import queryString from "query-string";

import MyTasks from "./MyTasks.view";
import Discover from "./Discover.view";
import MyActiveOffers from "./MyActiveOffers.view";
import More from "./More.view";
import MobileNav from "../../components/MobileNav";

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
    getTrans = obj => obj[this.props.app_lang]
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
                                    <h3>{this.getTrans(this.props.translations.text_1)}, <br /> <span>{this.props.own_profile.first_name}!</span></h3>
                                    <img src="/images/noti.png" alt="" />
                                </div>
                                <div className="home__cards">
                                    <div className="home__card gradient">
                                        <h5>{this.getTrans(this.props.translations.text_2)} “Yard Work” <br /><span>{this.getTrans(this.props.translations.text_23)}</span></h5>
                                        <img src="/images/succ.png" alt="" />
                                    </div>
                                    <div className="home__tabs">
                                        <Link to="?tab=my_tasks">
                                            <div className={`home__tab ${tab == "my_tasks" && "active"}`}>{this.getTrans(this.props.translations.text_3)}</div>
                                        </Link>
                                        <Link to="?tab=discover">
                                            <div className={`home__tab ${tab == "discover" && "active"}`}>{this.getTrans(this.props.translations.text_4)}</div>
                                        </Link>
                                        {
                                            this.props.own_profile.Tasker &&
                                            <Link to="?tab=offers">
                                                <div className={`home__tab ${tab == "offers" && "active"}`}>{this.getTrans(this.props.translations.text_5)}</div>
                                            </Link>
                                        }
                                        <Link to="?tab=more">
                                            <div className={`home__tab ${tab == "more" && "active"}`}>{this.getTrans(this.props.translations.text_6)}</div>
                                        </Link>
                                    </div>
                                    <div className="home__card--content">
                                        { this.getActiveTabUI() }
                                    </div>
                                </div>
                            </section>
                            <MobileNav active="home"/>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    own_profile: state.auth.profile,
    translations: state.app_lang.data["/dashboard"].mobile,
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})

export default compose(withRouter,connect(mapStateToProps,{ }))(MobileDashboard);