import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Redirect, withRouter, Link } from "react-router-dom";

import Name from "./Name.view";
import Description from "./Description.view";
import PickDate from "./PickDate.view";
import Location from "./Location.view";
import ExpectedPrice from "./ExpectedPrice.view";
import CategoryGroup from "./CategoryGroup.view";
import Category from "./Category.view.js";
import TaskPublished from "./TaskPublished.view";
import OtherCategory from "./OtherCategory.view";
import TaskGallery from "./TaskGallery.view";
import TaskReview from "./TaskReview.view";

import { postTasks } from "../../actions/task";

import * as Yup from "yup";

import queryString from "query-string";
import MobileNav from "../../components/MobileNav";
import WebHeader from "../../components/WebHeader";

const currentYear = new Date().getFullYear()

const format_number = val => {
    let num_val = Number(val)
    if (num_val < 0) return 0;
    return num_val;
}

const format_day_or_month = (val,max) => {
    console.log({val,max})
    let str_val = String(val);
    let num_val = Number(val)
    if (num_val <= 0) return "01"
    else if (num_val > max) return String(max)
    else if (str_val.length === 1) return String(`0${str_val}`)
    else if (str_val.length === 2) return val;
    else if (str_val.length === 3) return String(Number(val));

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
            errors: [],
            description_limit: 250,
            data: {
                name: "",
                description:"",
                date_type: "FIXED_DATE",
                day: format_day_or_month(new Date().getDate() + 1,31),
                month: format_day_or_month(new Date().getMonth() + 1,12),
                zipCode: "",
                address: "",
                city: "",
                gallery: {},
                expected_price: 1,
                category: "",
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
                "TASK_GALLERY",
                "TASK_REVIEW",
                "TASK_PUBLISHED"
            ]
        }
        this.validations = {
            "NAME": Yup.object().shape({ name: Yup.string().required(this.getTrans(props.translations.text_3)) }),
            "DESCRIPTION": Yup.object().shape({ description: Yup.string().required(this.getTrans(props.translations.text_6))}),
            "TASK_LOCATION": Yup.object().shape({ 
                zipCode: Yup.string().required(this.getTrans(props.translations.text_15)),
                address: Yup.string().required(this.getTrans(props.translations.text_16)),
                city: Yup.string().required(this.getTrans(props.translations.text_17))
            }),
            "OTHER_CATEGORY": Yup.object().shape({
                category: Yup.string().required(this.getTrans(props.translations.text_30))
            })
        }
        this.lastStepIndex = this.state.steps.length - 1
        this.requestSent = false;
        this.redirected = false;
    }
    createTask = async () => {
        console.log("CREATE_TASK", this.state.data, this.requestSent)
        if (!this.requestSent){
            let { name, date_type, day, month, year, thumbnail } = this.state.data;
            let due_date = new Date(`${month}/${day}/${year}`)
            console.log(`${day}/${month}/${year}`,due_date)
            let body = {
                ...this.state.data, title: name, 
                due_date_type: date_type, due_date,
            }
            body.thumbnail = body.thumbnail ? body.gallery[thumbnail].file : undefined
            body.gallery = Object.keys(body.gallery).filter(key => key !== thumbnail).map(key => body.gallery[key].file);
            console.log({body})
            this.props.postTasks(body,true);
            this.requestSent = true;
        }
    }
    componentDidUpdate(prevProps,prevState){
        if (this.props.app_createTask.data && !this.redirected) {
            this.redirected = true;
            this.props.history.push("?step=" + this.lastStepIndex)
        }
        console.log("prevState,this.state.step,this.lastStepIndex",prevState.step,this.state.step,this.lastStepIndex)
        // if (this.state.step === this.lastStepIndex) {
        //     this.createTask();
        // }
        if (prevProps.location.search != this.props.location.search) {
            let { search } = this.props.location;
            let { step } = queryString.parse(search);
            if (!step) step = 0;
            step = Number(step);
            this.setState({ step })
        }
    }
    componentWillUnmount(){
        document.body.classList.remove("overflow-hidden")
    }
    getCurrentStepName = () => this.state.steps[this.state.step];
    onFileChange = key => e => {
        e.persist()
        e.preventDefault()
        let src;

        let file = e.target.files[0]
        
        let useThis = this;
        if (file){
            console.log("LOL",{key,src,file})
            var fr = new FileReader();
            fr.onload = function (d) {
                let src = d.srcElement.result;
                useThis.setState(prevState => {
                    console.log({key,src:src})
                    prevState.data["gallery"][key] = { file, src };
                    e.target.value = null;
                    return prevState;
                })
            }
            fr.readAsDataURL(file);
        }
    }
    onThumbnailChange = file_key => () => {
        this.setState(prevState => {
            prevState.data.thumbnail = file_key            
            return prevState;
        })
    }
    onGalleryImageRemove = file_key => () => {
        this.setState(prevState => {
            let { thumbnail } = prevState.data
            if (thumbnail === file_key) prevState.data.thumbnail = null;
            delete prevState.data.gallery[file_key];
            return prevState;
        })
    }
    onChange = key => async e => {
        e.persist()
        let { value } = e.target;
        this.setState(prevState => {
            if (key === "day") value = format_day_or_month(value,31);
            else if (key === "month") value = format_day_or_month(value,12);
            else if (key === "year") value = format_year(value);
            else if (key === "expected_price") value = format_number(value);
            else if (key === "description") 
                if (value.length > this.state.description_limit) return prevState
            prevState.data[key] = value;
            return prevState;
        }, async () => {
            let stepKey = this.state.steps[this.state.step]
            let valid = this.validations[stepKey] ? await this.validations[stepKey].isValid(this.state.data) : true;
            this.setState({ valid })
        })
    }
    onChangeWithVal = (key, val) => () => this.setState(prevState => {
        prevState.data[key] = val;
        return prevState;
    })
    showCurrentStep = () => {
        let { translations, app_lang, common } = this.props;
        let commonProps = { handleInputKeyDown: this.handleInputKeyDown, translations, app_lang, common, getTrans: this.getTrans }
        switch (this.state.step) {
            case 0: return <Name {...commonProps} 
                onNameChange={this.onChange("name")} name={this.state.data.name}
                errors={this.state.errors}
            />
            case 1: return <Description {...commonProps}
                onDescriptionChange={this.onChange("description")} description={this.state.data.description}
                description_limit={this.state.description_limit}
                errors={this.state.errors}
            />
            case 2: return <PickDate {...commonProps} 
                date_type={this.state.data.date_type}
                fixedOnClick={this.onChangeWithVal("date_type","FIXED_DATE")}
                untilOnClick={this.onChangeWithVal("date_type","UNTIL_DATE")}
                onDayChange={this.onChange("day")} day={this.state.data.day}
                onMonthChange={this.onChange("month")} month={this.state.data.month}
                onYearChange={this.onChange("year")} year={this.state.data.year}

            />
            case 3: return <Location {...commonProps}
                onZipCodeChange={this.onChange("zipCode")} zipCode={this.state.data.zipCode}
                onAddressChange={this.onChange("address")} address={this.state.data.address}
                onCityChange={this.onChange("city")} city={this.state.data.city}
                errors={this.state.errors}
            />
            case 4: return <ExpectedPrice {...commonProps}
                onExpectedPriceChange={this.onChange("expected_price")} 
                expected_price={this.state.data.expected_price}
            />
            case 5: return <CategoryGroup {...commonProps}
                onCategoryGroupClick={(id,name) => {
                    this.setState({ categoryGroupId: id, categoryGroupName: name })
                    this.setState({ step: 6 })
                }}
                onOtherClick={this.nextStep(7)}
            />
            case 6: return <Category {...commonProps} 
                categoryGroupId={this.state.categoryGroupId} 
                categoryGroupName={this.state.categoryGroupName}
                onCategoryClick={name => {
                    this.onChangeWithVal("category",name)()
                    this.nextStep(8)();
                }}
                onOtherClick={this.nextStep(7)}
            />
            case 7: return <OtherCategory {...commonProps} 
                category={this.state.data.category}
                onCategoryChange={val => {
                    this.onChange("category")(val);
                }}
                errors={this.state.errors}
            />
            case 8: return <TaskGallery {...commonProps} 
                gallery={this.state.data.gallery}
                onFileChange={this.onFileChange}
                onThumbnailChange={this.onThumbnailChange}
                thumbnail={this.state.data.thumbnail}
                onGalleryImageRemove={this.onGalleryImageRemove}
            />
            case 9: return <TaskReview {...commonProps}  {...this.state.data} categoryGroupName={this.state.categoryGroupName}/>
            case 10: return <TaskPublished {...commonProps} 
                loading={this.props.app_createTask.loading}
            />
        }
    }
    nextStep = step => async () => {
        this.props.history.push("?step=" + step)
        if (step == 1 && this.state.step == 0) this.setState({ step: 1 })
        document.body.classList.remove("overflow-hidden")
        let stepKey = this.state.steps[step]
        let valid = this.validations[stepKey] ? await this.validations[stepKey].isValid(this.state.data) : true;
        console.log(step,stepKey,valid,91919)
        this.setState({ valid, errors: [] })
    }
    showButtonCondition = () => {
        let currentStep = this.getCurrentStepName();
        let excludedSteps = ["CATEGORY_GROUP", "CATEGORY"];
        if (this.props.app_createTask.loading) excludedSteps.push("TASK_PUBLISHED")
        if (excludedSteps.indexOf(currentStep) === -1) return true
        else return false
    }
    getButtonText = () => {
        if (this.props.app_createTask.loading) return this.getTrans(this.props.translations.text_53)
        if (this.state.step == 8) return this.getTrans(this.props.translations.text_51)
        if (this.state.step === this.lastStepIndex - 2) return this.getTrans(this.props.translations.text_49)
        if (this.state.step === this.lastStepIndex - 1) return this.getTrans(this.props.translations.text_50)
        else if (this.state.step === 0) return this.getTrans(this.props.translations.text_51)
        else if (this.state.step !== this.lastStepIndex) return this.getTrans(this.props.translations.text_51)
        else return this.getTrans(this.props.translations.text_52)
    }
    getButtonOnClick = () => {
        let nextStep = this.state.step + 1;
        if (this.props.app_createTask.loading) return () => {}
        if (this.state.step == this.lastStepIndex - 1){
            return () => {
                this.createTask();
            }
        }
        if (this.state.step === this.lastStepIndex) return () => {
            window.location.href = "/dashboard";
            // this.props.history.push("/task/",this.props.app_createTask.data.id)
        } 
        else {
            return async () => {
                let schema = this.validations[this.state.steps[this.state.step]]
                console.log("this.state.steps[this.state.step]",this.state.steps[this.state.step])
                if (schema){
                    try {
                        await schema.validate(this.state.data, { abortEarly: false } );
                        this.setState({ errors: [] })
                    } catch (err) {
                        this.setState({ errors: err.errors })
                        return;
                    }
                }
                console.log("this.nextStep(nextStep)()",nextStep)
                return this.nextStep(nextStep)()
            }
        }
    }
    // getDots = () => {
    //     return this.state.steps.map((x, i) => {
    //         let active = this.state.steps[this.state.step] === x;
    //         return <span onClick={this.nextStep(i)} className={`dot ${active ? "active" : ""}`} />
    //     })
    // }
    getDots = () => {
        if (this.state.step === this.state.steps.length - 1) return [];
        if (this.state.step === this.state.steps.length - 2) return [];
        return this.state.steps.slice(0, this.state.steps.length - 2).map((x, i) => {
            let index = this.state.steps.indexOf(x)
            let getOnClick = () => {
                if (index == 6) return this.nextStep(8)
                if (index == 7) return this.nextStep(8)
                if (this.state.step <= index) return () => { }
                else return async () => {
                    this.nextStep(index)();
                    let stepKey = index
                    let valid = this.validations[stepKey] ? await this.validations[stepKey].isValid(this.state.data) : true;
                    this.setState({ valid })
                }
            }
            let onStep = this.state.step + 1
            let active = onStep >= i + 1;
            return <span onClick={getOnClick()} className={`dot ${active ? "active" : ""}` + ` ${i}`} />
        }).filter((el, step) => step != 6 && step != 7 && step != 9)
    }
    getGoBack = () => {
        console.log("getGoBackgetGoBack")
        return async () => {
            let stepKey = this.state.steps[this.state.step - 1]
            let valid = this.validations[stepKey] ? await this.validations[stepKey].isValid(this.state.data) : true;

            let { step } = this.state;
            if (step == 7 || step == 8 || step == 6) step = 6

            this.props.history.push("?step=" + ( step - 1 ))  
            this.setState({ step: step - 1, valid })
        }
    }
    getStepImage = () => {
        switch (this.state.steps[this.state.step]) {
            case "NAME": return "/images/startup.png"
            case "DESCRIPTION": return "/images/startup.png"
            case "PICK_DATE": return "/images/calendar.png"
            case "TASK_LOCATION": return "/images/stand.png"
            case "EXPECTED_PRICE": return "/images/online.png"
            case "CATEGORY_GROUP": return "/images/stand2.png"
            case "CATEGORY": return "/images/Group.png"
            case "OTHER_CATEGORY": return "/images/Group.png"
            case "TASK_GALLERY": return "/images/camera_1.png"
            case "TASK_REVIEW": return "/images/mind-map.png"
            case "TASK_PUBLISHED": return "/images/computer_display_monochromatic_1.png"
            default: return "/images/Group.png"
        }
    }
    getTrans = obj => {
        let data = obj[this.props.app_lang];
        if (typeof(data) == "string") return data;
        if (data.length) {
            return data.map(str => <React.Fragment>
                {str}<br/>
            </React.Fragment>)
        }
    }
    handleInputKeyDown = e => {
        if (e.key == "Enter"){
            this.getButtonOnClick()()
        }
    }
    render() {
        console.log("this.state.step ", this.state.step )
        if (this.state.step < 0) return <Redirect to="/"/>
        console.log("this.state.datathis.state.data",this.state)
        // if (!this.props.auth_profile.Tasker) return <Redirect to="/" />
        let extra = "";
        let stepName = this.state.steps[this.state.step]
        if (stepName == "TASK_GALLERY") {
            extra = "profile__cover"
            if (Object.keys(this.state.data.gallery).length) {
                extra += " overflow-h"
                document.body.classList.add("overflow-hidden")
            }
        }
        let headerClassName = "";
        if (stepName == "TASK_PUBLISHED") headerClassName = "no-visibility"
        return (
            <div className="container">
                <div className={"content" + (headerClassName ? " setup-ready" : "")}>
                    <WebHeader active="new_task"/>
                    <header className="hide-on-web">
                        <span onClick={this.getGoBack()} className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                        <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                    </header>

                    <section className={"two-column__layout setup__mobile create-task " + extra}>
                        <div className="two-column__info flex flex-column">
                            { this.showCurrentStep() }
                            {/* {this.state.errors.map(x => (
                                <div class="register__form--error">{x}</div>
                            ))} */}
                            {
                                this.showButtonCondition() &&
                                <div className={`buttons__group mb-mobile-button--group ` +  ( [0].indexOf(this.state.step) !== -1  ? " " : "")}>
                                {/* {
                                    this.state.step == 9 && 
                                        <p className="m-fs14" style={{ fontSize: 20 }}>
                                            By joining on platform I confirm that I read and <br />
                                            understood all the <a href="/terms_and_conditions?fromCreateTask" target="_blank">Terms&Conditions</a> of eazytask
                                        </p>
                                }   */}
                                    <button 
                                        onClick={this.getButtonOnClick()} 
                                        className={"button__style " + (!this.state.valid ? "not-filled " : "")}
                                    >
                                        {this.getButtonText()}
                                    </button>
                                </div>
                            }
                        </div>
                        {
                            this.state.step !== this.lastStepIndex &&
                            <div className="two-column__img">
                                <div className="two-column__image">
                                    <img src={this.getStepImage()} alt="" />
                                </div>
                                <div className="dots__group">
                                    {this.getDots()}
                                </div>
                            </div>
                        }
                    </section>
                </div>
                <MobileNav active="create-task"/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth_profile: state.auth.profile,
    app_createTask: state.app.createTask,
    translations: state.app_lang.data["/create-task"],
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common

})

const enhance = compose(
    withRouter,
    connect(mapStateToProps, { postTasks })
)

export default enhance(CreateTask);