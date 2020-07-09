import React from "react";

class TaskerProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            onTab: "PREVIOUS_LISTINGS"
        }
    }
    getPreviousListings = () => this.props.user.tasks.filter(task => new Date(task.due_date).getTime() < new Date().getTime())
    tabOnClick = onTab => () => this.setState({ onTab })
    getAboutUI = () => (
        <div style={{ display: "inline-flex" }}>
            <div style={{marginLeft: 10}}>
                Skills: {this.props.user.Tasker.Skills.map(skill => skill.name).join(",")}
            </div>
            <div style={{marginLeft: 10}}>
                Languages: {this.props.user.Tasker.Languages.map(language => language.name).join(",")}
            </div>
            <div style={{marginLeft: 10}}>
                Cities: {this.props.user.Tasker.Cities.map(city => city.name).join(",")}
            </div>
        </div>
    )
    render() {
        let tabOnClick = this.tabOnClick
        return (
            <React.Fragment>
                Pic: <img src={this.props.user.profile_image || window.__PROFILE_DEFAULT_PICTURE__} alt="" /><br/>
                Name: {this.props.user.first_name} {this.props.user.last_name[0]}.<br/>
                Bio: <p className="special">{this.props.user.short_biography || "No short biography"}</p><br/>

                <div style={{display: "inline-flex"}}>
                    <div onClick={tabOnClick("PREVIOUS_LISTINGS")}>Previous listings</div>
                    <div onClick={tabOnClick("RATINGS")}>Ratings</div>
                    <div onClick={tabOnClick("ABOUT")}>About</div>
                </div><br/>
                { this.state.onTab == "PREVIOUS_LISTINGS" && JSON.stringify(this.getPreviousListings()) }
                { this.state.onTab == "RATINGS" && "Not for the current scope" }
                { this.state.onTab == "ABOUT" && this.getAboutUI() }
            </React.Fragment>
        )
    }
}
export default TaskerProfile;