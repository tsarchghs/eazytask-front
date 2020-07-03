import React from "react";
import { connect } from "react-redux";
import { getSkills } from "../../actions/skill";
import ItemList from "./ItemList.view";
import { filter } from "../../utils/search";
import { getCustomItems } from "./utils";

class MySkills extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            query: ""
        }
    }
    componentDidMount(){
        this.props.getSkills()
    }
    getFilteredSkills = () => {
        let skills = this.props.allIds.map(id => this.props.byIds[id])
        let customSkills = getCustomItems(this.props.skills,skills)
        let combined = customSkills.concat(skills);
        return filter(this.state.query, combined)
    }
    resetQuery = () => this.setState({ query: "" })
    customAddSkill = skill_name => () => {
        this.props.addSkill(skill_name)
        if (this.state.query === skill_name) this.resetQuery()
    }
    getAllowedOperation = skill_name => {
        let alreadyExists = this.props.skills.indexOf(skill_name) !== -1
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
    render(){
        console.log({props: this.props})
        return (
            <React.Fragment>
                <div className="background-title mb5">
                    <h1>My skills</h1>
                    <p className="shadow__title">setup your account</p>
                </div>
                <div className="flex-grow input__group skills__input-group">
                    <div className="search__input mb40">
                        <span><img src="/images/new/search.png" alt="" /></span>
                        <input 
                            type="text" 
                            placeholder="Search for a skill or add a custom one" 
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
                            !this.props.loading && !this.getFilteredSkills().length &&
                            this.createCustomSkill()
                        }
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({ 
    byIds: state.skills.byIds, 
    allIds: state.skills.allIds, 
    loading: state.skills.loading 
})

export default connect(mapStateToProps, { getSkills })(MySkills);