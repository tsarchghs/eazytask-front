import React from "react";

export default props => {
    console.log("TASK_REVIEW",props)
    let { day, month, year } = props;
    let due_date = new Date(`${month}/${day}/${year}`).toLocaleDateString().replace(/\//g,".")
    

    let category_name = props.translations.categories.find(x => x.en == props.categoryGroupName)
    if (category_name) category_name = category_name[props.app_lang]
    else category_name = props.categoryGroupName;

    let sub_category_name;
    for (let category of props.translations.categories) {
        sub_category_name = category.sub_categories.find(x => x.en == props.category)
        if (sub_category_name) break;
    }
    if (sub_category_name) sub_category_name = sub_category_name[props.app_lang]
    else sub_category_name = props.category;

    return (
        <React.Fragment>
            <div className="background-title ">
                <h1>{props.getTrans(props.translations.text_36)}</h1>
                <h3>{props.getTrans(props.translations.text_37)}</h3>
                <p className="shadow__title no-contain">create a task on eazytask easy </p>
            </div>
            <h4 className="show__mobile">
                {props.getTrans(props.translations.text_36)}  <br />
                <span>{props.getTrans(props.translations.text_37)}</span>
            </h4>
            <div className="task-section" style={{ width: "100%" }}>
                <p><span>{props.getTrans(props.translations.text_38)}</span> {props.name}</p>
                <p><span>{props.getTrans(props.translations.text_39)}</span>  {props.description}</p>
                <p><span>{props.getTrans(props.translations.text_36)}
                {
                    props.date_type 
                    ? props.getTrans(props.translations.text_40) 
                    : props.getTrans(props.translations.text_341)
                }</span> {due_date}</p>
                <p><span>{props.getTrans(props.translations.text_42)}</span> {props.address}, {props.zipCode} {props.city}</p>
                <p><span>{props.getTrans(props.translations.text_43)}</span> {category_name}</p>
                <p><span>{props.getTrans(props.translations.text_44)}</span> {sub_category_name}</p>
            </div>
        </React.Fragment>

    )
}