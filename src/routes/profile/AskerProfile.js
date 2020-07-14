import React from "react";
import { Link, withRouter } from "react-router-dom";

class TaskerProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onTab: "ACTIVE_TASKS"
        }
    }
    getPreviousListings = () => this.props.user.tasks.filter(task => new Date(task.due_date).getTime() < new Date().getTime())
    getCurrentListings = () => this.props.user.tasks.filter(task => new Date(task.due_date).getTime() >= new Date().getTime() )
    tabOnClick = onTab => () => this.setState({ onTab })
    getAboutUI2 = () => (
        <div style={{ display: "inline-flex" }}>
            <div style={{ marginLeft: 10 }}>
                Skills: {this.props.user.Tasker.Skills.map(skill => skill.name).join(",")}
            </div>
            <div style={{ marginLeft: 10 }}>
                Languages: {this.props.user.Tasker.Languages.map(language => language.name).join(",")}
            </div>
            <div style={{ marginLeft: 10 }}>
                Cities: {this.props.user.Tasker.Cities.map(city => city.name).join(",")}
            </div>
        </div>
    )
    getAboutUI = () => {
        return (
            <div className="offers-images tasker-card__about">
                <div className="offers-image">
                    <article className="task__left">
                        <p>Skills</p>
                        <ul>
                            {this.props.user.Tasker.Skills.map(skill => <li>{skill.name}</li>)}
                        </ul>
                    </article>
                    <article className="task__right">
                        <img src="/images/super_man.png" alt="" />
                    </article>
                </div>
                <div className="offers-image">
                    <article className="task__left">
                        <p>Languages</p>
                        <ul>
                            {this.props.user.Tasker.Languages.map(lang => <li>{lang.name}</li>)}
                        </ul>
                    </article>
                    <article className="task__right">
                        <img src="/images/conversation.png" alt="" />
                    </article>
                </div>
                <div className="offers-image">
                    <article className="task__left">
                        <p>Area of Activity</p>
                        <ul>
                            {this.props.user.Tasker.Cities.map(city => <li>{city.name}</li>)}
                        </ul>
                    </article>
                    <article className="task__right">
                        <img src="/images/map.png" alt="" />
                    </article>
                </div>
            </div>

        )
    }
    getPreviousListingsUI = () => {
        let tasks = this.getPreviousListings();
        if (tasks.length) return <div className="offers-images">
            {
                tasks.map(task => (
                    <Link to={"/task/" + task.id}>
                        <div className="offers-image">
                            <img src={task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__} />
                            <div>
                                <h4>{task.title}</h4>
                                <p>{new Date(task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
        return <center>No tasks to show</center>
    }
    getActiveListingsUI = () => {
        let tasks = this.getCurrentListings();
        console.log("this.getCurrentListings", this.getCurrentListings())
        if (tasks.length) return <div className="offers-images">
            {
                tasks.map(task => (
                    <Link to={"/task/" + task.id}>
                        <div className="offers-image">
                            <img src={task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__} />
                                <div>
                                <h4>{task.title}</h4>
                                <p>{new Date(task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
                                </div>
                        </div>
                    </Link>
                ))
            }
        </div>
        return <center>No tasks to show</center>
    }
    getTabContent = () => {
        let { onTab } = this.state;
        if (onTab == "ACTIVE_TASKS") return this.getActiveListingsUI();
        if (onTab == "PREVIOUS_TASKS") return this.getPreviousListingsUI();
    }
    render() {
        let tabOnClick = this.tabOnClick
        return (
            <section className="offers-layout tasker-profile">
                <div className="offers-picture" style={{
                    backgroundImage: `url(${this.props.user.cover_image || window.__COVER_DEFAULT_PICTURE__})`
                }}>
                    <div className="offer-picture__buttons">
                        <div onClick={e => {
                            try {
                                this.props.history.goBack();
                            } catch (e) {
                                this.props.history.push("/dashboard")
                            }
                        }} className="offer-picture__back">
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
                                    <h4 className="flex aic jcc"> <div className="img-circle"><img src={this.props.user.profile_image || window.__PROFILE_DEFAULT_PICTURE__} alt="" />
                                    </div> {this.props.user.first_name} {this.props.user.last_name[0]}.</h4>
                                </div>
                                <p className="special">{this.props.user.short_biography || "No short biography"}</p>
                            </div>
                        </div>
                        <div className="offers-images__layout">
                            <div className="faq-web__top tabs-modified">
                                <div className="home__tabs">
                                    <div onClick={tabOnClick("ACTIVE_TASKS")} className={`home__tab ${this.state.onTab === "ACTIVE_TASKS" ? "active" : ""}`}>Active tasks</div>
                                    <div onClick={tabOnClick("PREVIOUS_TASKS")} className={`home__tab ${this.state.onTab === "PREVIOUS_TASKS" ? "active" : ""}`}>Previous tasks</div>
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
        return (
            <React.Fragment>
                Pic: <img src={this.props.user.profile_image || window.__PROFILE_DEFAULT_PICTURE__} alt="" /><br />
                Name: {this.props.user.first_name} {this.props.user.last_name[0]}.<br />
                Bio: <p className="special">{this.props.user.short_biography || "No short biography"}</p><br />

                <div style={{ display: "inline-flex" }}>
                    <div onClick={tabOnClick("PREVIOUS_LISTINGS")}>Previous listings</div>
                    <div onClick={tabOnClick("RATINGS")}>Ratings</div>
                    <div onClick={tabOnClick("ABOUT")}>About</div>
                </div><br />
                {this.state.onTab == "PREVIOUS_LISTINGS" && JSON.stringify(this.getPreviousListings())}
                {this.state.onTab == "RATINGS" && "Not for the current scope"}
                {this.state.onTab == "ABOUT" && this.getAboutUI()}
            </React.Fragment>
        )
    }
}
export default withRouter(TaskerProfile);

// import React from "react";
// import { Link } from "react-router-dom";

// class AskerProfile extends React.Component {
//     constructor(props){
//         super(props);
//     }
//     getPreviousListings = () => this.props.user.tasks.filter(task => new Date(task.due_date).getTime() < new Date().getTime())
//     getCurrentListings = () => this.props.user.tasks.filter(task => new Date(task.due_date).getTime() >= new Date().getTime() )
//     render() {
//         return (
//             <section className="offers-layout tasker-profile">
//                 <div className="offers-picture" style={{
//                     backgroundImage: `url(${this.props.user.cover_image || window.__COVER_DEFAULT_PICTURE__})`
//                 }}>
//                     <div className="slice" />
//                 </div>
//                 <div className="offers-content ">
//                     <div className="offers__cards">
//                         <div className="offers__card">
//                             <div className="offers__card--top">
//                                 <div className="offers__profile">
//                                     <div className="offers__profile--img" />
//                                     <h4 className="flex aic jcc"> 
//                                     <div className="img-circle">
//                                     <img src={this.props.user.profile_image || window.__PROFILE_DEFAULT_PICTURE__} alt="" />
//                                     </div>  {this.props.user.first_name} {this.props.user.last_name[0]}.</h4>
//                                 </div>
//                                 <p className="special">{this.props.user.short_biography || "No short biography"}</p>
//                             </div>
//                             <div className="offers__card--bottom">
//                                 <div>
//                                     <p><span>Location</span>{this.props.user.city || "-"}</p>
//                                 </div>
//                                 <div>
//                                     <p><span>View area of</span>Activity</p>
//                                 </div>
//                                 <div>
//                                     <p>
//                                         <span>Ratings</span>
//                                     </p><div className="stars">
//                                         <img src="/images/star.png" alt="" />
//                                         <img src="/images/star.png" alt="" />
//                                         <img src="/images/star.png" alt="" />
//                                         <img src="/images/star.png" alt="" />
//                                         <img src="/images/star-g.png" alt="" />
//                                     </div>
//                                     <p />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="offers-images__layout">
//                             <p className="offers-images__title">Previous Listings</p>
//                             <div className="offers-images">
//                                 {
//                                     this.getPreviousListings().map(task => (
//                                         <Link to={"/task/" + task.id}>
//                                             <div className="offers-image">
//                                                 <img src={task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__} alt="" />
//                                                 <div>
//                                                     <h4>{task.title}</h4>
//                                                     <p>{new Date(task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
//                                                 </div>
//                                             </div>
//                                         </Link>
//                                     ))
//                                 }
//                                 {
//                                     !this.props.user.tasks.length && "No tasks to show"
//                                 }
//                             </div>
//                         </div>
//                         <div className="offers-images__layout">
//                             <p className="offers-images__title">Current Listings</p>
//                             <div className="offers-images">
//                                 {
//                                     this.getCurrentListings().map(task => (
//                                         <Link to={"/task/" + task.id}>
//                                             <div className="offers-image">
//                                                 <img src={task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__} alt="" />
//                                                 <div>
//                                                     <h4>{task.title}</h4>
//                                                     <p>{new Date(task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
//                                                 </div>
//                                             </div>
//                                         </Link>
//                                     ))
//                                 }
//                                 {
//                                     !this.getPreviousListings().length && <center>No tasks to show</center>
//                                 }
//                             </div>
//                         </div>
//                     </div>
//                 </div></section>

//         )

//     }
// }
// export default AskerProfile;