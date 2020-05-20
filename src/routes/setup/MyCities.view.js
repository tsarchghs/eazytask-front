import React from "react";
import { connect } from "react-redux";
import { getCities } from "../../actions/city";
import ItemList from "./ItemList.view";

class MyCities extends React.Component {
    componentDidMount() {
        this.props.getCities()
    }
    getCities = () => {
        return this.props.allIds.map(id => this.props.byIds[id])
    }
    getAllowedOperation = city_name => {
        let alreadyExists = this.props.cities.indexOf(city_name) !== -1
        if (alreadyExists) return <div onClick={() => this.props.removeCity(city_name)}>-</div>
        else return <div onClick={() => this.props.addCity(city_name)}>+</div>
    }
    render() {
        console.log("ADSADS")
        return (
            <React.Fragment>
                Area of activity
                <input type="text" value="" placeholder="Search cities..." />
                <ItemList items={this.props.cities} />
                <ul>
                    {this.props.loading && "Loading"}
                    {!this.props.loading && this.getCities().map(city => {
                        return (
                            <React.Fragment>
                                <li key={city.id}>{city.name}</li>
                                {this.getAllowedOperation(city.name)}
                            </React.Fragment>
                        )
                    })}
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