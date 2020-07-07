import React from "react";
import { Link } from "react-router-dom";
import WebHeader from "../../components/WebHeader";

class FAQ extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allIds: ["Relative", "Tasker", "Asker", "Other" ],
            byIds: {
                "Relative": [
                    {
                        title: "How do you delete account?",
                        description: `You can easily delete your account by clicking Profile > Account Settings > Delete Account. Need more help about this?`
                    },
                    {
                        title: "How can you edit sent offer? ",
                        description: `You can easily delete your account by clicking Profile > Account Settings > Delete Account. Need more help about this?`
                    }
                ],
                "Tasker": [
                    {
                        title: "How do you become a tasker?",
                        description: `Become a tasker by..`
                    }
                ],
                "Asker": [
                    {
                        title: "How do you become a asker?",
                        description: `Sign up.`
                    }
                ],
                "Other": [
                    {
                        title: "How to edit profile?",
                        description: `Click on profile icon or text in menu`
                    }
                ]
            },
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
    getQuestions = () => this.state.byIds[this.state.onCategory].map((q_a, i) => {
        let selected = i == this.state.onQuestion;
        let src = selected ? "/images/up-arrow.png" : "/images/down-arrow.png"
        let className = "faq-item__content ";
        if (selected) className += "open";
        return (
            <div onClick={this.toggleQuestion(i)} className="faq-item open">
                <h4>{q_a.title} <img src={src} alt="" /></h4>
                <div className={className}>
                    <p>
                        {q_a.description} <br />
                        Need more help about this?
                        You can always contact us in:
                        <a href="#">help@eazytask.ch</a>
                    </p>
                </div>
            </div>
        )
    })
    getTabs = () => this.state.allIds.map(id => (
        <div onClick={() => this.setState({ onCategory: id, onQuestion: -1 })} className={`home__tab ${this.state.onCategory == id ? "active" : ""}`}>{id}</div>
    ))
    render(){
        let questions = this.getQuestions()
        let tabs = this.getTabs()
        return (
            <div className=" edit-task__wrapper">
                <section className="landing-info panel edit-task__section">
                    <div className="container">
                        <div className="content ">
                            <WebHeader/>
                            <section className="faq-web hide-on-mobile">
                                <div className="faq-web__top">
                                    <h4>View <span>Faq</span></h4>
                                    <div className="home__tabs" style={{ marginTop: '30px', width: '46%' }}>
                                        {tabs}
                                    </div>
                                </div>
                                <div className="faq-items">
                                    {questions}
                                    {/* <div className="faq-item">
                                        <h4>How can you edit sent offer? <img src="/images/down-arrow.png" alt="" /></h4>
                                        <div className="faq-item__content open">
                                            <p>You can easily delete your account by clicking
                                            Profile &gt; Account Settings &gt; Delete Account.
                                            Need more help about this?
                                            You can always contact us in:
                        <a href="#">help@eazytask.ch</a></p>
                                        </div>
                                    </div>
                                    <div className="faq-item">
                                        <h4>Can I chat with a tasker? <img src="/images/down-arrow.png" alt="" /></h4>
                                        <div className="faq-item__content">
                                            <p>You can easily delete your account by clicking
                                            Profile &gt; Account Settings &gt; Delete Account.
                                            Need more help about this?
                                            You can always contact us in:
                        <a href="#">help@eazytask.ch</a></p>
                                        </div>
                                    </div> */}
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
                                                            <Link to="/dashboard?tab=more">
                                                                <img src="/images/arrow.jpeg" />
                                                            </Link>
                                                            <div className="flex jcsb aic" style={{ width: '100%', marginRight: 0 }}>
                                                                <h3>Explore <br /> 
                                                                <span>More</span></h3>			
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
export default FAQ;