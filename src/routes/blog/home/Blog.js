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

            <div className=" edit-task__wrapper">
                <section className="landing-info panel edit-task__section">
                    <div className="container">
                        <div className="content ">
                            <header className="flex jcsb aic hide-on-mobile">
                                <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                                <div className="header-nav-web">
                                    <a href="#" className="h4 active">Home <div /></a>
                                    <Link to="/create-task">
                                        <a href="#" className="h4">New Task</a>
                                    </Link>
                                    <Link to="/my_profile_edit">
                                        <a href="#" className="h4">Profile</a>
                                    </Link>
                                </div>
                            </header>
                            <header className="logo-text xn-br hide-on-desktop">
                                <Link to="/dashboard?tab=more">
                                    <span className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                                </Link>
                                <h4 className="logo-title ">
                                    Read Our <br /> <span>Blog</span>
                                </h4>
                            </header>
                            <div className="blog-title hide-on-mobile">
                                <div>
                                    <h4>Read our Blog</h4>
                                    <h3>Get inspired by reading our latest articles on our blog</h3>
                                </div>
                                <a href="#">Read All</a>
                            </div>
                            <section className="blog-cards">
                                {loading && "Loading..."}
                                {!loading && posts.map(post => (
                                    <div className="blog-card">
                                        <Link to={"/blog/" + post.id}>
                                            <div className="blog-card__img">
                                                <img src={post.thumbnail} alt="" />
                                            </div>
                                        </Link>
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
                                ))}
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        )
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