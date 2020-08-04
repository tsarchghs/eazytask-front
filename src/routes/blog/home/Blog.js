import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getPosts } from "../../../actions/posts";
import WebHeader from "../../../components/WebHeader";
import { compose } from "recompose";
import Footer from "../../../components/Footer";

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
                                <Link to="/">
                                    <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                                </Link>
                                <div className="header-nav-web">
                                    <Link to="/">
                                        <a href="#" className={`h4`}>
                                            Home
                                        </a>
                                    </Link>
                                </div>
                            </header>
                            <header className="logo-text xn-br hide-on-desktop">
                                <span onClick={() => {
                                    try {
                                        this.props.history.goBack();
                                    } catch (e) {
                                        this.props.history.push("/")
                                    }
                                }} className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
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
                                                <img src={post.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__} alt="" />
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
                                {!loading && !posts.length && <p className="special">No posts to show...</p>}
                            </section>
                        </div>
                    </div>
                    <Footer/>
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
export default compose(withRouter,connect(mapStateToProps, { getPosts }))(Blog);