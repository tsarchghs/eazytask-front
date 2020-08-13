import React from "react";
import { Link, withRouter } from "react-router-dom";
import WebHeader from "../../components/WebHeader";
import { compose } from "recompose";
import { connect } from "react-redux";
import { times } from "lodash";

class FAQ extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allIds: ["Relative", "Tasker", "Asker" ],
            onCategory: "Relative",
            onQuestion: -1
        }
    }
    toggleQuestion = i => {
        let onQuestion;
        if (this.state.onQuestion == i) onQuestion = -1;
        else onQuestion = i
        return () => this.setState({ onQuestion })
    }
    getTrans = obj => {
        let data = obj[this.props.app_lang];
        if (typeof (data) == "string") return data;
        if (data.length) {
            return data.map(str => <React.Fragment>
                {str}<br />
            </React.Fragment>)
        }
    }
    getQuestions = () => this.props.translations.faq_categories[this.state.onCategory].questions.map((q_a, i) => {
        let selected = i == this.state.onQuestion;
        let src = selected ? "/images/up-arrow.png" : "/images/down-arrow.png"
        let className = "faq-item__content ";
        if (selected) className += "open";
        q_a = q_a[this.props.app_lang]
        return (
            <div className="faq-item open">
                <h4 onClick={this.toggleQuestion(i)} style={{ cursor: "pointer" }}>{q_a.title} <img src={src} alt="" /></h4>
                <div className={className}>
                    <p>
                        {q_a.description} <br />
                        { this.getTrans(this.props.translations.text_2)}
                        <a onClick={e => e.preventDefault()} href="#">{ this.getTrans(this.props.translations.text_3) }</a>
                    </p>
                </div>
            </div>
        )
    })
    getTabs = () => this.state.allIds.map(id => (
        <div onClick={() => this.setState({ onCategory: id, onQuestion: -1 })} className={`home__tab ${this.state.onCategory == id ? "active" : ""}`}>{
            this.props.translations.faq_categories[id][this.props.app_lang]
        }</div>
    ))
    render(){
        let questions = this.getQuestions()
        let tabs = this.getTabs()
        return (
            <div className=" edit-task__wrapper">
                <section className="landing-info panel edit-task__section">
                    <div className="container">
                        <div className="content ">
                            <header className="flex jcsb aic hide-on-mobile">
                                <Link to="/">
                                    <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                                </Link>
                                <div className="header-nav-web">
                                    <Link to="/">
                                        <a href="#" className={`h4`}>
                                            {this.getTrans(this.props.common.home)}
                                        </a>
                                    </Link>
                                </div>
                            </header>
                            <section className="faq-web hide-on-mobile">
                                <div className="faq-web__top">
                                    <h4>{this.getTrans(this.props.translations.text_1_web)} 
                                    <span> {this.getTrans(this.props.translations.text_1_1_web)}</span></h4>
                                    <div className="home__tabs" style={{ marginTop: '30px', width: '46%' }}>
                                        {tabs}
                                    </div>
                                </div>
                                <div className="faq-items">
                                    {questions}
                                </div>
                            </section>
                            <section className="profile__article--mobile qanda hide-on-web">
                                <div className=" edit-task__wrapper">
                                    <section className="landing-info panel edit-task__section">
                                        <div className="container">
                                            <div className="content ">
                                                <header className="flex jcsb aic" />
                                                <section className="home faq-mobile">
                                                    <div className="home__title">
                                                        <span className="show__mobile">
                                                            <img onClick={this.props.goBack} src="/images/arrow.jpeg" />
                                                            <div className="flex jcsb aic" style={{ width: '100%', marginRight: 0 }}>
                                                                <h3>{this.getTrans(this.props.translations.text_1_mobile)}
                                                                    {/* <br /> 
                                                                    <span>More</span> */}
                                                                </h3>			
                                                                <img src="/images/question_.png" alt="" style={{ width: '50px' }} />
                                                            </div>
                                                        </span></div>
                                                </section>
                                                <div className="home__tabs" style={{ marginTop: '20px' }}>
                                                    {tabs}
                                                </div>
                                                <div className="pb50 faq-items">
                                                    {questions}
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    translations: state.app_lang.data["/faq"],
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})

export default compose(withRouter,connect(mapStateToProps))(FAQ);