import React from "react";
import { Link, withRouter } from "react-router-dom";
import SideTaskCard2 from "../../components/SideTaskCard2/SideTaskCard2";
import getImageUrl from "../../utils/getImageUrl";
import { compose } from "recompose";
import { connect } from "react-redux";

class AskerProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onTab: "ACTIVE_TASKS"
        }
    }
    getPreviousListings = () => this.props.user.tasks.filter(task => new Date(task.due_date).getTime() < new Date().getTime())
    getCurrentListings = () => this.props.user.tasks.filter(task => new Date(task.due_date).getTime() >= new Date().getTime() )
    tabOnClick = onTab => () => this.setState({ onTab })
    getPreviousListingsUI = () => {
        let tasks = this.getPreviousListings();
        if (tasks.length) return <div className="offers-images">
            {
                tasks.map(task => <SideTaskCard2 task={task} />)
            }
        </div>
        return <p className="special text-center">{this.props.translations.text_3[this.props.app_lang]}</p>
    }
    getActiveListingsUI = () => {
        let tasks = this.getCurrentListings();
        if (tasks.length) return <div className="offers-images">
            {
                tasks.map(task => <SideTaskCard2 task={task}/>)
            }
        </div>
        return <p className="special text-center">{this.props.translations.text_3[this.props.app_lang]}</p>
    }
    getRatingsUI = () => <p className="special text-center">Coming soon!</p>
    getTabContent = () => {
        let { onTab } = this.state;
        if (onTab == "ACTIVE_TASKS") return this.getActiveListingsUI();
        if (onTab == "RATINGS_IN_PROGRESS") return this.getRatingsUI();
        if (onTab == "PREVIOUS_TASKS") return this.getPreviousListingsUI();
    }
    render() {
        let tabOnClick = this.tabOnClick
        return (
            <section className="offers-layout tasker-profile">
                <div className="offers-picture" style={{
                    backgroundImage: `url(${getImageUrl(this.props.user.cover_image) || window.__COVER_DEFAULT_PICTURE__})`
                }}>
                    <div className="offer-picture__buttons">
                        <div style={{cursor: "pointer"}} onClick={this.props.goBack} className="offer-picture__back">
                            <img src="/images/arrow.jpeg" alt="" />
                        </div>
                        <div className="offer-picture__edit hide">
                            <img src="/images/more.png" alt="" />
                        </div>
                    </div>
                    {/* <div class="slice"></div> */}
                </div>
                <div className="offers-content modified">
                    <div className="offers__cards">
                        <div className="offers__card ">
                            <div className="offers__card--top">
                                <div className="offers__profile">
                                    <div className="offers__profile--img" />
                                    <h4 className="flex aic jcc"> <div className="img-circle"><img src={getImageUrl(this.props.user.profile_image) || window.__PROFILE_DEFAULT_PICTURE__} alt="" />
                                    </div> {this.props.user.first_name} {this.props.user.last_name[0]}.</h4>
                                </div>
                                <p className="pre-wrap-text special">{this.props.user.short_biography || this.props.translations.text_1[this.props.app_lang]}</p>
                            </div>
                        </div>
                        <div className="offers-images__layout">
                            <div className="faq-web__top tabs-modified">
                                <div className="home__tabs">
                                    <div style={{ cursor: "pointer" }} onClick={tabOnClick("ACTIVE_TASKS")} className={`home__tab ${this.state.onTab === "ACTIVE_TASKS" ? "active" : ""}`}>
                                        {this.props.translations.asker.text_1[this.props.app_lang]}
                                    </div>
                                    <div style={{ cursor: "pointer" }} onClick={tabOnClick("RATINGS_IN_PROGRESS")} className={`home__tab ${this.state.onTab === "RATINGS_IN_PROGRESS" ? "active" : ""}`}>
                                        {this.props.translations.text_4[this.props.app_lang]}
                                    </div>
                                    <div style={{ cursor: "pointer" }} onClick={tabOnClick("PREVIOUS_TASKS")} className={`home__tab ${this.state.onTab === "PREVIOUS_TASKS" ? "active" : ""}`}>
                                        {this.props.translations.asker.text_2[this.props.app_lang]}
                                    </div>
                                </div>
                            </div>
                            {
                                this.getTabContent()
                            }
                        </div>
                    </div>
                </div>
            </section>

        )    
    }
}

let mapStateToProps = state => ({
    translations: state.app_lang.data["/profile"],
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})

export default compose(
    withRouter,
    connect(mapStateToProps)
)(AskerProfile)


