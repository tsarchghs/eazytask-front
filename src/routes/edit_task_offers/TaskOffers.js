import React from "react";
import { connect } from "react-redux";
import { getTask } from "../../actions/task";
import { postOffers } from "../../actions/offer";
import { GET_AUTH } from "../../actionTypes";
import Loading from "../../components/loading";
import { Link, Redirect, withRouter } from "react-router-dom"
import { compose } from "recompose"; 
import E404 from "../E404";

const format_number = val => {
    let num_val = Number(val)
    if (num_val < 0) return "0";
    else return num_val
}

class TaskOffers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: 1,
            step: "TASK_PROFILE", // or SELF_PROMOTE, OFFER_SENT,
            self_promote: "",
            clickedMakeOffer: false,
            showAllOffersUI: false,
            belowUI: "DEFAULT"
        }
    }
    componentDidMount() {
        this.props.getTask(this.props.match.params.taskId, "fields=question,user,offers,category")
    }
    render() {
        console.log("this.props.auth.isAuthenticated", this.props.auth.isAuthenticated)
        if (this.props.loading || this.props.auth.loading) return <Loading />
        if (
            (this.props.own_user && this.props.own_user.id !== this.props.task.User.id) ||
            this.props.auth.isAuthenticated === false
        ) return <Redirect to={"/task/" + this.props.task.id} />

        let { Offers } = this.props.task;
        let OffersList = Offers.map(offer => (
                <div className="vertical-card">
                    <div className="offers__profile">
                        <div className="offers__profile--img" />
                        <Link to={`/profile/${offer.Tasker.UserId}`}>
                        <div className="img-circle"><img src="/images/ustah.jpeg" src={offer.Tasker.User.profile_image || window.__PROFILE_DEFAULT_PICTURE__} alt="" /></div>
                        </Link>
                    </div>
                    <div className="vertical-card__info">
                        <h4>{offer.Tasker.User.first_name} {offer.Tasker.User.last_name[0]}.</h4>
                        <p>{offer.self_promote || "No description"}</p>
                    </div>
                    <Link to={`/task/${this.props.match.params.taskId}/edit/offers/${offer.id}`}>
                        <img src="/images/arr-right.png" alt="" style={{ width: '25px' }} />
                    </Link>
                </div>
        ))
        return (
            <div className=" edit-task__wrapper">
                <section className="landing-info panel edit-task__section">
                    <div className="container">
                        <div className="content">
                            <header className="logo-text">
                                <span onClick={this.props.goBack} className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                                <h4 className="hide-on-desktop logo-title">
                                    Offers
                                </h4>
                            </header>
                            <section className="vertical-cards">
                                {OffersList}
                                {!OffersList.length && "No offers to show"}
                            </section>
                        </div>
                    </div>
                </section>
            </div>

        )
        return (
            <React.Fragment>
                <Link to={`/task/${this.props.match.params.taskId}/edit`}>
                    <h4>{"<-"}</h4>
                </Link>
                <h4>Offers</h4>
                {OffersList}
                {!OffersList.length && "No offers to show"}
            </React.Fragment>
        )
    }
}

// const mapStateToProps = (state, ownProps) => {
//     let { taskId } = ownProps.match.params
//     let { error, loading, ...task } = state.tasks.byIds[taskId] || { loading: true }
//     let own_user = state.auth.profile;
//     return { error, loading, own_user, task: task || {} }
// }

const mapStateToProps = (state, ownProps) => {
    let { taskId } = ownProps.match.params
    let { error, loading, ...task } = state.tasks.byIds[taskId] || { loading: true }
    let own_user = state.auth.profile;
    return {
        error,
        loading,
        own_user,
        task: task || {},
        auth: state.auth[GET_AUTH]
    }
}

export default compose(withRouter,connect(mapStateToProps, { getTask, postOffers }))(TaskOffers);