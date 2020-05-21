import React from "react";
import { connect } from "react-redux";
import { getCities } from "../../actions/city";
import ItemList from "./ItemList.view";
import { filter } from "../../utils/search";
import { getCustomItems } from "./utils";

class MyCities extends React.Component {
    constructor(props){
        super(props);
        this.state = { query: "" }
    }
    componentDidMount() {
        this.props.getCities()
    }
    getFilteredCities = () => {
        let cities = this.props.allIds.map(id => this.props.byIds[id])
        let customCities = getCustomItems(this.props.cities, cities)
        let combined = customCities.concat(cities);
        return filter(this.state.query, combined)
    }
    customAddCity = city_name => () => {
        this.props.addCity(city_name)
        if (this.state.query === city_name) this.resetQuery()
    }
    getAllowedOperation = city_name => {
        let alreadyExists = this.props.cities.indexOf(city_name) !== -1
        if (alreadyExists) return <div onClick={() => this.props.removeCity(city_name)}>-</div>
        else return <div onClick={this.customAddCity(city_name)}>+</div>
    }
    resetQuery = () => this.setState({ query: "" })
    createCustomCity = () => (
        <React.Fragment>
            <li>Create "{this.state.query}"</li>
            {this.getAllowedOperation(this.state.query)}
        </React.Fragment>
    )
    render() {
        return (
            <React.Fragment>
                Area of activity
                <input
                    type="text"
                    value={this.state.query}
                    onChange={e => this.setState({ query: e.target.value })}
                    placeholder="Search city..."
                />
                <ItemList items={this.props.cities} />
                <ul>
                    {this.props.loading && "Loading"}
                    {!this.props.loading && this.getFilteredCities().map(city => {
                        return (
                            <React.Fragment>
                                <li key={city.id}>{city.name}</li>
                                {this.getAllowedOperation(city.name)}
                            </React.Fragment>
                        )
                    })}
                    {
                        !this.props.loading && !this.getFilteredCities().length &&
                        this.createCustomCity()
                    }
                </ul>
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