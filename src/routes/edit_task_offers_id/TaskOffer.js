import React from "react";
import { connect } from "react-redux";
import { getOffer, acceptOffer } from "../../actions/offer";
import { GET_AUTH } from "../../actionTypes";
import Loading from "../../components/loading";
import { Link, Redirect, withRouter } from "react-router-dom"
import { compose } from "recompose";
import E404 from "../E404";
import queryString from "query-string";

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
    acceptOffer = (e) => {
        e.preventDefault();
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
            else return <a onClick={e => e.preventDefault()} className="button fill">Accepted</a>
        else return <a onClick={this.acceptOffer} href="#" className="button fill">Accept offer</a>
    }
    render() {
        console.log("this.props.auth.isAuthenticated", this.props.auth.isAuthenticated)
        if (this.props.loading || this.props.auth.loading) return <Loading />
        if (
            (this.props.own_user && this.props.own_user.id !== this.props.offer.Task.UserId) ||
            this.props.auth.isAuthenticated === false
        ) return <Redirect to={"/task/" + this.props.match.params.taskId} />
        return (
            <section className="offers-layout tasker-profile">
                <div className="offers-picture" style={{
                    backgroundImage: `url(${this.props.offer.Tasker.User.cover_image || window.__COVER_DEFAULT_PICTURE__})`
                }}>
                    <div className="offer-picture__buttons">
                        <div className="offer-picture__back"><img onClick={e => {
                            try {
                                this.props.history.goBack();
                            } catch (e) {
                                this.props.history.push("/")
                            }
                        }} src="/images/arrow.jpeg" alt="" /></div>
                        <div className="offer-picture__edit hide">
                            <img src="/images/more.png" alt="" />
                        </div>
                    </div>
                    {/* <div class="slice"></div> */}
                </div>
                <div className="offers-content modified">
                    <div className="offers__cards min-h__cards">
                        <div className="offers__card " style={{ height: 'initial' }}>
                            <div className="offers__card--top">
                                <div className="offers__profile">
                                    <div className="offers__profile--img" />
                                    <h4 className="flex aic jcc"> <div className="img-circle">
                                    <Link to={"/profile/" + this.props.offer.Tasker.User.id}>
                                        <img src={this.props.offer.Tasker.User.profile_image || window.__PROFILE_DEFAULT_PICTURE__} alt="" />
                                    </Link>
                                    </div> 
                                    {this.props.offer.Tasker.User.first_name} {this.props.offer.Tasker.User.last_name[0]}.</h4>
                                </div>
                                <p className="special mb20">{this.props.offer.description || "No self-promote"}</p>
                                <h4 className="flex aic jcc mt40"><img style={{ width: '20px', marginRight: '10px' }} src="/images/shop.png" alt="" />CHF {this.props.offer.amount}.-</h4>
                            </div>
                        </div>
                        <div className="offers-buttons">
                            <Link to={"/profile/" + this.props.offer.Tasker.UserId}>
                                <a href="#" className="button">View Profile</a>
                            </Link>
                            {this.getButton()}
                        </div>
                    </div>
                </div></section>

        )    
    }
}

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