import React from "react";
import { connect } from "react-redux";
import { getOffer, acceptOffer } from "../../actions/offer";
import { GET_AUTH } from "../../actionTypes";
import Loading from "../../components/loading";
import { Link, Redirect, withRouter } from "react-router-dom"
import { compose } from "recompose";
import E404 from "../E404";
import queryString from "query-string";
import Modal from "../../components/Modal";
import getImageUrl from "../../utils/getImageUrl";

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
            belowUI: "DEFAULT",
            opened: false
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
        else {
            let rejected = this.props.offer.Task.Offers.find(x => x.status === "ACCEPTED")
            let style = rejected ? { backgroundColor: "#9a4847" } : {}
            let text = rejected ? "Rejected" : "Accept offer"
            let onClick = rejected ? e => e.preventDefault() : this.acceptOffer;
            return <a onClick={onClick} href="#" style={style} className="button fill">{text}</a>
        }
    }
    closeModal = () => this.setState({ onModal: "" })
    toggle = opened => () => this.setState(prevState => {
        console.log(5555)
        prevState.opened = !opened;
        return prevState; 
    })
    render() {
        console.log("this.props.auth.isAuthenticated", this.props.auth.isAuthenticated)
        if (this.props.loading || this.props.auth.loading) return <Loading />
        if (
            (this.props.own_user && this.props.own_user.id !== this.props.offer.Task.UserId) ||
            this.props.auth.isAuthenticated === false
        ) {
            if (!(this.props.offer.Tasker.UserId === this.props.own_user.id)){
                return <Redirect to={"/task/" + this.props.match.params.taskId} />
            }
        }
        return (
            <React.Fragment>
                <Modal
                    isActive={this.state.onModal == "EDIT_NOT_IMPLEMENTED"}     // required
                    title={this.props.translations.text_9[this.props.app_lang]}
                    description={this.props.translations.text_6[this.props.app_lang]}
                    acceptText={this.props.translations.text_8[this.props.app_lang]}
                    cancelText={this.props.translations.text_10[this.props.app_lang]}
                    closeModal={this.closeModal} // required
                    acceptOnClick={this.closeModal}
                />
                <Modal
                    isActive={this.state.onModal == "DELETE_NOT_IMPLEMENTED"}     // required
                    title={this.props.translations.text_3[this.props.app_lang]}
                    description={this.props.translations.text_4[this.props.app_lang]}
                    acceptText={this.props.translations.text_8[this.props.app_lang]}
                    cancelText={this.props.translations.text_10[this.props.app_lang]}
                    closeModal={this.closeModal} // required
                    acceptOnClick={this.closeModal}
                />
                <section className="offers-layout tasker-profile">
                    <div className="offers-picture" style={{
                        backgroundImage: `url(${getImageUrl(this.props.offer.Tasker.User.cover_image,"large") || window.__COVER_DEFAULT_PICTURE__})`
                    }}>
                        <div className="offer-picture__buttons">
                            <div className="offer-picture__back" style={{cursor: 'pointer'}}>
                                <img onClick={e => {
                                    // this.props.history.push("/dashboard")
                                    try {
                                        if(!this.props.history.goBack()){
                                            this.props.history.push("/")
                                        }
                                    } catch (e) {
                                        this.props.history.push("/")
                                    }
                                }} src="/images/arrow.jpeg" alt="" />
                                </div>
                            <div onClick={this.toggle(this.state.opened)} className="offer-picture__edit " style={{cursor: 'pointer'}}>
                                <img className="img-rot" src="/images/more.png" alt="" />
                                <article className={`touchable__content arts ${this.state.opened ? "" : "hide"}`}>
                                    <article onClick={() => {
                                            console.log(555)
                                            this.setState({ onModal: "EDIT_NOT_IMPLEMENTED"})
                                        }} className="flex aic jcsb">
                                        <p>{this.props.translations.text_5[this.props.app_lang]}</p>
                                        <img src="/images/cursor.png" alt="" />
                                    </article>
                                </article>
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
                                            <img src={getImageUrl(this.props.offer.Tasker.User.profile_image,"small") || window.__PROFILE_DEFAULT_PICTURE__} alt="" />
                                        </Link>
                                        </div> 
                                        {this.props.offer.Tasker.User.first_name} {this.props.offer.Tasker.User.last_name[0]}.</h4>
                                    </div>
                                    <p className="special mb20">{this.props.offer.description || "No self-promote"}</p>
                                    <h4 className="flex aic jcc mt40"><img style={{ width: '20px', marginRight: '10px' }} src="/images/shop.png" alt="" />CHF {this.props.offer.amount}.-</h4>
                                </div>
                            </div>
                            <div className="offers-buttons">
                                {
                                    this.props.offer.Tasker.UserId !== this.props.own_user.id &&
                                    <React.Fragment>
                                        <Link to={"/profile/" + this.props.offer.Tasker.UserId}>
                                            <a href="#" className="button">{this.props.translations.text_7[this.props.app_lang]}</a>
                                        </Link>
                                        {this.getButton()}
                                    </React.Fragment>
                                }
                                {
                                    this.props.offer.Tasker.UserId === this.props.own_user.id &&
                                        <React.Fragment>
                                            <Link className="button" to={`/task/${this.props.offer.TaskId}`}>{this.props.translations.text_1[this.props.app_lang]}</Link>
                                            <a onClick={e => {
                                                e.preventDefault();
                                                this.setState({ onModal: "DELETE_NOT_IMPLEMENTED"})
                                            }} style={{ backgroundColor: "#9a4945" }} className="button fill">{this.props.translations.text_2[this.props.app_lang]}</a>
                                        </React.Fragment>
                                }
                            </div>
                        </div>
                    </div></section>
            </React.Fragment>

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
        },
        translations: state.app_lang.data["/offer-profile"],
        app_lang: state.app_lang.app_lang,
        common: state.app_lang.common    
    }
}

export default compose(withRouter,connect(mapStateToProps, { getOffer, acceptOffer }))(TaskOffer);