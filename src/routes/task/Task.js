import React from "react";
import { connect } from "react-redux";
import { getTask } from "../../actions/task";
import { postOffers } from "../../actions/offer";
import { patchTasks } from "../../actions/task";
import Loading from "../../components/loading";
import { Link, withRouter } from "react-router-dom";
import E404 from "../E404";
import { ModalContainer } from 'minimal-react-modal';
import Modal from "../../components/Modal";

import SelfPromote from "./SelfPromote.view";
import getImageUrl from "../../utils/getImageUrl";
import { compose } from "recompose";

const format_number = val => {
    let num_val = Number(val)
    if (isNaN(num_val)) return "0"
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
                    // this.props.history.push("/dashboard")
                    try {
                        if(!this.props.history.goBack()){
                            this.props.history.push("/")
                        }
                    } catch (e) {
                        this.props.history.push("/")
                    }
                }} className="offer-picture__back">
                    <img  src="/images/arrow.jpeg" alt="" />
                </div>
                <div style={{ cursor: "pointer" }} className={`offer-picture__edit ${!(this.props.own_user && this.props.own_user.id == this.props.task.UserId) ? "hide" : ""}`}>
                    <img onClick={this.toggle()} className="img-rot" src="/images/more.png" alt="" />
                    <article className={`touchable__content arts ${this.state.opened ? "" : "hide"}`}>
                        {this.props.own_user && this.props.own_user.id == this.props.task.UserId &&
                            <React.Fragment>
                                <article onClick={() => {
                                    if (this.props.task.Offers && this.props.task.Offers.length) this.setState({ onModal: "CANNOT_EDIT"})
                                    else this.props.history.push("/task/" + this.props.match.params.taskId + "/edit")
                                }} className="flex aic jcsb">
                                    <p>{this.getTrans(this.props.translations.text_21)}</p>
                                    <img src="/images/cursor.png" alt="" />
                                </article>
                                <article onClick={() => this.setState({ onModal: "DELETE_MODAL" })} className="flex aic jcsb">
                                    <p>{this.getTrans(this.props.translations.text_22)}</p>
                                    <img src="/images/trash.png" alt="" />
                                </article>

                                {this.props.own_user && this.props.own_user.id == this.props.task.UserId && this.props.task.status == "ACTIVE" &&
                                    <article onClick={() => this.setState({onModal: "DEACTIVATE_MODAL"})} className="flex aic jcsb">
                                        <p>{this.getTrans(this.props.translations.text_23)}</p>
                                        <img src="/images/sleep.png" alt="" />
                                    </article>
                                }

                                {this.props.own_user && this.props.own_user.id == this.props.task.UserId && this.props.task.status == "DEACTIVATED" && 
                                    <article onClick={() => this.setState({ onModal: "REACTIVATE_MODAL" })} className="flex aic jcsb">
                                        <p>{this.getTrans(this.props.translations.text_24)}</p>
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
                                        src={getImageUrl(this.props.task.User.profile_image) || window.__PROFILE_DEFAULT_PICTURE__}
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
                                : this.getTrans(this.props.translations.text_25)
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
        this.props.own_user.isTasker && 
        !this.props.loading && this.props.task.Offers && 
        !this.props.task.Offers.find(offer => offer.Tasker.User.id === this.props.own_user.id)
    )
    getOfferUI = () => {
        console.log(buttonOnClick, !!own_user,"buttonOnClick")
        let { clickedMakeOffer, amount } = this.state;
        let { own_user } = this.props;
        let buttonText = !clickedMakeOffer ? this.getTrans(this.props.translations.text_2) : this.getTrans(this.props.translations.text_20)
        let buttonOnClick;
        if (own_user) buttonOnClick = !clickedMakeOffer ? () => this.setState({ clickedMakeOffer: true })
                                                : this.setStep("SELF_PROMOTE")
        else buttonOnClick = () => this.props.history.push("/register?to=/task/" + this.props.task.id);
        return (
            <React.Fragment>
                {clickedMakeOffer && <input type="number" value={amount} onChange={this.amountOnChange}/>}<br/>
                <button onClick={buttonOnClick}>{ buttonText }</button>
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
                                                src={getImageUrl(offer.Tasker.User.profile_image) || window.__PROFILE_DEFAULT_PICTURE__}
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
    getTrans = obj => {
        let data = obj[this.props.app_lang];
        if (typeof (data) == "string") return data;
        if (data.length) {
            return data.map(str => <React.Fragment>
                {str}<br/>
            </React.Fragment>)
        }
    }
    getTaskOffersUI = () => {
        return (
            <div>
                <div className=" edit-task__wrapper hide-on-web">
                    <section className="landing-info panel edit-task__section">
                        <div className="container">
                            <div className="content">
                                <header className="logo-text">
                                    <span onClick={() => this.setState({ step: "TASK_PROFILE" })} className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                                    <h4 className="hide-on-desktop logo-title">
                                    {this.getTrans(this.props.translations.text_26)}
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
                                                        getImageUrl(offer.Tasker.User.profile_image,"small") || window.__PROFILE_DEFAULT_PICTURE__
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
                                {
                                    this.props.task.Offers && !this.props.task.Offers.length &&
                                    <p className="special text-center" style={{ marginTop: '20px' }}>
                                        {this.getTrans(this.props.translations.text_27)}
                                    </p>
                                }
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
                <section className="offers-layout hide-on-mobile">
                    <div className="offers-picture" style={{
                        backgroundImage: `url(${getImageUrl(this.props.task.thumbnail,"large") || window.__THUMBNAIL_DEFAULT_PICTURE__})`
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
                                            <img src={getImageUrl(offer.Tasker.User.profile_image) || window.__PROFILE_DEFAULT_PICTURE__} alt="" />
                                            </div> {offer.Tasker.User.first_name} {offer.Tasker.User.last_name[0]}.</h4>
                                            <p>{offer.description} </p>
                                        </div>

                                    </Link>
                                ))
                            }
                            </div>
                            <p className="special text-center" style={{ marginTop: '20px' }}>{this.props.task.Offers.length}
                             {this.getTrans(this.props.translations.text_28)}</p>
                            <div className="offers-buttons">
                                <a href="#" className="button">Q&amp;A</a>
                                <a onClick={e => {
                                    e.preventDefault();
                                    this.setState({ step: "TASK_PROFILE" })
                                }} className="button fill">{this.getTrans(this.props.translations.text_29)}</a>
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
                    backgroundImage: `url(${getImageUrl(this.props.task.thumbnail,"large") || window.__THUMBNAIL_DEFAULT_PICTURE__})`
                }}>
                    {this.getOfferPictureButtons()}

                </div>
                <div className="offers-content">
                    <div className="offers__cards">
                        {this.getOffersCard()}
                        {this.state.belowUI === "SHOW_OFFERS" && this.getAllOffersUI()}
                        {this.props.task.gallery == null && 
                            <p class="special text-center" style={{ marginTop: 20 }}>
                                {this.getTrans(this.props.translations.text_30)}
                            </p>
                        }
                        <div className="offers-images">
                            { this.state.belowUI === "DEFAULT" && <React.Fragment>
                                { this.props.task.gallery && this.props.task.gallery.split(",").map(src => (
                                    <div className="offers-image">
                                        <img src={getImageUrl(src,"medium")} alt="" />
                                    </div>
                                ))}

                            </React.Fragment>}
                        </div>
                        {this.props.task.Offers && this.props.task.Offers.length ? 
                            <p className="special text-center" style={{ marginTop: '20px' }}>{this.props.task.Offers.length} offers given</p>
                        : null}
                        <div className="offers-buttons">
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
                                                {this.getTrans(this.props.translations.text_1)}
                                            </a>
                                            :
                                            (
                                                this.props.task.Offers.find(offer => this.props.own_user && offer.Tasker.User.id === this.props.own_user.id) 
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
                                                                        if (!own_user.Tasker || !own_user.isTasker) openModal()
                                                                        else this.setState({ belowUI: "NONE", clickedMakeOffer: true });
                                                                    }
                                                                    else this.props.history.push("/register?to=/task/" + this.props.task.id);
                                                                }}
                                                                className="button fill">
                                                                {this.getTrans(this.props.translations.text_2)}
                                                            </a>
                                                            <Modal
                                                                isActive={isActive}     // required
                                                                closeModal={closeModal} // required
                                                                title={this.getTrans(this.props.translations.text_4)}
                                                                description={this.getTrans(this.props.translations.text_5)}
                                                                accountSettingsButton={true}
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
                                            {this.getTrans(this.props.translations.text_2)}
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
                                    {this.getTrans(this.props.translations.text_2)}
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
                                                marginBottom: "3%",
                                                padding: 13,
                                                fontSsize: 20
                                            }}
                                            placeholder={this.getTrans(this.props.translations.text_31)}
                                            onChange={this.amountOnChange}
                                            value={this.state.amount}
                                        />
                                        <a
                                            button
                                            style={{ width: "120px", margin: "0 auto" }}
                                            onClick={this.state.amount ? () => this.setState({ step: "SELF_PROMOTE" }) : undefined}
                                            className={`button ${this.state.amount ? "fill" : "no-fill"}`}>
                                            {this.getTrans(this.props.translations.text_20)}
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
            thumbnail={getImageUrl(this.props.task.thumbnail,"large") || window.__THUMBNAIL_DEFAULT_PICTURE__}
            goBack={() => this.setState({step: "TASK_PROFILE" })}
            onLogoClick={() => this.setState({ step: "TASK_PROFILE" })} 
            value={this.state.self_promote}
            onChange={e => this.setState({ self_promote: e.target.value })} 
            offersCard={this.getOffersCard()}
            buttonOnClick={buttonOnClick} 
            buttonStyle={buttonStyle}
            getTrans={this.getTrans}
            translations={this.props.translations}
            common={this.props.common}
        />
    }
    getOfferSentUI = () => <div className="container">
        <div className="content setup-ready">
            <header>
                <span onClick={this.props.goBack} className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                <Link to="/dashboard"><img className="logo__img" src="/images/logo.svg" alt="" /></Link>
            </header>
            <section className="two-column__layout setup__mobile profile__cover">
                <div className="two-column__info flex flex-column">
                    <div className="background-title mb5">
                        <h1>{this.getTrans(this.props.translations.text_18)}</h1>
                        <p className="shadow__title">setup your account</p>
                    </div>
                    <div>
                        <img src="/images/reminder.png" style={{ minWidth: '190px', width: '20%', margin: '0 auto 40px' }} alt="" />
                    </div>
                    <h4 className="show__mobile">{this.getTrans(this.props.translations.text_18)}</h4>
                    <p className="mb30 flex-grow" style={{ fontSize: '18px', maxWidth: '240px', marginTop: "2%", margin: "0 auto" }}>
                        {this.getTrans(this.props.translations.text_19)}
                    </p>
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
                        }} className="button__style no-color">{this.getTrans(this.props.translations.text_17)}</button>
                        <Link to="/">
                            <button className="button__style">{this.getTrans(this.props.translations.text_16)}</button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    </div>

    render(){
        console.log({err: this.props})
        if (this.props.errorResponse)
            if (this.props.errorResponse.response.status === 404) 
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
                    title={this.getTrans(this.props.translations.text_12)}
                    description={this.getTrans(this.props.translations.text_13)}
                    acceptText={this.getTrans(this.props.translations.text_14)}
                    acceptOnClick={() => {
                        this.delete()
                        this.closeModal()
                        this.setState({ opened: false })
                    }}
                />
                <Modal
                    isActive={this.state.onModal == "DEACTIVATE_MODAL"}     // required
                    closeModal={this.closeModal} // required
                    title={this.getTrans(this.props.translations.text_7)}
                    description={this.getTrans(this.props.translations.text_8)}
                    acceptText={this.getTrans(this.props.translations.text_15)}
                    acceptOnClick={() => {
                        this.deactivate()
                        this.closeModal()
                        this.setState({ opened: false })
                    }}
                />
                <Modal
                    isActive={this.state.onModal == "REACTIVATE_MODAL"}     // required
                    closeModal={this.closeModal} // required
                    title={this.getTrans(this.props.translations.text_9)}
                    description={this.getTrans(this.props.translations.text_10)}
                    acceptText={this.getTrans(this.props.translations.text_11)}
                    acceptOnClick={() => {
                        this.reActivate()
                        this.closeModal()
                        this.setState({ opened: false })
                    }}
                />
                <Modal
                    isActive={this.state.onModal == "CANNOT_EDIT"}     // required
                    closeModal={this.closeModal} // required
                    title={this.getTrans(this.props.translations.text_3)}
                    description={this.getTrans(this.props.translations.text_6)}
                    hide_buttons={true}
                />
                {children}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    let { taskId } = ownProps.match.params
    let { error, errorResponse } = state.tasks.byIds[taskId] || {}
    let { loading, ...task } = (state.tasks.byIds[taskId] && state.tasks.byIds[taskId].User) && state.tasks.byIds[taskId] || { loading: true }
    let own_user = state.auth.profile;
    return { 
        error, errorResponse, loading, own_user,task: task || {},
        translations: state.app_lang.data["/task-profile"],
        app_lang: state.app_lang.app_lang,
        common: state.app_lang.common    
    }
}

export default compose(withRouter,connect(mapStateToProps, { getTask, postOffers, patchTasks }))(Task);