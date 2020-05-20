import React from "react";
import { connect } from "react-redux";
import { getSkills } from "../../actions/skill";
import ItemList from "./ItemList.view";

class MySkills extends React.Component {
    componentDidMount(){
        this.props.getSkills()
    }
    getSkills = () => {
        console.log(this.props)
        return this.props.allIds.map(id => this.props.byIds[id])
    }
    getAllowedOperation = skill_name => {
        let alreadyExists = this.props.skills.indexOf(skill_name) !== -1
        if (alreadyExists) return <div onClick={() => this.props.removeSkill(skill_name)}>-</div>
        else return <div onClick={() => this.props.addSkill(skill_name)}>+</div>
    }
    render(){
        console.log({props: this.props})
        return (
            <React.Fragment>
                My skills
                <input type="text" value="" placeholder="Search skills..." />
                <ItemList items={this.props.skills} />
                <ul>
                    {this.props.loading && "Loading"}
                    {!this.props.loading && this.getSkills().map(skill => {
                        return (
                            <React.Fragment>
                                <li key={skill.id}>{skill.name}</li>
                                { this.getAllowedOperation(skill.name) }
                            </React.Fragment>     
                        )
                    })}
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