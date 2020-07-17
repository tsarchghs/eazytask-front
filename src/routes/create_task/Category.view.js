import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import queryString from "query-string";

class CategoryGroup extends React.Component {
    constructor(props){
        super(props);
        let state = {}
        props.translations.categories.map((category,category_id) => {
            if (category.en === this.props.categoryGroupName) state.current_category_id = category_id
            state[category.en] = category.sub_categories.map((sub_category,id) => {
                return {
                    id,
                    category_id,
                    categoryShowName: props.getTrans(category),
                    name: sub_category.en, 
                    show: props.getTrans(sub_category)
                }
            })
        })
        this.state = state;
        console.log("categorycategory",this.state,this.props.translations.categories,this.state.current_category_id)
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
                    <h1>{this.props.getTrans(this.props.translations.text_32)}</h1>
                    <p className="shadow__title no-contain">create a task on eazytask easy </p>
                </div>
                <h4 className="show__mobile">
                {this.props.getTrans(this.props.translations.text_32)} <br />
                </h4>

                <h4 className="show__mobile">
                    {this.state[this.props.categoryGroupName].categoryShowName} <br />
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
                                        <h5>{category.show}</h5>
                                        <p>{
                                            this.props.getTrans(
                                                this.props.translations.categories[
                                                    this.state.current_category_id
                                                ].description
                                            )}</p>
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
                            <h5>{this.props.getTrans(this.props.translations.text_31)}</h5>
                            <p>{this.props.getTrans(this.props.translations.text_31.description)}</p>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default withRouter(CategoryGroup);