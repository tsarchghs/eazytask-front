import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPosts } from "../../../actions/posts";

class Blog extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.props.getPosts()
    }
    render(){
        let { loading, posts } = this.props;
        return (
            <React.Fragment>
                Posts: <br/>
                { loading && "Loading..." }
                { !loading && posts.map(post => (
                    <div>
                        {
                            post.thumbnail && 
                            <img src={post.thumbnail} width="30"/>
                        }
                        <Link to={"/blog/" + post.id}>
                            { post.title } <br/>
                        </Link>
                        { post.createdAt } <br/>
                    </div>
                ))}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.allIds.map(id => state.posts.byIds[id]),
    loading: state.posts.loading
})
export default connect(mapStateToProps, { getPosts })(Blog);