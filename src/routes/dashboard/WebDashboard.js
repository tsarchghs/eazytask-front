import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import queryString from "query-string";
import { getMyActiveOffers, getActiveListing2 } from "../../actions/app";
import { getPosts } from "../../actions/posts";
import { getMyActiveTasks } from "../../actions/app";
import WebHeader from "../../components/WebHeader";

class WebDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onTab: "my_tasks"
        }
    }
    componentDidMount(){
        this.props.getMyActiveOffers({ limit: 4, offset: 0 });
        this.props.getMyActiveTasks({ limit: 4, offset: 0 });
        this.props.getPosts()
        this.props.getActiveListing2({
            limit: 4,
            offset: 0
        });
    }
    getActiveTasks = () => {
        let translations = this.props.translations;
        if (this.props.myActiveTasks_info.loading) return this.getTrans(this.props.common.loading)
        if (!this.props.myActiveTasks_info.tasks.length) return (
            <div className="home__card--lonely" style={{width:"60%", margin: "0 auto"}}>
                <h4>{this.getTrans(translations.text_5)}</h4>
                <p>{this.getTrans(translations.text_6)}</p>
                <img src="/images/super_man.png" alt="" style={{ width: '35%' }} />
                <img src="/images/lonely.jpeg" alt="" />
            </div>

        )
        return (
            <div className="home__card--content">
            {
                    this.props.myActiveTasks_info.tasks.map(task => (
                        <div onClick={() => this.props.history.push("/task/" + task.id)} className="home__card" style={{ backgroundImage: `url("${task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__}")` }}>
                            <div className="home__card--mask" />
                            <h5 style={{ textAlign: "center" }}>{this.getTrans(this.props.translations.text_2)} “{task.title}”</h5>
                            <p>{new Date(task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
                        </div>
                    ))
            }
            </div>
        )
    }
    getOffers = () => {
        if (this.props.offers_info.loading) return this.getTrans(this.props.common.loading)
        if (!this.props.offers_info.offers.length) return this.getTrans(this.props.translations.text_25)
        return (
            <div className="home__card--content">
                {
                    this.props.offers_info.offers.map(({ Task }) => (
                        <div className="home__card" style={{ backgroundImage: `url("${Task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__}")` }}>
                            <div className="home__card--mask" />
                            <h5>{this.getTrans(this.props.translations.text_2)} “{Task.title}”</h5>
                            <p>{new Date(Task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
                        </div>
                    ))
                }
            </div>
        )
    }
    getTrans = obj => obj[this.props.app_lang]
    render(){
        let translations = this.props.translations;
        return (
            <React.Fragment>
                <div className=" edit-task__wrapper">
                    <section className="home-web landing-info panel edit-task__section">
                        <div className="container">
                            <div className="content pb50">
                                <section className="home-web hide-on-mobile">
                                    <div className="container">
                                        <div className="content">
                                            <WebHeader active="home"/>
                                            <div className="hero flex jcsb" style={{ height: 'calc(100vh - 165px)', paddingTop: 80 }}>
                                                <div className="home">
                                                    <div className="home__title">
                                                        <h3>{this.getTrans(translations.text_1)}, <br /> <span>{this.props.own_profile.first_name}!</span></h3>
                                                    </div>
                                                    <div className="home__cards">
                                                        <div className="home__card gradient">
                                                            <h5>{this.getTrans(translations.text_2)} “Yard Work” <br /><span>{this.getTrans(translations.text_3)}</span></h5>
                                                            <img src="/images/succ.png" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hero-home__cards">
                                                    <div className="home__tabs" style={{ justifyContent: 'initial' }}>
                                                        <div onClick={() => this.setState({ onTab: "my_tasks"})} className={`home__tab ${this.state.onTab == "my_tasks" && "active"}`}>
                                                            {this.getTrans(translations.text_4)}
                                                        </div>
                                                        {
                                                            this.props.own_profile.Tasker && 
                                                            <div onClick={() => this.setState({ onTab: "offers" })} className={`home__tab ${this.state.onTab == "offers" && "active"}`}>{this.getTrans(translations.text_26)}</div>
                                                        }
                                                    </div>
                                                    {
                                                        this.state.onTab == "my_tasks" && this.getActiveTasks()
                                                    }
                                                    {
                                                        this.state.onTab == "offers" && this.getOffers()
                                                    }
                                                </div>
                                            </div>
                                            <section className="profile__cover " style={{ height: '100vh' }}>
                                                <div className="two-column__info flex flex-column">
                                                    <div className=" flex jcsb aic w100">
                                                        <div className="background-title mb5 flex1">
                                                            <h3>{this.getTrans(translations.text_7)}</h3>
                                                            <h4>{this.getTrans(translations.text_8)}</h4>
                                                            <p className="shadow__title hide__mobile">{this.getTrans(translations.text_23)}</p>
                                                            <p className="shadow__title show__mobile">COMMERCIAL</p>
                                                        </div>
                                                        <Link to="/active_listing">
                                                            <h4>{this.getTrans(translations.text_9)}</h4>
                                                        </Link>
                                                    </div>
                                                    <div className="listing-cards ">
                                                        { this.props.activeListing2_info.loading && "Loading.." }
                                                        {
                                                            !this.props.activeListing2_info.loading && !this.props.activeListing2_info.tasks.length 
                                                            && this.getTrans(translations.text_27)
                                                        }
                                                        {
                                                            !this.props.activeListing2_info.loading &&
                                                            this.props.activeListing2_info.tasks.map(task => (
                                                                <div className="listing-card">
                                                                    <Link to={"/task/" + task.id}>
                                                                        <div className="listing-card__img">
                                                                            <div className="lc-img" style={{
                                                                                backgroundImage:
                                                                                    task.thumbnail ? `url("${task.thumbnail}")` : 'url("/images/ustah.jpeg")'
                                                                            }}
                                                                            />
                                                                            <div className="listing-card__img--mask" />
                                                                        </div>
                                                                        <div className="listing-card__info">
                                                                            <h3>{task.title}</h3>
                                                                            <h5>{task.User.first_name} {task.User.last_name[0]}</h5>
                                                                        </div>
                                                                        <div className="listing-card__hover flex aic">
                                                                            <div>
                                                                                <h5>{task.city || "-"}</h5>
                                                                                <h5>{task.due_date ? new Date(task.due_date).toLocaleDateString() : "-"}</h5>
                                                                            </div>
                                                                            <div>
                                                                                <h5>{task.Category.name}</h5>
                                                                                <h5>CHF {task.expected_price}.-</h5>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            ))
                                                        }
                                                        {/* <div className="listing-card">
                                                            <div className="listing-card__img">
                                                                <div className="lc-img" style={{ backgroundImage: 'url("/images/ustah.jpeg")' }} />
                                                                <div className="listing-card__img--mask" />
                                                            </div>
                                                            <div className="listing-card__info">
                                                                <h3>Yard Work</h3>
                                                                <h5>Oven Thompson</h5>
                                                            </div>
                                                            <div className="listing-card__hover flex aic">
                                                                <div>
                                                                    <h5>Bern</h5>
                                                                    <h5>23/05/2020</h5>
                                                                </div>
                                                                <div>
                                                                    <h5>Household</h5>
                                                                    <h5>CHF 75.-</h5>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                                <div className="filters-card">
                                                    <h4 className="mb15">Filter</h4>
                                                    <label htmlFor className="mb25">
                                                        <span><img src="/images/search.png" alt="" /></span>
                                                        <input type="text" placeholder="Search for task" className="search" />
                                                    </label>
                                                    <div className="filters-lists">
                                                        <div className="filters-list">
                                                            {/* <input type="text" class="filter-input" placeholder="Category"> */}
                                                            <div className="filter-input filter-slide"><p>Category</p><span><img src="/images/arr-right.png" alt="" /></span></div>
                                                        </div>
                                                        <div className="filters-list">
                                                            <input type="text" className="filter-input" placeholder="Town" />
                                                        </div>
                                                        <div className="filters-list">
                                                            <input type="text" className="filter-input" placeholder="Due date" />
                                                        </div>
                                                        <div className="filters-list">
                                                            <input type="text" className="filter-input" placeholder="Budget" />
                                                        </div>
                                                    </div>
                                                    <div className="filters-card__extra">
                                                        <h4 className="mb25 flex aic remove-extra"><img style={{ transform: 'rotate(180deg)', width: '20px', marginRight: '15px' }} src="/images/arr-right.png" alt="" /> Type</h4>
                                                        <div className="filters-list">
                                                            <div className="filter-input filter-slide"><span><img src="/images/arr-right.png" alt="" /></span><p>Category</p></div>
                                                        </div>
                                                        <div className="filters-list">
                                                            <div className="filter-input filter-slide"><span><img src="/images/arr-right.png" alt="" /></span><p>Category</p></div>
                                                        </div>
                                                        <div className="filters-list">
                                                            <div className="filter-input filter-slide"><span><img src="/images/arr-right.png" alt="" /></span><p>Category</p></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <section className="profile__cover " style={{ height: '80vh' }}>
                                                <div className="two-column__info flex flex-column">
                                                    <div className=" flex jcsb aic w100">
                                                        <div className="background-title mb5 flex1">
                                                            <h3>{this.getTrans(translations.text_10)}</h3>
                                                            <h4>{this.getTrans(translations.text_24)}</h4>
                                                            <p className="shadow__title hide__mobile">{this.getTrans(translations.text_24)}</p>
                                                            <p className="shadow__title show__mobile">COMMERCIAL</p>
                                                        </div>
                                                        <Link to="/blog">
                                                            <h4>{this.getTrans(translations.text_9)}</h4>
                                                        </Link>
                                                    </div>
                                                    <section className="blog-cards" style={{ marginTop: '50px' }}>
                                                        { this.props.posts_info.loading && "Loading" }
                                                        { !this.props.posts_info.loading && !this.props.posts_info.posts.length && "No posts to show..." }
                                                        {!this.props.posts_info.loading && this.props.posts_info.posts.map(post => (
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
                                                                    <p dangerouslySetInnerHTML={{__html: post.content }}></p>
                                                                </div>
                                                            </div>

                                                        ))}
                                                    </section>
                                                </div>
                                            </section>
                                            <section className="profile__cover web-more">
                                                <div className="two-column__info flex flex-column">
                                                    <div className=" flex jcsb aic w100">
                                                        <div className="background-title mb5 flex1">
                                                            <h3>{this.getTrans(translations.text_12)}</h3>
                                                            <p className="shadow__title hide__mobile">{this.getTrans(translations.text_23)}</p>
                                                            <p className="shadow__title show__mobile">COMMERCIAL</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="more__cards--content">
                                                    <Link to="/history">
                                                        <div className="more__card">
                                                            <img src="/images/clock_.png" alt="" />
                                                            <div>
                                                                <h4>{this.getTrans(translations.text_13)}</h4>
                                                                <p>{this.getTrans(translations.text_14)} <br />{this.getTrans(translations.text_15)}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link to="/landing_page">
                                                        <div className="more__card">
                                                            <img src="/images/landing_.png" alt="" />
                                                            <div>
                                                                <h4>{this.getTrans(translations.text_16)}</h4>
                                                                <p>{this.getTrans(translations.text_17)} <br />{this.getTrans(translations.text_18)}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link to="/faq">
                                                        <div className="more__card">
                                                            <img src="/images/question_.png" alt="" />
                                                            <div>
                                                                <h4>{this.getTrans(translations.text_19)}</h4>
                                                                <p>{this.getTrans(translations.text_20)} <br />{this.getTrans(translations.text_21)} <br />{this.getTrans(translations.text_22)}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                </div>

                {/* {JSON.stringify(this.props)} */}
            </React.Fragment>

        )
    }
}


const mapStateToProps = state => {
    let tasks = state.app.myActiveTasks.ids.map(
        x => state.tasks.byIds[x]
    )
    let offers = state.app.myActiveOffers.ids.map(
        x => state.offers.byIds[x]
    )
    return {
        offers_info: {
            loading: state.app.myActiveOffers.loading,
            offers
        },
        myActiveTasks_info: {
            loading: state.app.myActiveTasks.loading, 
            tasks: state.app.myActiveTasks.ids.map(
                x => state.tasks.byIds[x]
            ), 
            tasks_count: state.tasks.tasks_count, 
            currentUserId: state.auth.profile.id 
        },
        activeListing2_info: {
            tasks: state.app.activeListing2.ids.map(
                x => state.tasks.byIds[x]
            ),
            loading: state.app.activeListing2.loading
        },
        posts_info: {
            posts: state.posts.allIds.map(id => state.posts.byIds[id]),
            loading: state.posts.loading
        },
        own_profile: state.auth.profile,
        translations: state.app_lang.data["/dashboard"].web,
        app_lang: state.app_lang.app_lang,
        common: state.app_lang.common
    }
}
export default compose(withRouter, connect(mapStateToProps, { getMyActiveTasks, getMyActiveOffers, getActiveListing2, getPosts }))(WebDashboard);