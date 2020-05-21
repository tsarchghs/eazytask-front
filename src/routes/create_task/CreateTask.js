import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import NameDescription from "./NameDescription.view";
import PickDate from "./PickDate.view";
import Location from "./Location.view";
import ExpectedPrice from "./ExpectedPrice.view";
import TaskPublished from "./TaskPublished.view";

const currentYear = new Date().getFullYear()

const format_number = val => {
    let num_val = Number(val)
    if (num_val < 0) return "0";
}

const format_day_or_month = val => {
    let str_val = String(val);
    let num_val = Number(val)
    if (num_val <= 0) return "01"
    else if (num_val > 31) return "31"
    else if (str_val.length === 1) return String(`0${str_val}`)
    else if (str_val.length === 2) return val;
}
const format_year = val => {
    if (Number(val) < currentYear) return currentYear
    if (Number(val) > currentYear + 1) return currentYear + 1
    return val;
}

class CreateTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 2,
            data: {
                name: "",
                description:"",
                date_type: "FIXED",
                day: "01",
                month: "01",
                zipCode: "",
                address: "",
                city: "",
                expected_price: "",
                year: String(currentYear)
            },
            steps: [
                "WELCOME_USER",
                "PICK_DATE",
                "TASK_LOCATION",
                "EXPECTED_PRICE",
                "TASK_PUBLISHED"
            ]
        }
        this.lastStepIndex = this.state.steps.length - 1
    }
    onFileChange = key => e => {
        e.persist()
        this.setState(prevState => {
            prevState.data[key] = e.target.files[0];
            return prevState;
        })
    }
    onChange = key => e => {
        e.persist()
        this.setState(prevState => {
            let val = e.target.value;
            if (key === "day" || key === "month") val = format_day_or_month(val);
            else if (key === "year") val = format_year(val);
            else if (key === "expected_price") val = format_number(val);
            prevState.data[key] = val;
            return prevState;
        })
    }
    onChangeWithVal = (key, val) => () => this.setState(prevState => {
        prevState.data[key] = val;
        return prevState;
    })
    createTask = () => console.log("createTask", this.state.data);
    showCurrentStep = () => {
        switch (this.state.step) {
            case 0: return <NameDescription 
                onNameChange={this.onChange("name")} name={this.state.data.name}
                onDescriptionChange={this.onChange("description")} description={this.state.data.description}
                onCityChange={this.onChange("city")} city={this.state.data.city}
            />
            case 1: return <PickDate 
                date_type={this.state.data.date_type}
                fixedOnClick={this.onChangeWithVal("date_type","FIXED")}
                untilOnClick={this.onChangeWithVal("date_type","UNTIL")}
                onDayChange={this.onChange("day")} day={this.state.data.day}
                onMonthChange={this.onChange("month")} month={this.state.data.month}
                onYearChange={this.onChange("year")} year={this.state.data.year}

            />
            case 2: return <Location
                onZipCodeChange={this.onChange("zipCode")} zipCode={this.state.data.zipCode}
                onAddressChange={this.onChange("address")} address={this.state.data.address}
                onCityChange={this.onChange("city")} city={this.state.data.city}
            />
            case 3: return <ExpectedPrice
                onExpectedPriceChange={this.onChange("expected_price")} 
                expected_price={this.state.data.expected_price}
            />
            case 4: return <TaskPublished/>
        }
    }
    nextStep = step => () => this.setState({ step })
    getButtonText = () => {
        if (this.state.step === this.lastStepIndex - 1) return "Finish"
        if (this.state.step !== this.lastStepIndex) return "Next"
        else return "Back home"
    }
    getButtonOnClick = () => {
        let nextStep = this.state.step + 1;
        if (this.state.step === this.lastStepIndex) return () => { }
        if (this.state.step === this.lastStepIndex - 1) return () => {
            this.createTask()
            this.nextStep(nextStep)()
        }
        else return this.nextStep(nextStep)
    }
    render() {
        console.log({step: this.state.step})
        if (this.props.tasker) return <Redirect to="/" />
        return (
            <React.Fragment>
                {this.showCurrentStep()} <br />
                <button onClick={this.getButtonOnClick()}>{this.getButtonText()}</button>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state.auth.profile
})

export default connect(mapStateToProps)(CreateTask);