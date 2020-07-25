import React from "react";
import { connect } from "react-redux";
import { getSkills } from "../../actions/skill";
import { getAuth } from "../../actions/auth";
import { filter } from "../../utils/search";
import { getCustomItems } from "../setup/utils";
import ItemList from "../setup/ItemList.view";

let once = false;

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
            this.props.getSkills()
            this.props.getAuth("?fields=tasker",true)
            if (this.searchRef) this.searchRef.focus()
        }
        once = true;
    }
    getFilteredSkills = () => {
        let skills = this.props.allIds.map(id => this.props.byIds[id])
        console.log("this.props.own_user.Tasker.Skills", this.props.own_user.Tasker)
        let customSkills = getCustomItems(this.state.skills.concat(this.props.own_user.Tasker.Skills.map(x => x.name)), skills)
        let combined = customSkills.concat(skills);
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
    getAllowedOperation = skill_name => {
        let alreadyExists = this.state.skills.indexOf(skill_name) !== -1
        if (alreadyExists) {
            let div = <span onClick={() => this.props.removeSkill(skill_name)}>-</span>
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
    render() {
        if (!this.props.own_user || !this.props.own_user.Tasker || !this.props.own_user.Tasker.Skills) return null;
        console.log({ props: this.props })
        return (
                <div className="container">
                    <div className={"content"}>
                        <header className="logo-text">
                            <span class="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                            <h4 class="hide-on-desktop">{this.getTrans(this.props.translations.text_26)}</h4>
                            <img style={{ cursor: "pointer" }} class="logo__img" src="/images/logo.svg" alt="" />
                        </header>
                        <section className={`two-column__layout setup__mobile`} style={{ height: "calc(99vh - 114.6px)" }}>
                            <div className="two-column__info flex flex-column">
                                <div className="background-title mb5">
                                    <h1>{this.getTrans(this.props.translations.text_26)}</h1>
                                    <p className="shadow__title">setup your account</p>
                                </div>
                                <div className="flex-grow input__group skills__input-group">
                                    <div className="search__input mb40">
                                        <span><img src="/images/new/search.png" alt="" /></span>
                                        <input
                                            type="text"
                                            ref={ref => this.searchRef = ref}
                                            placeholder={this.getTrans(this.props.translations.text_27)}
                                            value={this.state.query}
                                            onChange={e => this.setState({ query: e.target.value })}
                                            onKeyDown={this.searchOnKeyDown}
                                        />
                                    </div>
                                    <div className="items-added">
                                        {!this.props.loading && this.getFilteredSkills()
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
                                <button onClick={undefined} className="button__style no-color">Cancel</button>

                                <button
                                    className={`button__style ${false ? "not-filled" : ""}`}
                                    onClick={undefined}>
                                    Save
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
    byIds: state.skills.byIds,
    allIds: state.skills.allIds,
    loading: state.skills.loading,
    translations: state.app_lang.data["/setup"],
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})

export default connect(mapStateToProps, { getAuth, getSkills })(MySkills);