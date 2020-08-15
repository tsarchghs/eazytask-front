import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";


class More extends React.Component {
    constructor(props){
        super(props);
    }
    getTrans = obj => obj[this.props.app_lang]
    render(){
        return (
            <div className="more__cards--content">
                <div onClick={() => this.props.history.push("/blog")} className="more__card">
                    <img src="/images/news_.png" alt="" />
                    <div>
                        <h4>{this.getTrans(this.props.translations.text_10)}</h4>
                        <p>{this.getTrans(this.props.translations.text_11)} <br /> {this.getTrans(this.props.translations.text_12)}</p>
                    </div>
                </div>
                <div onClick={() => this.props.history.push("/history")} className="more__card">
                    <img src="/images/clock_.png" alt="" />
                    <div>
                        <h4>{this.getTrans(this.props.translations.text_13)}</h4>
                        <p>{this.getTrans(this.props.translations.text_14)} <br />{this.getTrans(this.props.translations.text_15)}</p>
                    </div>
                </div>
                <div onClick={() => this.props.history.push("/landing_page")} className="more__card">
                    <img src="/images/landing_.png" alt="" />
                    <div>
                        <h4>{this.getTrans(this.props.translations.text_16)}</h4>
                        <p>{this.getTrans(this.props.translations.text_17)} <br />{this.getTrans(this.props.translations.text_18)}</p>
                    </div>
                </div>
                <div onClick={() => this.props.history.push("/faq")} className="more__card">
                    <img src="/images/question_.png" alt="" />
                    <div>
                        <h4>{this.getTrans(this.props.translations.text_19)}</h4>
                        <p>{this.getTrans(this.props.translations.text_21)} 
                        <br />{this.getTrans(this.props.translations.text_22)}</p>
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        translations: state.app_lang.data["/dashboard"].mobile,
        app_lang: state.app_lang.app_lang,
        common: state.app_lang.common
    }
}

export default compose(withRouter,connect(mapStateToProps))(More);