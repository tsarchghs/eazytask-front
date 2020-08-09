import React from "react";
import { connect } from "react-redux";
import { getActiveListing2 } from "../../actions/app";
import { getTasksCount } from "../../actions/task";
import { getCategories } from "../../actions/categories";
import { Link, withRouter } from "react-router-dom";
import ReactSlider from 'react-slider'
import { compose, componentFromStream } from "recompose";
import queryString from  'query-string';
import { debounce } from "lodash";
import MainTaskCard from "../../components/MainTaskCard";
import Footer from "../../components/Footer";

class ActiveListing extends React.Component {
    constructor(props) {
        super(props);
        let state = {
            limit: 6,
            offset: 0,
            currentPage: Number(queryString.parse(this.props.location.search).page) || 1,
            filters: {
                category_id: undefined,
                min_expected_price: 0,
                max_expected_price: 1000,
                city: ""
            },
            onFilter: "",
            allCategories: [],
        }
        props.translations.categories.map((category, category_id) => {
            state.allCategories = state.allCategories.concat(category.sub_categories.map((sub_category, id) => {
                return {
                    id,
                    category_id,
                    categoryShowName: this.getTrans(category),
                    name: sub_category.en,
                    img_url: sub_category.img_url,
                    show: this.getTrans(sub_category)
                }
            }))
        })
        this.state = state;
    }
    getTrans = obj => {
        let data = obj[this.props.app_lang];
        if (typeof (data) == "string") return data;
        if (data.length) {
            return data.map(str => <React.Fragment>
                {str}<br />
            </React.Fragment>)
        }
    }
    componentDidMount() {
        this.updateTasks(this.state.currentPage)
        this.props.getTasksCount()
        this.props.getCategories()
    }
    componentDidUpdate(prevProps){
        if (this.props.location.search !== prevProps.location.search) {
            this.setState({
                currentPage: Number(queryString.parse(this.props.location.search).page) || 1
            }, () => {
                this.updateTasks(this.state.currentPage)
            })
        }
    }
    updateTasks = (x, filters={}) => {
        this.setState({ currentPage: Number(x) })
        this.props.getActiveListing2({
            limit: this.state.limit,
            offset: this.state.currentPage * this.state.limit - 6,
            ...filters
        });
        this.props.getTasksCount(this.state.filters)
    }
    showTasks = () =>  {
        return this.props.tasks.map(task => (
            <Link to={`/task/${task.id}`}>
                <li key={task.id}>{task.title}</li>
            </Link>
        ))
    }
    onFilterChange = (key,debounce_val = 0) => e => {
        console.log("this.onFilterChange")
        if (e.persist) e.persist()
        this.setState(prevState => {
            console.log(e)
            if (key == "expire_soon") prevState.filters[key] = e.target.checked;
            else prevState.filters[key] = e.target.value;
            return prevState;
        }, debounce(
            () => this.updateTasks(this.state.currentPage, this.state.filters),
            debounce_val
        ))
    } 
    getAllPagesNumber = () => Math.floor(this.props.tasks_count.count / this.state.limit) 
    getToggleFilterFunc = () => {
        if (!this.state.onFilter) return () => this.setState({ onFilter: "MAIN" })
        else return () => this.setState({ onFilter: "" })
    }
    render() {
        let loading = this.props.loading || this.props.tasks_count.loading
        const Pages = () => {
            let pagesNumber = this.getAllPagesNumber()

            let content = []
            console.log("this.state.currentPage", this.state.currentPage,pagesNumber)
            let end = pagesNumber >= this.state.currentPage + 2 ? this.state.currentPage + 2 : pagesNumber
            let start = this.state.currentPage - 2 >= 1 ? this.state.currentPage - 2 : 1 
            if (this.state.currentPage - 2 < 1) end += -(this.state.currentPage - 2)
            console.log("this.state.currentPage -2 ", this.state.currentPage-2)
            for (let x = 0; x <= pagesNumber;x++){
                content.push(<Link style={{ color: "#1f4733", minWidth: 22, marginRight: 7, fontSize: 20 }} to={`/active_listing?page=${x}`}><div>{x + 1}&nbsp;&nbsp;&nbsp;</div></Link>)
            }
            return content;
        }
        console.log({body: this.state},"DASDAASD")
        let show_category_name_or_default;
        let { category_id } = this.state.filters
        if (category_id !== undefined){
            if (!this.props.categories.loading) 
                show_category_name_or_default = this.state.allCategories.find(x => x.id == category_id).show
        }
        if (!show_category_name_or_default) show_category_name_or_default = "Categories"
        return (
            <React.Fragment>
                <section className="landing-info panel card-section" id="c" style={{ background: 'white' }}>
                    <div className="container">
                        <div className="content">
                            <header className="flex jcsb aic">
                                <Link to="/">
                                    <img className="logo__img" src="/images/logo.svg" alt="" />
                                </Link>
                                <Link to="/register">
                                    <a href="#" className="h4">{this.props.own_profile ? "Home" : "Join us"}</a>
                                </Link>
                            </header>
                            <section className="profile__cover">
                                <div className="two-column__info flex flex-column">
                                    <div className=" flex jcsb aic w100">
                                        <div className="background-title mb5 flex1">
                                            <h3>{this.getTrans(this.props.active_listing_translations.text_1)}</h3>
                                            <h4>{this.getTrans(this.props.active_listing_translations.text_2)}</h4>
                                            <p className="shadow__title hide__mobile">some active listings on eazytask</p>
                                            <p className="shadow__title show__mobile">COMMERCIAL</p>
                                        </div>
                                        {/* <button style={{ cursor: "pointer" }} onClick={debounce(this.getToggleFilterFunc(), 10)}>
                                        <img style={{ width: 25 }} src="/images/tools-and-utensils.png"/></button> */}
                                        <br />
                                    </div>
                                    <div className={"listing-cards flex aic jcsb" + (this.state.detailed ? "col-cards" : "")}>
                                        {loading && "Loading"}
                                        {
                                            !loading &&
                                            !this.props.tasks.length &&
                                            (
                                                this.props.tasks_count.count ? "You've arrived to end of page"
                                                : "No tasks to show"

                                            )
                                        }
                                        {
                                            !loading &&
                                            this.props.tasks.map(task => <MainTaskCard task={task}/>)
                                        }
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>

                <div className="filters-card" style={{ zIndex: 1000000000000,display: (this.state.onFilter ? "block" : "none") }}>
                    <div className="flex aic jcsb">
                        <h4 className="mb15">Filter</h4><p onClick={e => {
                            this.setState(prevState => {
                                let state = {
                                    limit: 6,
                                    offset: 0,
                                    currentPage: Number(queryString.parse(this.props.location.search).page) || 1,
                                    onFilter: "",    
                                }
                                prevState.filters = {
                                    category_id: undefined,
                                    min_expected_price: 0,
                                    max_expected_price: 1000,
                                    city: ""
                                }
                                prevState = { ...prevState, ...state }
                                return prevState;
                            }, () => {
                                this.updateTasks(null, this.state.filters)
                            })
                        }} style={{ cursor: "pointer", marginBottom: 10, fontSize: 17 }} className="special">Clear Filters</p>

                    </div>
                    <label htmlFor className="mb25">
                        <span><img src="images/search.png" alt="" /></span>
                        <input 
                            type="text" placeholder="Search for task" className="search" 
                            value={this.state.filters.title}
                            onChange={this.onFilterChange("title")}
                        />
                    </label>
                    <div className="filters-lists">
                        <div className="filters-list" onClick={() => this.setState({ onFilter: "CATEGORIES" })}>
                            {/* <input type="text" class="filter-input" placeholder="Category"> */}
                            <div style={{ cursor: "pointer" }} className="filter-input filter-slide"><p>{show_category_name_or_default}</p><span style={{ cursor: "pointer" }}><img src="images/arr-right.png" alt="" /></span></div>
                        </div>
                        <div className="filters-list">
                            <input
                                type="text" className="filter-input" placeholder="Town"
                                value={this.state.filters.city}
                                onChange={this.onFilterChange("city")}
                            />
                        </div>
                        <div className="filters-list">
                            <input 
                                type="date" className="filter-input" placeholder="Due date" 
                                value={this.state.filters.due_date}
                                onChange={this.onFilterChange("due_date", 300)}    
                            />
                        </div>
                        <div className="filters-list" onClick={() => this.setState({ onFilter: "BUDGET_RANGE" })}>
                            {/* <input type="text" class="filter-input" placeholder="Category"> */}
                            <div style={{ cursor: "pointer" }} className="filter-input filter-slide">
                                <p>
                                    {this.state.filters.min_expected_price - this.state.filters.max_expected_price !== -1000 
                                    ? `${this.state.filters.min_expected_price}-${this.state.filters.max_expected_price}CH` : "Budget"}
                                </p><span><img src="images/arr-right.png" alt="" /></span></div>
                        </div>
                    </div>
                    <div className={"filters-card__extra " + (this.state.onFilter === "CATEGORIES" ? "slide" : "")}>
                        <h4 
                            className="mb25 flex aic remove-extra">
                            <img 
                                onClick={() => this.setState({ onFilter: "MAIN" })} 
                                style={{ transform: 'rotate(180deg)', width: '20px', marginRight: '15px', cursor: "pointer" }} 
                                src="images/arr-right.png" alt="" />
                                 { this.state.onFilter === "BUDGET_RANGE" ? "Budget" : "" }
                                 { this.state.onFilter === "CATEGORIES" ? "Type" : "" }
                                </h4>
                        {
                            this.state.allCategories.map(category => (
                                <div style={{ cursor: "pointer"}} className="filters-list" onClick={() => {
                                    this.onFilterChange("category_id")({ target: { value: category.id } })
                                    this.setState({ onFilter: "MAIN" })
                                }}>
                                    <div className="filter-input filter-slide">
                                        <span>
                                            <img src="images/arr-right.png" alt="" />
                                        </span>
                                        <p>{category.show}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={"filters-card__extra " + (this.state.onFilter === "BUDGET_RANGE" ? "slide" : "")}>
                        <h4 className="mb25 flex aic remove-extra">
                        <img onClick={() => this.setState({ onFilter: "MAIN" })} style={{ cursor: "pointer", transform: 'rotate(180deg)', width: '20px', marginRight: '15px' }} src="images/arr-right.png" alt="" /> Type</h4> 
                        
                        <h3 className="fs26">
                            {
                                this.state.filters.min_expected_price == this.state.filters.max_expected_price 
                                ? this.state.filters.min_expected_price
                                : `$${this.state.filters.min_expected_price} - $${this.state.filters.max_expected_price} /h`
                            }
                        </h3>
                        <p className="special fs17">Slide handlers to adjust price range.</p>
                        <br/>
                        <ReactSlider
                            className="horizontal-slider"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                            defaultValue={[0, 1000]}
                            onAfterChange={val => this.setState(prevState => {
                                prevState.filters.min_expected_price = val[0]
                                prevState.filters.max_expected_price = val[1]
                                return prevState;
                            }, debounce(
                                () => this.updateTasks(this.state.currentPage, this.state.filters),
                                100
                            ))}
                            max={1000}
                            ariaLabel={['Lower thumb', 'Upper thumb']}
                            ariaValuetext={state => `Thumb value ${state.valueNow}`}
                            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                            pearling
                            minDistance={0}
                        />
                    </div>
                </div>
                <center className="flex aic jcc" style={{ marginBottom: 25 }}>
                    {!loading && this.state.currentPage ? <Pages /> : null }
                </center>
                <Footer/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    let tasks = state.app.activeListing2.ids.map(
        x => state.tasks.byIds[x]
    )
    let { loading } = state.app.activeListing2;
    return { 
        loading, tasks, tasks_count: state.tasks.tasks_count,
        categories: {
            loading: state.categories.loading,
            items: state.categories.allIds.map(x => state.categories.byIds[x])
        },
        translations: state.app_lang.data["/create-task"],
        app_lang: state.app_lang.app_lang,
        own_profile: state.auth.profile,
        common: state.app_lang.common,
        active_listing_translations: state.app_lang.data["/active-listing"].web,    
    }
}


export default compose(
    connect(mapStateToProps, { getActiveListing2, getTasksCount, getCategories }),
    withRouter
)(ActiveListing);