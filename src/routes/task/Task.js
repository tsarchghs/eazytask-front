import React from "react";
import { connect } from "react-redux";
import { getTask } from "../../actions/task";
import Loading from "../../components/loading";
import E404 from "../E404";

const format_number = val => {
    let num_val = Number(val)
    if (num_val < 0) return "0";
}

class Task extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            amount: 0,
            clickedOffer: false,
            step: "TASK_PROFILE", // or SELF_PROMOTE, OFFER_SENT,
            self_promote: ""
        }
    }
    componentDidMount(){
        this.props.getTask(this.props.match.params.taskId)
    }
    onChange = key => e => this.setState({ [key]: e.target.value })
    showOfferUI = () => (
        this.props.own_user &&
        this.props.own_user.id !== this.props.task.UserId &&
        this.props.own_user.Tasker
    )
    showEditUI = () => (
        this.props.own_user &&
        this.props.own_user.id === this.props.task.UserId
    )
    amountOnChange = e => this.setState({ amount: format_number(e.target.value) })
    setStep = step => () => this.setState({ step })
    getOfferUI = () => {
        let { clickedOffer, amount } = this.state;
        let buttonText = !clickedOffer ? "Offer" : "Next"
        let buttonOnClick = !clickedOffer ? () => this.setState({ clickedOffer: true })
                                          : this.setStep("SELF_PROMOTE")
        return (
            <React.Fragment>
                {clickedOffer && <input type="number" value={amount} onChange={this.amountOnChange}/>}<br/>
                <button onClick={buttonOnClick}>{ buttonText }</button>
            </React.Fragment>
        )
    }
    getTaskProfileUI = () => {
        return (
            <div>
                <br />
                {JSON.stringify(this.props.task)} <br /><br />
                Title - { this.showEditUI() && "Edit" } {this.props.task.title} <br />
                Description - { this.showEditUI() && "Edit"} {this.props.task.description}<br /> <br />
                {this.showOfferUI() && this.getOfferUI()}
            </div> 
        )
    }
    sendOffer = () => {
        console.log("SEND_OFFER",this.state)
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
    let { error, loading, ...rest } = state.tasks.byIds[taskId] || {}
    let own_user = state.auth.profile;
    return { error, loading, own_user,task: rest.data || {} }
}

export default connect(mapStateToProps, { getTask })(Task);