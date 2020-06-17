import React from "react";
import { connect } from "react-redux";
import { getCategories } from "../../actions/categories";

class CategoryGroup extends React.Component {
    componentDidMount(){
        this.props.getCategories(this.props.categoryGroupId);
    }
    render(){
        return (
            <React.Fragment>
                <h4 className="show__mobile">
                    Household <br />
                    <span>Category</span>
                </h4>
                <div className="cards-section ">
                    {
                        this.props.categories.loading && "Loading"
                    }
                    {
                        !this.props.categories.loading && this.props.categories.allIds.map(id => {
                            let category = this.props.categories.byIds[id];
                            return (
                                <div className="card-task" key={category.id} onClick={() => this.props.onCategoryClick(category.name)}>
                                    <div className="card-task__img">
                                        <img src="/images/house.png" alt="" />
                                    </div>
                                    <div className="card-task__text">
                                        <h5>{category.name}</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetu</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="card-task">
                        <div className="card-task__img">
                            <img src="/images/house.png" alt="" />
                        </div>
                        <div className="card-task__text" onClick={this.props.onOtherClick}>
                            <h5>Other</h5>
                            <p>Lorem ipsum dolor sit amet, consectetu</p>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
        return (
            <React.Fragment>
                Task Category<br />
                {
                    this.props.categories.loading && "Loading"
                }
                {
                    !this.props.categories.loading && this.props.categories.allIds.map(id => {
                        let category = this.props.categories.byIds[id];
                        return (
                            <React.Fragment key={category.id}>
                                <button onClick={() => this.props.onCategoryClick(category.name)}>
                                    {category.name}
                                </button><br />
                            </React.Fragment>
                        )
                    })
                }
                <button onClick={this.props.onOtherClick}>
                    Other
                </button>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({ categories: state.categories})

export default connect(mapStateToProps, { getCategories })(CategoryGroup);