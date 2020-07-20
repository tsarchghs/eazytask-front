import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMyActiveOffers } from "../../actions/app";
import MainOfferCard from "../../components/MainOfferCard";

class MyActiveOffers extends React.Component {
    componentDidMount(){
        this.props.getMyActiveOffers();
    }
    getTrans = obj => obj[this.props.app_lang]
    render(){
        let { loading, offers } = this.props;
        return (
            <div>
                {loading && this.getTrans(this.props.common.loading) }
                { !loading && offers.map(({ Task }) => (
                    <MainOfferCard task={Task} beforeTitleText={this.getTrans(this.props.translations.text_2)} />
                )) }
                {!loading && !offers.length && this.getTrans(this.props.translations.text_9)}
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
        offers,
        translations: state.app_lang.data["/dashboard"].mobile,
        app_lang: state.app_lang.app_lang,
        common: state.app_lang.common
    }
}

export default connect(mapStateToProps, { getMyActiveOffers })(MyActiveOffers);