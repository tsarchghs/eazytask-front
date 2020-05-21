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
        if (alreadyExists) return <div onClick={() => this.props.removeSkill(skill_name)}>-</div>
        else return <div 
            onClick={this.customAddSkill(skill_name)}>+</div>
    }
    createCustomSkill = () => (
        <React.Fragment>
            <li>Create "{this.state.query}"</li>
            {this.getAllowedOperation(this.state.query)}
        </React.Fragment>
    )
    render(){
        console.log({props: this.props})
        return (
            <React.Fragment>
                My skills
                <input 
                    type="text" 
                    value={this.state.query} 
                    onChange={e => this.setState({ query: e.target.value })}
                    placeholder="Search skill..." 
                />
                <ItemList items={this.props.skills} />
                <ul>
                    {this.props.loading && "Loading"}
                    {!this.props.loading && this.getFilteredSkills().map(skill => {
                        return (
                            <React.Fragment>
                                <li key={skill.id}>{skill.name}</li>
                                {this.getAllowedOperation(skill.name)}
                            </React.Fragment>
                        )
                    })}
                    {
                        !this.props.loading && !this.getFilteredSkills().length && 
                        this.createCustomSkill()
                    }
                </ul>
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