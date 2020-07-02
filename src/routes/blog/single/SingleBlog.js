import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../../actions/posts";

class SingleBlog extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        let { postId } = this.props.match.params;
        this.props.getPost(postId);
    }
    render(){
        let { loading, post, error } = this.props;
        if (loading) return "Loading..";
        if (error) return "Error...";
        return (
            <React.Fragment>
                { post.title }
                <div dangerouslySetInnerHTML={{__html: post.content }}/>
                { post.createdAt }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let { postId } = ownProps.match.params;
    let { loading, error, ...post } = state.posts.byIds[postId] || { loading: true };
    return { loading, error, post }
}

export default connect(mapStateToProps, { getPost })(SingleBlog);