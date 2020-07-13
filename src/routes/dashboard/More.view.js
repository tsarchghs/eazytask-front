import React from "react";
import { withRouter } from "react-router-dom";

class More extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="more__cards--content">
                <div onClick={() => this.props.history.push("/blog")} className="more__card">
                    <img src="/images/news_.png" alt="" />
                    <div>
                        <h4>Blog</h4>
                        <p>Read our <br /> latest Blog</p>
                    </div>
                </div>
                <div onClick={() => this.props.history.push("/history")} className="more__card">
                    <img src="/images/clock_.png" alt="" />
                    <div>
                        <h4>History</h4>
                        <p>View history of <br />your activity</p>
                    </div>
                </div>
                <div onClick={() => this.props.history.push("/landing_page")} className="more__card">
                    <img src="/images/landing_.png" alt="" />
                    <div>
                        <h4>Landing</h4>
                        <p>View <br />landing page</p>
                    </div>
                </div>
                <div onClick={() => this.props.history.push("/faq")} className="more__card">
                    <img src="/images/question_.png" alt="" />
                    <div>
                        <h4>Faq</h4>
                        <p>Discover <br />Frequently Asked <br />Questions</p>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(More);