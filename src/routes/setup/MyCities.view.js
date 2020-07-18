import React from "react";
import { connect } from "react-redux";
import { getCities } from "../../actions/city";
import ItemList from "./ItemList.view";
import { filter } from "../../utils/search";
import { getCustomItems } from "./utils";

class MyCities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ""
        }
    }
    componentDidMount() {
        this.props.getCities()
        this.searchRef.focus()
    }
    getFilteredCities = () => {
        let cities = this.props.allIds.map(id => this.props.byIds[id])
        let customCities = getCustomItems(this.props.cities, cities)
        let combined = customCities.concat(cities);
        return filter(this.state.query, combined)
    }
    resetQuery = () => this.setState({ query: "" })
    customAddCity = city_name => () => {
        this.props.addCity(city_name)
        if (this.state.query === city_name) this.resetQuery()
    }
    getAllowedOperation = city_name => {
        let alreadyExists = this.props.cities.indexOf(city_name) !== -1
        if (alreadyExists) {
            let div = <span onClick={() => this.props.removeCity(city_name)}>-</span>
            return { type: "-", div }
        }
        else {
            let div = <span onClick={this.customAddCity(city_name)}>+</span>
            return { type: "+", div }
        }
    }
    createCustomCity = () => (
        <React.Fragment>
            <div className="list-item"><p>Create "{this.state.query}"</p>
                {this.getAllowedOperation(this.state.query).div}
            </div>
        </React.Fragment>
    )
    searchOnKeyDown = e => {
        let skills = this.getFilteredCities();
        if (!skills.length) {
            if (e.key === "Enter") {
                this.customAddCity(this.state.query)();
            }
        }
    }
    render() {
        console.log({ props: this.props })
        return (
            <React.Fragment>
                <div className="background-title mb5">
                    <h1>{this.props.getTrans(this.props.translations.text_28)}</h1>
                    <p className="shadow__title">setup your account</p>
                </div>
                <div className="flex-grow input__group skills__input-group">
                    <div className="search__input mb40">
                        <span><img src="/images/new/search.png" alt="" /></span>
                        <input
                            type="text"
                            ref={ref => this.searchRef = ref}
                            placeholder={this.props.getTrans(this.props.translations.text_29)}
                            value={this.state.query}
                            onChange={e => this.setState({ query: e.target.value })}
                            onKeyDown={this.searchOnKeyDown}
                        />
                    </div>
                    <div className="items-added">
                        {!this.props.loading && this.getFilteredCities()
                            .filter(city => this.getAllowedOperation(city.name).type == "-")
                            .map(city => (
                                <div className="item-added">
                                    <p>{city.name}</p>
                                    {this.getAllowedOperation(city.name).div}
                                </div>

                            ))
                        }
                    </div>
                    <div className="list-items">
                        {!this.props.loading && this.getFilteredCities()
                            .filter(city => this.getAllowedOperation(city.name).type == "+")
                            .map(city => {
                                return (
                                    <React.Fragment>
                                        <div className="list-item"><p>{city.name}</p>
                                            {this.getAllowedOperation(city.name).div}
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        {
                            !this.props.loading && !this.getFilteredCities().length && this.state.query &&
                            this.createCustomCity()
                        }
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    byIds: state.cities.byIds,
    allIds: state.cities.allIds,
    loading: state.cities.loading
})

export default connect(mapStateToProps, { getCities })(MyCities);