import React from "react";

class CategoryGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            categoriesGroups: [
                {
                    id: 1,
                    name: "Household"
                },
                {
                    id: 2,
                    name: "Technical"
                }
            ]
        }
    }
    render(){
        let { categoriesGroups } = this.state;
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
                        categoriesGroups.map(obj => {
                            let { id, name } = obj;
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
    }
}


export default CategoryGroup;