import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMyActiveOffers } from "../../actions/app";

class MyActiveOffers extends React.Component {
    componentDidMount(){
        this.props.getMyActiveOffers();
    }
    render(){
        let { loading, offers } = this.props;
        return (
            <div>
                { loading &&  "Loading" }
                { !loading && offers.map(({ Task }) => (
                    <Link to={`/task/${Task.id}/edit`}>
                        <div className="home__card" style={{ backgroundImage: `url("${Task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__}")` }}>
                            <div className="home__card--mask" />
                            <h5>View “{Task.title}”</h5>
                            <p>{new Date(Task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
                        </div>
                    </Link>
                )) }
                { !loading && !offers.length && "No offers to show"}
            </div>

        )
    }
}

const mapStateToProps = state => {
    let offers = state.app.myActiveOffers.ids.map(
        x => state.offers.byIds[x]
    )
    return {
        loading: state.app.myActiveOffers.loading,
        offers
    }
}

export default connect(mapStateToProps, { getMyActiveOffers })(MyActiveOffers);