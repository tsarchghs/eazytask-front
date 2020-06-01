import React from "react";
import { connect } from "react-redux";
import { getLanguages } from "../../actions/language";
import ItemList from "./ItemList.view";
import { filter } from "../../utils/search";
import { getCustomItems } from "./utils";

class MyLanguages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ""
        }
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
        if (alreadyExists) {
            let div = <span onClick={() => this.props.removeLanguage(language_name)}>-</span>
            return { type: "-", div }
        }
        else {
            let div = <span onClick={this.customAddLanguage(language_name)}>+</span>
            return { type: "+", div }
        }
    }
    createCustomLanguage = () => (
        <React.Fragment>
            <div className="list-item"><p>Create "{this.state.query}"</p>
                {this.getAllowedOperation(this.state.query).div}
            </div>
        </React.Fragment>
    )
    render() {
        console.log({ props: this.props })
        return (
            <React.Fragment>
                <div className="background-title mb5">
                    <h1>My languages</h1>
                    <p className="shadow__title">setup your account</p>
                </div>
                <div className="flex-grow input__group skills__input-group">
                    <div className="search__input mb40">
                        <span><img src="/images/new/search.png" alt="" /></span>
                        <input
                            type="text"
                            placeholder="Search for a language or add a custom one"
                            value={this.state.query}
                            onChange={e => this.setState({ query: e.target.value })}
                        />
                    </div>
                    <div className="items-added">
                        {!this.props.loading && this.getFilteredLanguages()
                            .filter(language => this.getAllowedOperation(language.name).type == "-")
                            .map(language => (
                                <div className="item-added">
                                    <p>{language.name}</p>
                                    {this.getAllowedOperation(language.name).div}
                                </div>

                            ))
                        }
                    </div>
                    <div className="list-items">
                        {!this.props.loading && this.getFilteredLanguages()
                            .filter(language => this.getAllowedOperation(language.name).type == "+")
                            .map(language => {
                                return (
                                    <React.Fragment>
                                        <div className="list-item"><p>{language.name}</p>
                                            {this.getAllowedOperation(language.name).div}
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        {
                            !this.props.loading && !this.getFilteredLanguages().length &&
                            this.createCustomLanguage()
                        }
                    </div>
                </div>

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