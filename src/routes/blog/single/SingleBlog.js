import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../../actions/posts";
import E404 from "../../E404";

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
        if (!Object.keys(post).length) return <E404/>
        console.log("POSTPOST",post)
        return (
            <div className=" edit-task__wrapper">
                <section className="landing-info panel edit-task__section">
                    <div className="container">
                        <div className="content ">
                            <header className="logo-text">
                                <div onClick={() => {
                                    try {
                                        this.props.history.goBack();
                                    } catch (e) {
                                        this.props.history.push("/")
                                    }
                                }}>
                                    <span className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                                    <h4 className="hide-on-desktop logo-title ">
                                        <span className="arraw hide-on-mobile"><img src="/images/arrow.jpeg" alt="" /></span>Blogs
                                    </h4>
                                </div>
                            </header>
                            <section className="blog-cards bg-inside">
                                <div className="blog-card " style={{ width: "100%", wordBreak: "break-all" }}>
                                    <div className="blog-card__img">
                                        <img src={post.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__} alt="" />
                                    </div>
                                    <div className="blog-card__date">
                                        <p>{new Date(post.createdAt).toLocaleDateString().replace(/\//g, ".")}</p>
                                    </div>
                                    <div className="blog-card__title">
                                        <h4>{post.title}</h4>
                                    </div>
                                    <div className="blog-card__article">
                                        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </div>

        )
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