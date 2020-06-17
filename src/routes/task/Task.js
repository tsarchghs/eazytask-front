import React from "react";
import { connect } from "react-redux";
import { getTask } from "../../actions/task";
import { postOffers } from "../../actions/offer";
import Loading from "../../components/loading";
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
            amount: 1,
            step: "TASK_PROFILE", // or SELF_PROMOTE, OFFER_SENT,
            self_promote: "",
            clickedMakeOffer: false,
            showAllOffersUI: false,
            belowUI: "DEFAULT"
        }
    }
    componentDidMount(){
        this.props.getTask(this.props.match.params.taskId,"fields=question,user,offers,category")
    }
    setStep = step => () => this.setState({ step })
    onChange = key => e => this.setState({ [key]: e.target.value })
    amountOnChange = e => this.setState({ amount: format_number(e.target.value) })
    showOfferUI = () => console.log({ tasker: this.props.own_user }) || (
        this.props.own_user &&
        this.props.own_user.id !== this.props.task.UserId &&
        this.props.own_user.Tasker &&
        !this.props.task.Offers.find(offer => offer.Tasker.User.id === this.props.own_user.id)
    )
    getOfferUI = () => {
        let { clickedMakeOffer, amount } = this.state;
        let buttonText = !clickedMakeOffer ? "Make offer" : "Next"
        let buttonOnClick = !clickedMakeOffer ? () => this.setState({ clickedMakeOffer: true })
                                          : this.setStep("SELF_PROMOTE")
        return (
            <React.Fragment>
                {clickedMakeOffer && <input type="number" value={amount} onChange={this.amountOnChange}/>}<br/>
                <button onClick={buttonOnClick}>{ buttonText }</button>
            </React.Fragment>
        )
    }
    getAllOffersUI = () => <React.Fragment>
        {
            this.props.task.Offers.map(offer => (
                <li> <img width={50} src={offer.Tasker.User.profile_picture}/> 
                    { offer.Tasker.User.first_name } { offer.Tasker.User.last_name[0]} - { offer.amount} CH
                </li>
            ))
        }
        { this.showOfferUI() && this.getOfferUI() }
    </React.Fragment>
    getTaskProfileUI = () => {
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
        this.props.postOffers({ taskId: this.props.task.id, amount, self_promote })
    }
    getSelfPromoteUI = () => {
        let buttonOnClick = e => {
            this.setState({ step: "OFFER_SENT" })
            this.sendOffer()
        }
        return (
            <React.Fragment>
                Self promote: <input value={this.state.self_promote} onChange={this.onChange("self_promote")}/>
                <button onClick={buttonOnClick}>Next</button>
            </React.Fragment>
        )
    }
    getOfferSentUI = () => <React.Fragment>Offer sent</React.Fragment>
    render(){
        if (this.props.error)
            if (this.props.errorResponse.response.status === 404) 
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