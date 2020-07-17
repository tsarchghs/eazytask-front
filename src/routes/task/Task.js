import React from "react";
import { connect } from "react-redux";
import { getTask } from "../../actions/task";
import { postOffers } from "../../actions/offer";
import { patchTasks } from "../../actions/task";
import Loading from "../../components/loading";
import { Link } from "react-router-dom";
import E404 from "../E404";
import { ModalContainer } from 'minimal-react-modal';
import Modal from "../../components/Modal";

import SelfPromote from "./SelfPromote.view";

const format_number = val => {
    let num_val = Number(val)
    if (num_val < 0) return "0";
    else return num_val
}

class Task extends React.Component {
    constructor(props){
        super(props)
        let belowUI = "DEFAULT";
        if (props.location && props.location.state && props.location.state.belowUI) {
            belowUI = props.location.state.belowUI;
        }
        this.state = {
            amount: 0,
            step: "TASK_PROFILE", // or SELF_PROMOTE, OFFER_SENT,
            self_promote: "",
            clickedMakeOffer: false,
            showAllOffersUI: false,
            belowUI: belowUI
        }
    }
    toggle = () => {
        let { opened } = this.state;
        return () => this.setState({ opened: !opened })
    }
    closeModal = () => this.setState({ onModal: "" })
    componentDidMount(){
        this.props.getTask(this.props.match.params.taskId,"fields=question,user,offers,category")
    }
    getOfferPictureButtons = () => {
        return (
            <div className="offer-picture__buttons">
                <div style={{ cursor: "pointer" }} onClick={e => {
                    this.props.history.push("/dashboard")
                    // try {
                    //     this.props.history.goBack();
                    // } catch (e) {
                    //     this.props.history.push("/dashboard")
                    // }
                }} className="offer-picture__back">
                    <img  src="/images/arrow.jpeg" alt="" />
                </div>
                <div style={{ cursor: "pointer" }} className={`offer-picture__edit ${!(this.props.own_user && this.props.own_user.id == this.props.task.UserId) ? "hide" : ""}`}>
                    <img onClick={this.toggle()} className="img-rot" src="/images/more.png" alt="" />
                    <article className={`touchable__content arts ${this.state.opened ? "" : "hide"}`}>
                        {this.props.own_user && this.props.own_user.id == this.props.task.UserId &&
                            <React.Fragment>
                                <article onClick={() => this.setState({ onModal: "DELETE_MODAL" })} className="flex aic jcsb">
                                    <p>Delete</p>
                                    <img src="/images/trash.png" alt="" />
                                </article>

                                {this.props.own_user && this.props.own_user.id == this.props.task.UserId && this.props.task.status == "ACTIVE" &&
                                    <article onClick={() => this.setState({onModal: "DEACTIVATE_MODAL"})} className="flex aic jcsb">
                                        <p>Deactivate</p>
                                        <img src="/images/sleep.png" alt="" />
                                    </article>
                                }

                                {this.props.own_user && this.props.own_user.id == this.props.task.UserId && this.props.task.status == "DEACTIVATED" && 
                                    <article onClick={() => this.setState({ onModal: "REACTIVATE_MODAL" })} className="flex aic jcsb">
                                        <p>Re-Activate</p>
                                        <img src="/images/sleep.png" alt="" />
                                    </article>
                                }
                            </React.Fragment>
                        }
                    </article>
                </div>
            </div>
        )
    }
    getOffersCard = () => {
        return (
            <div className="offers__card">
                <div className="offers__card--top">
                    <h4>{this.props.task.title}</h4>
                    <p className="special">{this.props.task.description}</p>
                    <div className="offers__profile">
                        <div className="offers__profile--img" />
                        <h4 className="flex aic jcc">
                            <div className="img-circle">
                                <Link to={"/profile/" + this.props.task.UserId}>
                                    <img
                                        src={this.props.task.User.profile_image || window.__PROFILE_DEFAULT_PICTURE__}
                                        alt=""
                                    />
                                </Link>
                            </div> {this.props.task.User.first_name} {this.props.task.User.last_name[0]}.</h4>
                    </div>
                </div>
                <div className="offers__card--bottom">
                    <div>
                        <p><img src="/images/inter.png" alt="" />
                            {this.props.task.status == "ACTIVE"
                                ? new Date(this.props.task.due_date).toLocaleDateString().replace(/\//g, ".")
                                : "Deactive"
                            }
                        </p>
                        <p><img src="/images/pins.png" alt="" /> {this.props.task.zipCode}, {this.props.task.city}</p>
                    </div>
                    <div>
                        <p><img src="/images/shop.png" alt="" />CHF {this.props.task.expected_price}.-</p>
                        <p><img src="/images/flags.png" alt="" /> {this.props.task.Category.name}</p>
                    </div>
                </div>
            </div>
        )
    }
    setStep = step => () => this.setState({ step })
    onChange = key => e => this.setState({ [key]: e.target.value })
    amountOnChange = e => this.setState({ amount: format_number(e.target.value) })
    showOfferUI = () => !this.props.own_user || (
        this.props.own_user &&
        this.props.own_user.id !== this.props.task.UserId &&
        this.props.own_user.Tasker &&
        !this.props.loading && this.props.task.Offers && 
        !this.props.task.Offers.find(offer => offer.Tasker.User.id === this.props.own_user.id)
    )
    getOfferUI = () => {
        console.log(buttonOnClick, !!own_user,"buttonOnClick")
        let { clickedMakeOffer, amount } = this.state;
        let { own_user } = this.props;
        let buttonText = !clickedMakeOffer ? "Make offer" : "Next"
        let buttonOnClick;
        if (own_user) buttonOnClick = !clickedMakeOffer ? () => this.setState({ clickedMakeOffer: true })
                                                : this.setStep("SELF_PROMOTE")
        else buttonOnClick = () => this.props.history.push("/register?to=/task/" + this.props.task.id);
        return (
            <React.Fragment>
                {clickedMakeOffer && <input type="number" value={amount} onChange={this.amountOnChange}/>}<br/>
                <button onClick={buttonOnClick}>{ buttonText }</button>sddas
            </React.Fragment>
        )
    }
    reActivate = () => {
        this.props.patchTasks({
            id: this.props.match.params.taskId,
            data: { status: "ACTIVE" }
        })
    }
    deactivate = () => {
        this.props.patchTasks({
            id: this.props.match.params.taskId,
            data: { status: "DEACTIVATED" }
        })
    }
    delete = () => {
        this.props.patchTasks({
            id: this.props.match.params.taskId,
            data: { status: "DELETED" }
        })
        this.props.history.push("/dashboard")
    }
    getAllOffersUI = () => {
        if (this.props.own_user.id !== this.props.task.UserId) return null;
        return (
            <React.Fragment>
                <div className="other-offers__list">
                    <p className="offers-images__title">Other offers</p>
                    {
                        this.props.task.Offers.map(offer => (
                            <div onClick={() => this.props.history.push(`/task/${this.props.task.id}/edit/offers/${offer.id}?from_task=t`)} className="other-offer">
                                <div className="offers__profile">
                                    <div className="offers__profile--img" />
                                    <h4 className="flex aic jcc"> <div className="img-circle">
                                        <Link to={"/profile/" + offer.Tasker.UserId}>
                                            <img
                                                src={offer.Tasker.User.profile_image || window.__PROFILE_DEFAULT_PICTURE__}
                                                alt=""
                                            />
                                        </Link>
                                    </div>{offer.Tasker.User.first_name} {offer.Tasker.User.last_name[0]}.{offer.Tasker.User.first_name} {offer.Tasker.User.last_name[0]}.</h4>
                                </div>
                                <h3>CHF {offer.amount}</h3>
                            </div>
                        ))
                    }
                </div>
                <center>
                    {
                        !this.props.task.Offers.length && "No offers to show"
                    }
                </center>
                {/* { this.showOfferUI() && this.getOfferUI() } */}
            </React.Fragment>
        )
    }
    getTaskOffersUI = () => {
        return (
            <div>
                <div className=" edit-task__wrapper hide-on-web">
                    <section className="landing-info panel edit-task__section">
                        <div className="container">
                            <div className="content">
                                <header className="logo-text">
                                    <span className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                                    <h4 className="hide-on-desktop logo-title">
                                        Offers
                  </h4>
                                </header>
                                <section className="vertical-cards">
                                {
                                    this.props.task.Offers && 
                                        this.props.task.Offers.map(offer => (
                                            <div className="vertical-card">
                                                <div className="offers__profile">
                                                    <div className="offers__profile--img" />
                                                    <div className="img-circle"><img src={
                                                        offer.Tasker.User.profile_image || window.__PROFILE_DEFAULT_PICTURE__
                                                    } alt="" /></div>
                                                </div>
                                                <div className="vertical-card__info">
                                                    <h4>{offer.Tasker.User.first_name} {offer.Tasker.User.last_name[0]}.</h4>
                                                    <p>{offer.description}</p>
                                                </div>
                                                <Link to={"/task/" + this.props.task.id + "/edit/offers/" + offer.id}>
                                                    <img src="/images/arr-right.png" alt="" style={{ width: '25px' }} />
                                                </Link>
                                            </div>
                                        ))
                                }
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
                <section className="offers-layout hide-on-mobile">
                    <div className="offers-picture" style={{
                        backgroundImage: `url(${this.props.task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__})`
                    }}>
                        {this.getOfferPictureButtons()}

                    </div>
                    <div className="offers-content">
                        <div className="offers__cards">
                            {this.getOffersCard()}
                            <div className="offers-images tasker-card__about view__card-offers">
                            {
                                this.props.task.Offers.map(offer => (
                                    <Link to={`/task/${this.props.task.id}/edit/offers/${offer.id}`}>
                                        <div className="offers-image">
                                            <h4 className="flex aic jcc"> 
                                            <div className="img-circle">
                                            <img src={offer.Tasker.User.profile_image || window.__PROFILE_DEFAULT_PICTURE__} alt="" />
                                            </div> {offer.Tasker.User.first_name} {offer.Tasker.User.last_name[0]}.</h4>
                                            <p>{offer.description} </p>
                                        </div>

                                    </Link>
                                ))
                            }
                            </div>
                            <p className="special text-center" style={{ marginTop: '20px' }}>{this.props.task.Offers.length} offers given</p>
                            <div className="offers-buttons">
                                <a href="#" className="button">Q&amp;A</a>
                                <a onClick={e => {
                                    e.preventDefault();
                                    this.setState({ step: "TASK_PROFILE"})
                                }} className="button fill">Go back</a>
                            </div>
                        </div>
                    </div></section>
            </div>

        )
    }
    getTaskProfileUI = () => {
        return (
            <section className="offers-layout">
                <div className="offers-picture" style={{
                    backgroundImage: `url(${this.props.task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__})`
                }}>
                    {this.getOfferPictureButtons()}

                </div>
                <div className="offers-content">
                    <div className="offers__cards">
                        {this.getOffersCard()}
                        {this.state.belowUI === "SHOW_OFFERS" && this.getAllOffersUI()}
                        <div className="offers-images">
                            { this.state.belowUI === "DEFAULT" && <React.Fragment>
                                { this.props.task.gallery && this.props.task.gallery.split(",").map(src => (
                                    <div className="offers-image">
                                        <img src={src} alt="" />
                                    </div>
                                ))}
                                {this.props.task.gallery == null && "No gallery images to show"}
                            </React.Fragment>}
                        </div>
                        {this.props.task.Offers && this.props.task.Offers.length ? 
                            <p className="special text-center" style={{ marginTop: '20px' }}>{this.props.task.Offers.length} offers given</p>
                        : null}
                        <div className="offers-buttons">
                            {
                                this.props.own_user && this.props.own_user.id == this.props.task.UserId && this.state.belowUI === "DEFAULT"
                                && 
                                <Link to={`/task/${this.props.match.params.taskId}/edit`}>
                                    <a href="#" className="button">Edit</a>
                                </Link>
                            }
                            {
                                this.state.belowUI === "DEFAULT" &&
                                <Link to={`/task/${this.props.match.params.taskId}/qa`}>
                                    <a href="#" className="button">Q&amp;A</a>
                                </Link>
                            }
                            {
                                this.props.task.Offers ? 
                                <React.Fragment>
                                    {
                                        this.state.belowUI === "DEFAULT" && (this.props.task.Offers.length || !this.showOfferUI()) ?
                                        (
                                            this.props.own_user && this.props.own_user.id == this.props.task.UserId
                                            ? 
                                            <a
                                                button
                                                onClick={() => this.setState({ step: "TASK_OFFERS" })}
                                                className="button fill">
                                                View offers
                                            </a>
                                            :
                                            (
                                                this.props.task.Offers.find(offer => offer.Tasker.User.id === this.props.own_user.id) 
                                                ? null
                                                :
                                                <ModalContainer>
                                                    {(openModal, closeModal, isActive) => (
                                                        <React.Fragment>
                                                            <a
                                                                button
                                                                onClick={() => {
                                                                    let { own_user } = this.props;
                                                                    console.log("this.showOfferUI()", this.showOfferUI())
                                                                    if (own_user) {
                                                                        if (!own_user.Tasker) openModal()
                                                                        else this.setState({ belowUI: "NONE", clickedMakeOffer: true });
                                                                    }
                                                                    else this.props.history.push("/register?to=/task/" + this.props.task.id);
                                                                }}
                                                                className="button fill">
                                                                Make offer
                                                            </a>
                                                            <Modal
                                                                isActive={isActive}     // required
                                                                closeModal={closeModal} // required
                                                                title="Action not allowed"
                                                                description="You cannot make an offer, to make an account, register as a Tasker."
                                                                hide_buttons={true}
                                                            />
                                                        </React.Fragment>
                                                    )}
                                                </ModalContainer>
                                            )
                                        )
                                        : ""
                                    }

                                    {
                                        this.showOfferUI() && this.state.belowUI === "DEFAULT" && !this.props.task.Offers.length ?
                                        <a
                                            button
                                            onClick={() => {
                                                let { own_user } = this.props;
                                                console.log("this.showOfferUI()", this.showOfferUI())
                                                if (own_user) this.setState({ belowUI: "SHOW_OFFERS", clickedMakeOffer: true });
                                                else this.props.history.push("/register?to=/task/" + this.props.task.id);
                                            }}
                                            className="button fill">
                                            Make offer
                                        </a>
                                        : ""
                                    }

                                </React.Fragment> : ""
                            }
                            {
                                this.state.belowUI === "SHOW_OFFERS" && this.showOfferUI() && !this.state.clickedMakeOffer &&
                                <a
                                    button
                                    onClick={() => {
                                        if (this.props.own_user){
                                            this.setState({ clickedMakeOffer: true })
                                        } else this.props.history.push("/register?to=/task/" + this.props.task.id);
                                    }}
                                    className="button fill">
                                    Make offer
                                </a>
                            }
                            {
                                this.showOfferUI() && this.state.clickedMakeOffer && (
                                    <div className="register__form" style={{ paddingBottom: 50, maxWidth: "800px", margin: "0 auto"}}>
                                        Amount
                                        <input 
                                            className="input" 
                                            style={{
                                                width: 130,
                                                margin: "0 auto",
                                                borderRadius: 20,
                                                border: "1px solid #1f4732",
                                                marginBottom: "3%"
                                            }}
                                            placeholder="Amount"
                                            onChange={this.amountOnChange}
                                            value={this.state.amount}
                                        />
                                        <a
                                            button
                                            style={{ width: "120px", margin: "0 auto" }}
                                            onClick={this.state.amount ? () => this.setState({ step: "SELF_PROMOTE" }) : undefined}
                                            className={`button ${this.state.amount ? "fill" : "no-fill"}`}>
                                            Next
                                        </a>
                                </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    sendOffer = () => {
        console.log("SEND_OFFER",this.state)
        let { amount, self_promote } = this.state;
        this.props.postOffers({ taskId: this.props.task.id, amount, description: self_promote })
    }
    getSelfPromoteUI = () => {
        let buttonOnClick = e => {
            this.setState({ step: "OFFER_SENT" })
            this.sendOffer()
        }
        if (!this.state.self_promote) buttonOnClick = undefined
        let buttonStyle = { backgroundColor: undefined }
        if (!buttonOnClick) buttonStyle = { backgroundColor: "darkgrey" }
        return <SelfPromote
            thumbnail={this.props.task.thumbnail}
            goBack={() => this.setState({step: "TASK_PROFILE" })}
            onLogoClick={() => this.setState({ step: "TASK_PROFILE" })} 
            value={this.state.self_promote}
            onChange={e => this.setState({ self_promote: e.target.value })} 
            offersCard={this.getOffersCard()}
            buttonOnClick={buttonOnClick} 
            buttonStyle={buttonStyle}    
        />
    }
    getOfferSentUI = () => <div className="container">
        <div className="content setup-ready">
            <header>
                <span className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
            </header>
            <section className="two-column__layout setup__mobile profile__cover">
                <div className="two-column__info flex flex-column">
                    <div className="background-title mb5">
                        <h1>Ready to go</h1>
                        <p className="shadow__title">setup your account</p>
                    </div>
                    <div>
                        <img src="/images/reminder.png" style={{ minWidth: '190px', width: '20%', margin: '0 auto 40px' }} alt="" />
                    </div>
                    <h4 className="show__mobile">Ready to go</h4>
                    <p className="mb30 flex-grow" style={{ fontSize: '18px', maxWidth: '240px', marginTop: "2%", margin: "0 auto" }}>You will be notified if the asker accept it or not</p>
                    <div className="buttons__group">
                        <button onClick={() => {
                            this.setState({
                                amount: 0,
                                step: "TASK_PROFILE", // or SELF_PROMOTE, OFFER_SENT,
                                self_promote: "",
                                clickedMakeOffer: false,
                                showAllOffersUI: false,
                                belowUI: "DEFAULT"
                            })
                            this.props.getTask(this.props.match.params.taskId, "fields=question,user,offers,category")
                        }} className="button__style no-color">View task</button>
                        <Link to="/">
                            <button className="button__style">Go home</button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    </div>

    render(){
        console.log({err: this.props})
        if (this.props.error)
            if (this.props.task.errorResponse.response.status === 404) 
                return <E404/>
        if (this.props.loading) return <Loading/>
        let children;
        switch (this.state.step) {
            case "TASK_PROFILE": { children = this.getTaskProfileUI(); break }
            case "TASK_OFFERS": { children = this.getTaskOffersUI(); break }
            case "SELF_PROMOTE": { children = this.getSelfPromoteUI(); break }
            case "OFFER_SENT": { children = this.getOfferSentUI(); break }
        }
        return (
            <React.Fragment>
                <Modal
                    isActive={this.state.onModal == "DELETE_MODAL"}     // required
                    closeModal={this.closeModal} // required
                    title="Are you sure?"
                    description="Are you pretty sure?"
                    acceptText="Delete"
                    acceptOnClick={() => {
                        this.delete()
                        this.closeModal()
                        this.setState({ opened: false })
                    }}
                />
                <Modal
                    isActive={this.state.onModal == "DEACTIVATE_MODAL"}     // required
                    closeModal={this.closeModal} // required
                    title="Are you sure?"
                    description="Are you pretty sure?"
                    acceptText="Deactivate"
                    acceptOnClick={() => {
                        this.deactivate()
                        this.closeModal()
                        this.setState({ opened: false })
                    }}
                />
                <Modal
                    isActive={this.state.onModal == "REACTIVATE_MODAL"}     // required
                    closeModal={this.closeModal} // required
                    title="Are you sure react?"
                    description="Are you pretty sure?"
                    acceptText="Re-Activate"
                    acceptOnClick={() => {
                        this.reActivate()
                        this.closeModal()
                        this.setState({ opened: false })
                    }}
                />
                {children}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    let { taskId } = ownProps.match.params
    let { error, loading, ...task } = state.tasks.byIds[taskId] || { loading: true }
    let own_user = state.auth.profile;
    return { error, loading, own_user,task: task || {} }
}

export default connect(mapStateToProps, { getTask, postOffers, patchTasks })(Task);