import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import Name from "./Name.view";
import Description from "./Description.view";
import PickDate from "./PickDate.view";
import Location from "./Location.view";
import ExpectedPrice from "./ExpectedPrice.view";
import CategoryGroup from "./CategoryGroup.view";
import Category from "./Category.view.js";
import TaskPublished from "./TaskPublished.view";
import OtherCategory from "./OtherCategory.view";

import { postTasks } from "../../actions/task";

const currentYear = new Date().getFullYear()

const format_number = val => {
    let num_val = Number(val)
    if (num_val < 0) return "0";
}

const format_day_or_month = (val,max) => {
    let str_val = String(val);
    let num_val = Number(val)
    if (num_val <= 0) return "01"
    else if (num_val > max) return String(max)
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
            step: 0,
            data: {
                name: "",
                description:"",
                date_type: "FIXED_DATE",
                day: "01",
                month: "01",
                zipCode: "",
                address: "",
                city: "",
                expected_price: "",
                year: String(currentYear)
            },
            steps: [
                "NAME",
                "DESCRIPTION",
                "PICK_DATE",
                "TASK_LOCATION",
                "EXPECTED_PRICE",
                "CATEGORY_GROUP",
                "CATEGORY",
                "OTHER_CATEGORY",
                "TASK_PUBLISHED"
            ]
        }
        this.lastStepIndex = this.state.steps.length - 1
    }
    createTask = () => {
        console.log("CREATE_TASK", this.state.data)
        let { name, date_type, day, month, year } = this.state.data;
        let due_date = new Date(`${month}/${day}/${year}`)
        console.log(`${day}/${month}/${year}`,due_date)
        let body = {
            ...this.state.data, title: name, 
            due_date_type: date_type, due_date,
        }
        this.props.postTasks(body,true);
    }
    componentDidUpdate(prevProps,prevState){
        console.log("prevState,this.state.step,this.lastStepIndex",prevState.step,this.state.step,this.lastStepIndex)
        if (this.state.steps[prevState.step] === "OTHER_CATEGORY" ||
            this.state.steps[prevState.step] === "CATEGORY"
        ) {
            if (this.state.step === this.lastStepIndex) {
                this.createTask();
            }
        }
    }
    getCurrentStepName = () => this.state.steps[this.state.step];
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
            if (key === "day") val = format_day_or_month(val,31);
            else if (key === "month") val = format_day_or_month(val,12);
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
    showCurrentStep = () => {
        switch (this.state.step) {
            case 0: return <Name 
                onNameChange={this.onChange("name")} name={this.state.data.name}
            />
            case 1: return <Description
                onDescriptionChange={this.onChange("description")} description={this.state.data.description}
            />
            case 2: return <PickDate 
                date_type={this.state.data.date_type}
                fixedOnClick={this.onChangeWithVal("date_type","FIXED_DATE")}
                untilOnClick={this.onChangeWithVal("date_type","UNTIL_DATE")}
                onDayChange={this.onChange("day")} day={this.state.data.day}
                onMonthChange={this.onChange("month")} month={this.state.data.month}
                onYearChange={this.onChange("year")} year={this.state.data.year}

            />
            case 3: return <Location
                onZipCodeChange={this.onChange("zipCode")} zipCode={this.state.data.zipCode}
                onAddressChange={this.onChange("address")} address={this.state.data.address}
                onCityChange={this.onChange("city")} city={this.state.data.city}
            />
            case 4: return <ExpectedPrice
                onExpectedPriceChange={this.onChange("expected_price")} 
                expected_price={this.state.data.expected_price}
            />
            case 5: return <CategoryGroup
                onCategoryGroupClick={id => {
                    this.setState({ categoryGroupId: id })
                    this.setState({ step: 6 })
                }}
                onOtherClick={this.nextStep(7)}
            />
            case 6: return <Category 
                categoryGroupId={this.state.categoryGroupId} 
                onCategoryClick={name => {
                    this.onChangeWithVal("category",name)()
                    this.setState({ step: 8 })
                }}
                onOtherClick={this.nextStep(7)}
            />
            case 7: return <OtherCategory
                category={this.state.data.category}
                onCategoryChange={this.onChange("category")}
            />
            case 8: return <TaskPublished
                loading={this.props.app_createTask.loading}
            />
        }
    }
    nextStep = step => () => this.setState({ step })
    showButtonCondition = () => {
        let currentStep = this.getCurrentStepName();
        let excludedSteps = ["CATEGORY_GROUP", "CATEGORY"];
        if (this.props.app_createTask.loading) excludedSteps.push("TASK_PUBLISHED")
        if (excludedSteps.indexOf(currentStep) === -1) return true
        else return false
    }
    getButtonText = () => {
        if (this.state.step === this.lastStepIndex - 1) return "Finish"
        if (this.state.step !== this.lastStepIndex) return "Next"
        else return "Back home"
    }
    getButtonOnClick = () => {
        let nextStep = this.state.step + 1;
        if (this.state.step === this.lastStepIndex) return () => {
            this.props.history.push("/");
            // this.props.history.push("/task/",this.props.app_createTask.data.id)
        } 
        else return this.nextStep(nextStep)
    }
    render() {
        console.log(this.state.data)
        if (!this.props.auth_profile.Tasker) return <Redirect to="/" />
        return (
            <React.Fragment>
                { this.showCurrentStep() } <br />
                { this.showButtonCondition() && <button onClick={this.getButtonOnClick()}>{this.getButtonText()}</button> }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth_profile: state.auth.profile,
    app_createTask: state.app.createTask
})

const enhance = compose(
    withRouter,
    connect(mapStateToProps, { postTasks })
)

export default enhance(CreateTask);