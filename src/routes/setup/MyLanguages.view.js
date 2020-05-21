import React from "react";
import { connect } from "react-redux";
import { getLanguages } from "../../actions/language";
import ItemList from "./ItemList.view";
import { filter } from "../../utils/search";
import { getCustomItems } from "./utils";

class MyLanguages extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: "" }
    }
    componentDidMount() {
        this.props.getLanguages()
    }
    getFilteredLanguages = () => {
        let languages = this.props.allIds.map(id => this.props.byIds[id])
        let customLanguages = getCustomItems(this.props.languages, languages)
        let combined = customLanguages.concat(languages);
        return filter(this.state.query, combined)
    }
    resetQuery = () => this.setState({ query: "" })
    customAddLanguage = language_name => () => {
        this.props.addLanguage(language_name)
        if (this.state.query === language_name) this.resetQuery()
    }
    getAllowedOperation = language_name => {
        let alreadyExists = this.props.languages.indexOf(language_name) !== -1
        if (alreadyExists) return <div onClick={() => this.props.removeLanguage(language_name)}>-</div>
        else return <div onClick={this.customAddLanguage(language_name)}>+</div>
    }
    createCustomLanguage = () => (
        <React.Fragment>
            <li>Create "{this.state.query}"</li>
            {this.getAllowedOperation(this.state.query)}
        </React.Fragment>
    )
    render() {
        console.log("ADSADS")
        return (
            <React.Fragment>
                My languages
                <input
                    type="text"
                    value={this.state.query}
                    onChange={e => this.setState({ query: e.target.value })}
                    placeholder="Search language..."
                />
                <ItemList items={this.props.languages} />
                <ul>
                    {this.props.loading && "Loading"}
                    {!this.props.loading && this.getFilteredLanguages().map(language => {
                        return (
                            <React.Fragment>
                                <li key={language.id}>{language.name}</li>
                                {this.getAllowedOperation(language.name)}
                            </React.Fragment>
                        )
                    })}
                    {
                        !this.props.loading && !this.getFilteredLanguages().length &&
                        this.createCustomLanguage()
                    }
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