import React from "react";
import { connect } from "react-redux";
import { getUser } from "../../actions/user";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import Loading from "../../components/loading";
import E404 from "../E404";

class Profile extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getUser(this.props.match.params.userId,{ fields: "tasker,task"});
    }
    render(){
        if (this.props.loading) return <Loading/>
        // return JSON.stringify(this.pr)
        return (
            <React.Fragment>
                Name: { this.props.user.first_name} {this.props.user.last_name[0]} <br />
                Description: { this.props.user.description} <br />
                short_biography: { this.props.user.short_biography } <br />
                {
                    this.props.user.Tasker && 
                        <select>
                            {
                                this.props.user.Tasker.Cities.map(x => (
                                    <option value={x.name}>{x.name}</option>
                                ))
                            }
                        </select>
                }<br/>
                Previous listings: <br/>
                { this.props.user.tasks.map(x => (
                    <React.Fragment>
                        Task: {x.title}
                        <br/>
                    </React.Fragment>
                ))}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let { user_id } = ownProps.match.params
    let { loading, error, ...user } = state.users.byIds[user_id] || { loading: true }
    return { loading, error, user }
}
export default compose(
    connect(mapStateToProps,{ getUser }),
    withRouter
)(Profile);