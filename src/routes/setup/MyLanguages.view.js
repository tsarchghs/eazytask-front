import React from "react";
import { connect } from "react-redux";
import { getLanguages } from "../../actions/language";
import ItemList from "./ItemList.view";

class MyLanguages extends React.Component {
    componentDidMount() {
        this.props.getLanguages()
    }
    getLanguages = () => {
        return this.props.allIds.map(id => this.props.byIds[id])
    }
    getAllowedOperation = language_name => {
        let alreadyExists = this.props.languages.indexOf(language_name) !== -1
        if (alreadyExists) return <div onClick={() => this.props.removeLanguage(language_name)}>-</div>
        else return <div onClick={() => this.props.addLanguage(language_name)}>+</div>
    }
    render() {
        console.log("ADSADS")
        return (
            <React.Fragment>
                My languages
                <input type="text" value="" placeholder="Search languages..." />
                <ItemList items={this.props.languages} />
                <ul>
                    {this.props.loading && "Loading"}
                    {!this.props.loading && this.getLanguages().map(language => {
                        return (
                            <React.Fragment>
                                <li key={language.id}>{language.name}</li>
                                {this.getAllowedOperation(language.name)}
                            </React.Fragment>
                        )
                    })}
                </ul>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    byIds: state.languages.byIds,
    allIds: state.languages.allIds,
    loading: state.languages.loading
})

export default connect(mapStateToProps, { getLanguages })(MyLanguages);