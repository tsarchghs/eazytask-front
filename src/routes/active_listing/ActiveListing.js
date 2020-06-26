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

class ActiveListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 6,
            offset: 0,
            currentPage: Number(queryString.parse(this.props.location.search).page) || 1,
            filters: {
                category_id: undefined,
                min_expected_price: 0,
                max_expected_price: 1000,
            },
            onFilter: ""
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
            for (let x = start; x <= end;x++){
                content.push(<Link to={`/active_listing?page=${x}`}><div onClick={() => this.updateTasks(x)}>{x}&nbsp;&nbsp;&nbsp;</div></Link>)
            }
            return content;
        }
        console.log({body: this.state},"DASDAASD")
        let show_category_name_or_default;
        let { category_id } = this.state.filters
        if (category_id){
            if (!this.props.categories.loading) 
                show_category_name_or_default = this.props.categories.items.find(x => x.id == category_id).name
        }
        if (!show_category_name_or_default) show_category_name_or_default = "Categories"
        return (
            <React.Fragment>
                <section className="landing-info panel card-section" id="c" style={{ background: 'white' }}>
                    <div className="container">
                        <div className="content">
                            <header className="flex jcsb aic">
                                <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                                <Link to="/register">
                                    <a href="#" className="h4">Join us</a>
                                </Link>
                            </header>
                            <section className="profile__cover">
                                <div className="two-column__info flex flex-column">
                                    <div className=" flex jcsb aic w100">
                                        <div className="background-title mb5 flex1">
                                            <h3>Active</h3>
                                            <h4>listings</h4>
                                            <p className="shadow__title hide__mobile">some active listings on eazytask</p>
                                            <p className="shadow__title show__mobile">COMMERCIAL</p>
                                        </div>
                                        <button style={{ cursor: "pointer" }} onClick={debounce(this.getToggleFilterFunc(), 10)}>
                                        <img style={{width: 25, transform: this.state.onFilter ? "rotate(90deg)" : ""}} src="/images/tools-and-utensils.png"/></button>
                                        <br />
                                    </div>
                                    <div className={"listing-cards flex aic jcsb" + (this.state.detailed ? "col-cards" : "")}>
                                        {this.props.loading && "Loading"}
                                        {
                                            !this.props.loading &&
                                            this.props.tasks.map(task => (
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
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>

                <div className="filters-card" style={{ zIndex: 1000000000000,display: (this.state.onFilter ? "block" : "none") }}>
                    <h4 className="mb15">Filter</h4>
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
                            <div className="filter-input filter-slide"><p>{show_category_name_or_default}</p><span><img src="images/arr-right.png" alt="" /></span></div>
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
                            <div className="filter-input filter-slide"><p>Budget</p><span><img src="images/arr-right.png" alt="" /></span></div>
                        </div>
                    </div>
                    <div className={"filters-card__extra " + (this.state.onFilter === "CATEGORIES" ? "slide" : "")}>
                        <h4 className="mb25 flex aic remove-extra"><img onClick={() => this.setState({ onFilter: "MAIN" })} style={{ transform: 'rotate(180deg)', width: '20px', marginRight: '15px' }} src="images/arr-right.png" alt="" /> Type</h4>
                        {
                            this.props.categories.loading ? "Loading categories" :
                                this.props.categories.items.map(x => (
                                    <div className="filters-list" onClick={() => {
                                        this.onFilterChange("category_id")({ target: { value: x.id } })
                                        this.setState({ onFilter: "MAIN" })
                                    }}>
                                        <div className="filter-input filter-slide">
                                            <span>
                                                <img src="images/arr-right.png" alt="" />
                                            </span>
                                            <p>{x.name}</p>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                    <div className={"filters-card__extra " + (this.state.onFilter === "BUDGET_RANGE" ? "slide" : "")}>
                        <h4 className="mb25 flex aic remove-extra"><img onClick={() => this.setState({ onFilter: "MAIN" })} style={{ transform: 'rotate(180deg)', width: '20px', marginRight: '15px' }} src="images/arr-right.png" alt="" /> Type</h4>
                        Budget: 
                        {
                            this.state.filters.min_expected_price == this.state.filters.max_expected_price 
                            ? this.state.filters.min_expected_price
                            : `${this.state.filters.min_expected_price} - ${this.state.filters.max_expected_price}`
                        } CH
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
                <center className="flex aic jcc">
                    {!loading && this.state.currentPage && <Pages />}
                </center>

            </React.Fragment>
        )
        return (
            <React.Fragment>
                <div>Discover all</div>
                {loading && "Loading"}
                {/* { !loading && } */}
                {
                    this.props.categories.loading ? "Loading categories" :
                        this.props.categories.items.map(x => (
                            <label>{x.name}
                                <input
                                    type="radio"
                                    name="categories"
                                    value={x.id}
                                    checked={this.state.filters.category_id == x.id}
                                    onChange={this.onFilterChange("category_id")}
                                />
                            </label>
                        ))
                }
                <input
                    type="date"
                    placeholder="Due date..."
                    value={this.state.filters.due_date}
                    onChange={this.onFilterChange("due_date", 300)}
                />
                <input
                    type="text"
                    placeholder="Town.."
                    value={this.state.filters.city}
                    onChange={this.onFilterChange("city")}
                />
                <input
                    type="text"
                    placeholder="Search for you task.."
                    value={this.state.filters.title}
                    onChange={this.onFilterChange("title")}
                />
                <label>
                    Expire soon
                        <input
                        type="checkbox"
                        value={this.state.filters.expire_soon}
                        onChange={this.onFilterChange("expire_soon")}
                    />
                </label>
                {!loading &&
                    <ul>
                        {this.showTasks()}
                    </ul>
                }

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
        } 
    }
}


export default compose(
    connect(mapStateToProps, { getActiveListing2, getTasksCount, getCategories }),
    withRouter
)(ActiveListing);