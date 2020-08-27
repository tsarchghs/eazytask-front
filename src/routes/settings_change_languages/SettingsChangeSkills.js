import React from "react";
import { connect } from "react-redux";
import { getLanguages } from "../../actions/language";
import { getAuth } from "../../actions/auth";
import { filter } from "../../utils/search";
import { getCustomItems } from "../setup/utils";
import ItemList from "../setup/ItemList.view";
import axios from "../../utils/axios";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

let once = false;
let once2 = false;

class MySkills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            skills: []
        }
    }
    componentDidMount() {
        if (!once){
            this.props.getLanguages()
            this.props.getAuth("?fields=tasker")
            if (this.searchRef) this.searchRef.focus()
        }
        once = true;
    }
    getFilteredSkills = () => {
        let skills = this.props.allIds.map(id => this.props.byIds[id])
        let customSkills = getCustomItems(this.state.skills, skills)
        let uniqueCustomSkills = customSkills
        let combined = uniqueCustomSkills.concat(skills)
        return filter(this.state.query, combined)
    }
    resetQuery = () => this.setState({ query: "" })
    customAddSkill = skill_name => () => {
        this.addSkill(skill_name)
        if (this.state.query === skill_name) this.resetQuery()
    }
    addSkill = skill => {
        this.setState(prevState => {
            if (prevState.skills.indexOf(skill) === -1)
                prevState.skills.push(skill);
            return { ...prevState, skills: [ ...prevState.skills ] }
        })
    }
    removeSkill = skill => {
        this.setState(prevState => {
            prevState.skills = prevState.skills.filter(x => x !== skill);
            return { ...prevState, skills: [ ...prevState.skills ] }
        }, () => console.log("REMOVE_SKILL", this.state.skills))
    }
    getAllowedOperation = skill_name => {
        let alreadyExists = this.state.skills.indexOf(skill_name) !== -1
        if (alreadyExists) {
            let div = <span onClick={() => this.removeSkill(skill_name)}>-</span>
            return { type: "-", div }
        }
        else {
            let div = <span onClick={this.customAddSkill(skill_name)}>+</span>
            return { type: "+", div }
        }
    }
    createCustomSkill = () => (
        <React.Fragment>
            <div className="list-item"><p>Create "{this.state.query}"</p>
                {this.getAllowedOperation(this.state.query).div}
            </div>
        </React.Fragment>
    )
    searchOnKeyDown = e => {
        let skills = this.getFilteredSkills();
        if (!skills.length) {
            if (e.key === "Enter") {
                this.customAddSkill(this.state.query)();
            }
        }
    }
    getTrans = obj => obj[this.props.app_lang]
    update = () => {
        this.setState({ loading: true })
        axios.patch("/taskers/" + this.props.own_user.Tasker.id, { languages: this.state.skills })
            .then(data => {
                this.setState({ loading: false })
                this.props.history.push("/settings/change_preferences")
            })
            .catch(err => {
                this.setState({ error: true, loading: false })
            })
    }
    render() {
        if (!this.props.own_user || !this.props.own_user.Tasker || !this.props.own_user.Tasker.Languages) return null;
        if (this.props.own_user.Tasker.Languages && !once2){
            once2 = true;
            this.setState(prevState => {
                prevState.skills = prevState.skills.concat(this.props.own_user.Tasker.Languages.map(x => x.name))
                return { ...prevState } 
            })
        }
        return (
                <div className="container">
                    <div className={"content"}>
                        <header className="logo-text">
                        <span onClick={this.props.goBack}  class="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                            <h4 class="hide-on-desktop">{this.getTrans(this.props.translations.text_30)}</h4>
                            <img onClick={e => this.props.history.push("/")} style={{ cursor: "pointer" }} class="logo__img" src="/images/logo.svg" alt="" />
                        </header>
                        <section className={`two-column__layout setup__mobile`} style={{ height: "calc(99vh - 114.6px)" }}>
                            <div className="two-column__info flex flex-column">
                                <div className="background-title mb5">
                                    <h1>{this.getTrans(this.props.translations.text_30)}</h1>
                                    <p className="shadow__title">setup your account</p>
                                </div>
                                <div className="flex-grow input__group skills__input-group">
                                    <div className="search__input mb40">
                                        <span><img src="/images/new/search.png" alt="" /></span>
                                        <input
                                            type="text"
                                            ref={ref => this.searchRef = ref}
                                            placeholder={this.getTrans(this.props.common["search-language"])}
                                            value={this.state.query}
                                            onChange={e => this.setState({ query: e.target.value })}
                                            onKeyDown={this.searchOnKeyDown}
                                        />
                                    </div>
                                    <div className="items-added">
                                        {!this.props.loading && this.getFilteredSkills()
                                            .map(x => x.name)
                                            .filter((v, i, a) => a.indexOf(v) === i)
                                            .map(x => this.getFilteredSkills().find(i => x == i.name))
                                            .filter(skill => this.getAllowedOperation(skill.name).type == "-")
                                            .map(skill => (
                                                <div className="item-added">
                                                    <p>{skill.name}</p>
                                                    {this.getAllowedOperation(skill.name).div}
                                                </div>

                                            ))
                                        }
                                    </div>
                                    <div className="list-items">
                                        {!this.props.loading && this.getFilteredSkills()
                                            .filter(skill => this.getAllowedOperation(skill.name).type == "+")
                                            .map(skill => {
                                                return (
                                                    <React.Fragment>
                                                        <div className="list-item"><p>{skill.name}</p>
                                                            {this.getAllowedOperation(skill.name).div}
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })}
                                        {
                                            !this.props.loading && !this.getFilteredSkills().length && this.state.query &&
                                            this.createCustomSkill()
                                        }
                                    </div>
                                </div>
                                <button onClick={() => {
                                    try {
                                        this.props.history.goBack()
                                    } catch (err) {
                                        this.props.history.push("/")
                                    }
                                }} className="button__style no-color">{this.getTrans(this.props.common.cancel)}</button>

                                <button
                                    className={`button__style ${false ? "not-filled" : ""}`}
                                    onClick={this.update}>
                                    { this.state.loading ? this.getTrans(this.props.common.saving) : this.getTrans(this.props.common.save) }
                                </button>

                            </div>
                            <div className="two-column__img">
                                <div className="two-column__image">
                                    <img
                                        style={{ width: "70%" }}
                                        src={`/images/super_man.png`} alt="" />
                                </div>
                                <div className="dots__group">
                                    {/* <span className={`dot`} /> */}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => ({
    own_user: state.auth.profile,
    byIds: state.languages.byIds,
    allIds: state.languages.allIds,
    loading: state.languages.loading,
    translations: state.app_lang.data["/setup"],
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})

export default compose(withRouter,connect(mapStateToProps, { getAuth, getLanguages }))(MySkills);