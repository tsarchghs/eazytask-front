import React from "react";
import { connect } from "react-redux";
import { getCategoriesGroups } from "../../actions/categories_group";

class CategoryGroup extends React.Component {
    componentDidMount(){
        this.props.getCategoriesGroups();
    }
    render(){
        return (
            <React.Fragment>
                <div className="background-title mb30">
                    <h1>Task</h1>
                    <h3>category</h3>
                    <p className="shadow__title no-contain">create a task on eazytask easy </p>
                </div>
                <h4 className="show__mobile">
                    Task <br />
                    <span>Category</span>
                </h4>

                <div className="cards-section flex-grow">
                    {
                        this.props.categoriesGroups.loading && "Loading"
                    }
                    {
                        !this.props.categoriesGroups.loading && this.props.categoriesGroups.allIds.map(ID => {
                            let { id, name } = this.props.categoriesGroups.byIds[ID];
                            let src;
                            if (name == "Household") src = "/images/house.png"
                            if (name == "Technical") src = "/images/garage.png"
                            return (
                                <div className="card-task" key={id} onClick={() => this.props.onCategoryGroupClick(id, name)}>
                                    <div className="card-task__img">
                                        <img src={src} alt="" />
                                    </div>
                                    <div className="card-task__text">
                                        <h5>{name}</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetu</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="card-task" onClick={this.props.onOtherClick}>
                        <div className="card-task__img">
                            <img src="/images/cursor.png" alt="" />
                        </div>
                        <div className="card-task__text" onClick={this.props.onOtherClick}>
                            <h5>Other</h5>
                            <p>Lorem ipsum dolor sit amet, consectetu</p>
                        </div>
                    </div>
                </div>
                <div className="img-wrapper flex aic jcc">
                    <img className="img__mobile " src="/images/stand2.png" alt="" />
                </div>

            </React.Fragment>
        )
        return (
            <React.Fragment>
                Task Category<br />
                {
                    this.props.categoriesGroups.loading && "Loading"
                }
                {
                    !this.props.categoriesGroups.loading && this.props.categoriesGroups.allIds.map(ID => {
                        let { id, name } = this.props.categoriesGroups.byIds[ID];
                        return (
                            <React.Fragment key={id}>
                                <button onClick={() => this.props.onCategoryGroupClick(id)}>
                                    {name}
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

const mapStateToProps = state => ({ categoriesGroups: state.categoriesGroups})

export default connect(mapStateToProps, { getCategoriesGroups })(CategoryGroup);