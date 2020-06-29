import React from "react";
import { connect } from "react-redux";
import { getTask } from "../../actions/task";
import { postOffers } from "../../actions/offer";
import Loading from "../../components/loading";
import { Link } from "react-router-dom";
import E404 from "../E404";

const format_number = val => {
    let num_val = Number(val)
    if (num_val < 0) return "0";
    else return num_val
}

class Task extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            amount: 0,
            step: "TASK_PROFILE", // or SELF_PROMOTE, OFFER_SENT,
            self_promote: "",
            clickedMakeOffer: false,
            showAllOffersUI: false,
            belowUI: "DEFAULT"
        }
    }
    componentDidMount(){
        console.log(55555,`this.props.getTask(this.props.match.params.taskId,"fields=question,user,offers,category")`)
        this.props.getTask(this.props.match.params.taskId,"fields=question,user,offers,category")
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
    getAllOffersUI = () => <React.Fragment>
        <div className="other-offers__list">
            <p className="offers-images__title">Other offers</p>
            {
                this.props.task.Offers.map(offer => (
                    <div className="other-offer">
                        <div className="offers__profile">
                            <div className="offers__profile--img" />
                            <h4 className="flex aic jcc"> <div className="img-circle">
                            <Link to={"/profile/" + offer.Tasker.UserId}>
                                <img 
                                    src={offer.Tasker.User.profile_picture || window.__PROFILE_DEFAULT_PICTURE__} 
                                    alt="" 
                                />
                            </Link>
                            </div>{offer.Tasker.User.first_name} {offer.Tasker.User.last_name[0]}.</h4>
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
    getTaskProfileUI = () => {
        return (
            <section className="offers-layout">
                <div className="offers-picture" style={{
                    backgroundImage: `url(${this.props.task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__})`
                }}/>
                <div className="offers-content">
                    <div className="offers__cards">
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
                                            src={this.props.task.User.profile_picture || window.__PROFILE_DEFAULT_PICTURE__} 
                                            alt="" 
                                        />
                                    </Link>
                                    </div> {this.props.task.User.first_name} {this.props.task.User.last_name[0]}.</h4>
                                </div>
                            </div>
                            <div className="offers__card--bottom">
                                <div>
                                    <p><img src="/images/inter.png" alt="" /> {new Date(this.props.task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
                                    <p><img src="/images/pins.png" alt="" /> {this.props.task.zipCode}, {this.props.task.city}</p>
                                </div>
                                <div>
                                    <p><img src="/images/shop.png" alt="" />CHF {this.props.task.expected_price}.-</p>
                                    <p><img src="/images/flags.png" alt="" /> {this.props.task.Category.name}</p>
                                </div>
                            </div>
                        </div>
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
                                        <a
                                            button
                                            onClick={() => this.setState({ belowUI: "SHOW_OFFERS" })}
                                            className="button fill">
                                            Go to offers
                                        </a>
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
                                this.showOfferUI() && 
                                    <div className="register__form" style={{paddingBottom: 50}}>
                                        {
                                            this.state.clickedMakeOffer &&
                                            <input 
                                                className="input" 
                                                placeholder="Amount"
                                                onChange={this.amountOnChange}
                                                value={this.state.amount}
                                            />
                                        }
                                        {
                                            this.state.clickedMakeOffer&&
                                            <a
                                                button
                                                onClick={this.state.amount ? () => this.setState({ step: "SELF_PROMOTE" }) : undefined}
                                                className={`button ${this.state.amount ? "fill" : "no-fill"}`}>
                                                Next
                                            </a>
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div></section>
        )
        return (
            <div>
                <br />
                {/* {JSON.stringify(this.props.task)} <br /><br /> */}
                Title -  {this.props.task.title} <br />
                Description -{this.props.task.description}<br /> <br />
                Asker - {this.props.task.User.first_name} {this.props.task.User.last_name[0]}<br /> <br />
                Due date -  { new Date(this.props.task.due_date).toLocaleDateString().replace(/\//g,".") } <br /> <br />
                Location - { this.props.task.zipCode}, { this.props.task.city} <br /> <br />
                Price - { this.props.task.expected_price} CH <br /> <br />
                Category -  { this.props.task.Category.name} <br /> <br/>

                {this.state.belowUI === "SHOW_OFFERS" && this.getAllOffersUI()} <br/>
                { this.state.belowUI === "DEFAULT" && <React.Fragment>
                    Thumbnail - { this.props.task.thumbnail ? <img width={100} src={this.props.task.thumbnail} /> : "None"} <br /> <br />
                    Gallery - { this.props.task.gallery && this.props.task.gallery.split(",").map(src => (
                        <img src={src} width={100} />
                    ))}<br />
                    <center>
                        <button onClick={() => this.setState({ belowUI: "SHOW_OFFERS" })}>Go to offers</button>
                    </center>
                </React.Fragment>}<br/>
                
            </div> 
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
        let className = "button__style"
        if (!buttonOnClick) className += " no-fill"
        return (
            <div className="container">
                <div className="content">
                    <header className="logo-text">
                        <span onClick={() => this.setState({ step: "TASK_PROFILE" })} className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                        <h4 className="hide-on-desktop logo-title">Self <span> Promote</span></h4>
                        <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                    </header>
                    <section className="two-column__layout setup__mobile create-task">
                        <div className="two-column__info flex flex-column">
                            <div className="background-title mb30">
                                <h1>Describe</h1>
                                <h3>task</h3>
                                <p className="shadow__title no-contain">create a task on eazytask easy </p>
                            </div>
                            <h4 className="show__mobile">
                                <p className="show__mobile--subtitle">Please write why do you think you are the right person to do this task</p>
                            </h4>
                            <form action className="register__form flex-grow" style={{ marginTop: 0 }}>
                                <textarea value={this.state.self_promote} onChange={e => this.setState({ self_promote: e.target.value })} className="textarea" name id placeholder="Promote yourself..." defaultValue={""} />
                            </form>
                            <div className="buttons__group">
                                <button 
                                    onClick={buttonOnClick}
                                    className={className}
                                >Send</button>
                            </div>
                        </div>
                        <div className="two-column__img">
                            <div className="two-column__image">
                                <img src="/images/ct/startup.png" alt="" />
                            </div>
                            <div className="dots__group">
                                <span className="dot active" />
                                <span className="dot" />
                                <span className="dot" />
                            </div>
                        </div>
                    </section>
                </div></div>

        )
        return (
            <React.Fragment>
                Self promote: <input value={this.state.self_promote} onChange={this.onChange("self_promote")}/>
                <button onClick={buttonOnClick}>Next</button>
            </React.Fragment>
        )
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
                    <p className="mb30 flex-grow" style={{ fontSize: '18px', maxWidth: '240px' }}>You will be notified if the asker accept it or not</p>
                    <div className="buttons__group">
                        <Link to={"/task/" + this.props.task.id}>
                            <button className="button__style no-color">View task</button>
                        </Link>
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
        switch (this.state.step) {
            case "TASK_PROFILE": return this.getTaskProfileUI()
            case "SELF_PROMOTE": return this.getSelfPromoteUI()
            case "OFFER_SENT": return this.getOfferSentUI()
        }
    }
}

const mapStateToProps = (state,ownProps) => {
    let { taskId } = ownProps.match.params
    let { error, loading, ...task } = state.tasks.byIds[taskId] || { loading: true }
    let own_user = state.auth.profile;
    return { error, loading, own_user,task: task || {} }
}

export default connect(mapStateToProps, { getTask, postOffers })(Task);