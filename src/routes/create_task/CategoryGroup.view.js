import React from "react";

class CategoryGroup extends React.Component {
    constructor(props){
        super(props);
        let categoriesGroups = []
        this.props.translations.categories.map((category,id) => {
            categoriesGroups.push({
                id,
                name: category.en,
                show: props.getTrans(category),
                description: category.description
            })
        })
        this.state = { categoriesGroups }
    }
    render(){
        let { categoriesGroups } = this.state;
        return (
            <React.Fragment>
                <div className="background-title mb30">
                    <h1>{this.props.getTrans(this.props.translations.text_20)}</h1>
                    <h3>{this.props.getTrans(this.props.translations.text_21)}</h3>
                    <p className="shadow__title no-contain">create a task on eazytask easy </p>
                </div>
                <h4 className="show__mobile">
                    {this.props.getTrans(this.props.translations.text_20)} <br />
                    <span>{this.props.getTrans(this.props.translations.text_21)}</span>
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
                                        <h5>{obj.show}</h5>
                                        <p>{this.props.getTrans(obj.description)}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="card-task" onClick={this.props.onOtherClick}>
                        <div className="card-task__img">
                            <img src="/images/cursor.png" alt="" />
                        </div>
                        <div className="card-task__text">
                            <h5>{this.props.getTrans(this.props.translations.text_31)}</h5>
                            <p>{this.props.getTrans(this.props.translations.text_31.description)}</p>
                        </div>
                    </div>
                </div>
                <div className="img-wrapper flex aic jcc">
                    <img className="img__mobile hide__smallest" src="/images/stand2.png" alt="" />
                </div>

            </React.Fragment>
        )
    }
}


export default CategoryGroup;