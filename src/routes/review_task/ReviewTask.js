import React from "react";
import { withRouter } from "react-router-dom";
import Request from "../../components/Request";
import axios from "../../utils/axios";
import E404 from "../E404";

class ReviewTask extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
                reliability: undefined,
                punctuality: undefined,
                accuracy: undefined,
                quality: undefined,
                friendliness: undefined,
                cleanliness: undefined,
                comment: undefined
            },
            steps: [
                "reliability",
                "punctuality",
                "accuracy",
                "quality",
                "friendliness",
                "cleanliness",
                "comment"
            ],
            onStep: "reliability"
        }
    }
    componentDidMount(){
        
    }
    render(){
        return (
            <React.Fragment>
                <h1>Your task is done</h1>
                <Request 
                    method="GET" 
                    path={`/reviews/task/${this.props.match.params.taskId}/info`}
                    >
                    {({ loading, error, data }) => {
                        if (loading) return "Loading..."
                        if (error)  {
                            console.log(error)
                            return <E404/>
                        }
                        // let { already_reviewed, reviewer_is } = data;
                        return (
                            <React.Fragment>
                                <p>{JSON.stringify({ loading, error, data })}</p>
                            </React.Fragment>
                        )
                    }}
                </Request>
            </React.Fragment>
        )
    }
}

export default withRouter(ReviewTask);