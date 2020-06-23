import React from "react";
import { connect } from "react-redux";
import { getOffer, acceptOffer } from "../../actions/offer";
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

class TaskOffer extends React.Component {
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
        let { offerId } = this.props.match.params 
        this.props.getOffer(Number(offerId)); //, "fields=question,user,offers,category")
    }
    acceptOffer = () => {
        console.log("acceptOffer");
        this.props.acceptOffer(
            this.props.match.params.taskId,
            this.props.match.params.offerId,
        )
    }
    getButton = () => {
        let { status } = this.props.offer;
        let { loading } = this.props.acceptOffer;
        if (status == "ACCEPTED")
            if (loading) return <button>Loading</button>
            else return <button className="button__style">Accepted</button>
        else return <button onClick={this.acceptOffer} className="button__style">Accept Offer</button>
    }
    render() {
        console.log("this.props.auth.isAuthenticated", this.props.auth.isAuthenticated)
        if (this.props.loading || this.props.auth.loading) return <Loading />
        if (
            (this.props.own_user && this.props.own_user.id !== this.props.offer.Task.UserId) ||
            this.props.auth.isAuthenticated === false
        ) return <Redirect to={"/task/" + this.props.match.params.taskId} />
        return (
            <div className=" edit-task__wrapper">
                <section className="landing-info panel edit-task__section">
                    <div className="container">
                        <div className="content">
                            <header className="logo-text">
                                <span onClick={() => this.props.history.push(`/task/${this.props.match.params.taskId}/edit/offers`)} className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                                <h4 className="hide-on-desktop logo-title">
                                    Offers
                </h4>
                            </header>
                            <section className="offers-fullcard">
                                <div className="offers__card">
                                    <div className="offers__card--top">
                                        <h4>{this.props.offer.Task.title}</h4>
                                        <p className="special">{this.props.offer.description || "No description"}</p>
                                        <div className="offers__profile">
                                            <div className="offers__profile--img" />
                                            <h4>CHF {this.props.offer.amount}.-</h4>
                                            <h4 className="flex aic jcc"> <div className="img-circle">
                                            <img onClick={() => this.props.history.push("/profile/" + this.props.offer.Tasker.UserId)} src={this.props.offer.Tasker.User.profile_image || window.__PROFILE_DEFAULT_PICTURE__} alt="" /></div> {this.props.offer.Tasker.User.first_name} {this.props.offer.Tasker.User.last_name[0]}.</h4>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="buttons__group">
                                <Link to={"/profile/" + this.props.offer.Tasker.UserId}>
                                    <button className="button__style no-color">View Profile</button>
                                </Link>
                                {this.getButton()}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
        return (
            <React.Fragment>
                <Link to={`/task/${this.props.match.params.taskId}/edit/offers`}>
                    <h4>{"<-"}</h4>
                </Link>
                <h4>Offer</h4>
                {JSON.stringify(this.props.offer)}<br/>
                <Link to={"/profile/" + this.props.offer.Tasker.UserId}><h5>View profile</h5></Link>
                { this.getButton() }

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
    let { offerId } = ownProps.match.params
    let { error, loading, error2,loading2, ...offer } = state.offers.byIds[offerId] || { loading: true }
    let own_user = state.auth.profile;
    return {
        error,
        loading,
        own_user,
        offer: offer || {},
        auth: state.auth[GET_AUTH],
        acceptOffer: {
            loading: loading2,
            error: error2
        }
    }
}

export default compose(withRouter,connect(mapStateToProps, { getOffer, acceptOffer }))(TaskOffer);