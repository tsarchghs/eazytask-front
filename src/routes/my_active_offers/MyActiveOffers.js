import React from "react";
import { connect } from "react-redux";
import { getMyActiveOffers } from "../../actions/app";
import { Link } from "react-router-dom";

class MyActiveOffers extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getMyActiveOffers();
    }
    showOffers(){
        return this.props.offers.map(({Task}) => (
            <Link to={`/task/${Task.id}/edit`}>
                <div className="offers-image active">
                    <img src="/images/ustah.jpeg" alt="" />
                    <div>
                        <h4>{Task.title}</h4>
                        <p>{new Date(Task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
                    </div>
                </div>
            </Link>
        ))
    }
    render(){
        let offers = this.showOffers();
        return (
            <div className="wrapper">
                <section className="landing-info panel edit-task__section">
                    <div className="container">
                        <div className="content">
                            <header className="flex jcsb aic">
                                <Link to="/">
                                    <img className="logo__img" src="/images/logo.svg" alt="" />
                                </Link>
                            </header>
                            <div className="background-title mb5">
                                <h3>My active</h3>
                                <h4>offers</h4>
                            </div>
                            {this.props.loading && "Loading"}
                            {!this.props.loading &&
                                <section className="tasker-profile">
                                    <div className="offers-images__layout">
                                        <div className="offers-images">
                                            {offers}
                                            {!offers.length && "No offers to show"}
                                        </div>
                                    </div>
                                </section>
                            }
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let offers = state.app.myActiveOffers.ids.map(
        x => state.offers.byIds[x]
    )
    let { loading } = state.app.myActiveOffers;
    console.log({ loading, offers },"{ loading, offers }")
    return { loading, offers }
}

export default connect(mapStateToProps, { getMyActiveOffers })(MyActiveOffers);