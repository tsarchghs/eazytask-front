import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import queryString from "query-string";

class CategoryGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            "Household": [
                {
                    id: 1,
                    name: "Handicraft work"
                },
                {
                    id: 2,
                    name: "Gradening work"
                },
                {
                    id: 3,
                    name: "Moving & Cleaning"
                },
                {
                    id: 4,
                    name: "Furniture"
                },
                {
                    id: 5,
                    name: "Handicraft work"
                }

            ],
            "Technical": [
                {
                    id: 1,
                    name: "Repair toilet"
                },
            ]
        }
    }
    render(){
        if (!this.props.categoryGroupName) {
            let { search } = this.props.location;
            let { step } = queryString.parse(search);
            console.log("ERROR: ", `?step=${Number(step) - 1}`)
            // return <Redirect to={`?step=${Number(step) - 1}`}/>
            return "!this.props.categoryGroupName"
        }
        let categories = this.state[this.props.categoryGroupName];
        return (
            <React.Fragment>
                <div className="background-title mb30">
                    <h1>Almost there</h1>
                    <p className="shadow__title no-contain">create a task on eazytask easy </p>
                </div>
                <h4 className="show__mobile">
                    Almost there <br />
                </h4>

                <h4 className="show__mobile">
                    Household <br />
                    <span>Category</span>
                </h4>
                <div className="cards-section ">
                    {
                        categories.map(category => {
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
                    <div className="card-task" onClick={this.props.onOtherClick}>
                        <div className="card-task__img">
                            <img src="/images/house.png" alt="" />
                        </div>
                        <div className="card-task__text">
                            <h5>Other</h5>
                            <p>Lorem ipsum dolor sit amet, consectetu</p>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default withRouter(CategoryGroup);