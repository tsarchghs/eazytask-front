import React from "react";
import { connect } from "react-redux";
import { getUser } from "../../actions/user";
import { compose } from "recompose";
import { withRouter, Link } from "react-router-dom";
import Loading from "../../components/loading";
import E404 from "../E404";

class Profile extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getUser(this.props.match.params.userId,{ fields: "tasker,task"});
    }
    getPreviousListings = () => this.props.user.tasks.filter(task => new Date(task.due_date).getTime() < new Date().getTime())
    getCurrentListings = () => this.props.user.tasks.filter(task => new Date(task.due_date).getTime() >= new Date().getTime() )
    render(){
        if (this.props.loading) return <Loading/>
        if (this.props.error) return <E404/>
        // return JSON.stringify(this.pr)
        return (
            <section className="offers-layout tasker-profile">
                <div className="offers-picture" style={{
                    backgroundImage: `url(${this.props.user.cover_image || window.__COVER_DEFAULT_PICTURE__})`
                }}>
                    <div className="slice" />
                </div>
                <div className="offers-content ">
                    <div className="offers__cards">
                        <div className="offers__card">
                            <div className="offers__card--top">
                                <div className="offers__profile">
                                    <div className="offers__profile--img" />
                                    <h4 className="flex aic jcc"> 
                                    <div className="img-circle">
                                    <img src={this.props.user.profile_image || window.__PROFILE_DEFAULT_PICTURE__} alt="" />
                                    </div>  {this.props.user.first_name} {this.props.user.last_name[0]}.</h4>
                                </div>
                                <p className="special">{this.props.user.short_biography || "No short biography"}</p>
                            </div>
                            <div className="offers__card--bottom">
                                <div>
                                    <p><span>Location</span>{this.props.user.city || "-"}</p>
                                </div>
                                <div>
                                    <p><span>View area of</span>Activity</p>
                                </div>
                                <div>
                                    <p>
                                        <span>Ratings</span>
                                    </p><div className="stars">
                                        <img src="/images/star.png" alt="" />
                                        <img src="/images/star.png" alt="" />
                                        <img src="/images/star.png" alt="" />
                                        <img src="/images/star.png" alt="" />
                                        <img src="/images/star-g.png" alt="" />
                                    </div>
                                    <p />
                                </div>
                            </div>
                        </div>
                        <div className="offers-images__layout">
                            <p className="offers-images__title">Previous Listings</p>
                            <div className="offers-images">
                                {
                                    this.getPreviousListings().map(task => (
                                        <Link to={"/task/" + task.id}>
                                            <div className="offers-image">
                                                <img src={task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__} alt="" />
                                                <div>
                                                    <h4>{task.title}</h4>
                                                    <p>{new Date(task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                                {
                                    !this.props.user.tasks.length && "No tasks to show"
                                }
                            </div>
                        </div>
                        <div className="offers-images__layout">
                            <p className="offers-images__title">Current Listings</p>
                            <div className="offers-images">
                                {
                                    this.getCurrentListings().map(task => (
                                        <Link to={"/task/" + task.id}>
                                            <div className="offers-image">
                                                <img src={task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__} alt="" />
                                                <div>
                                                    <h4>{task.title}</h4>
                                                    <p>{new Date(task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                                {
                                    !this.props.user.tasks.length && "No tasks to show"
                                }
                            </div>
                        </div>
                    </div>
                </div></section>

        )
        return (
            <React.Fragment>
                Name: { this.props.user.first_name} {this.props.user.last_name[0]} <br />
                Description: { this.props.user.description} <br />
                short_biography: { this.props.user.short_biography } <br />
                {
                    this.props.user.Tasker && 
                        <select>
                            {
                                this.props.user.Tasker.Cities.map(x => (
                                    <option value={x.name}>{x.name}</option>
                                ))
                            }
                        </select>
                }<br/>
                Previous listings: <br/>
                { this.props.user.tasks.map(x => (
                    <React.Fragment>
                        Task: {x.title}
                        <br/>
                    </React.Fragment>
                ))}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let { userId } = ownProps.match.params
    let { loading, error, ...user } = state.users.byIds[userId] || { loading: true }
    return { loading, error, user }
}
export default compose(
    connect(mapStateToProps,{ getUser }),
    withRouter
)(Profile);