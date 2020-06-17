import React from "react";

export default props => {
    return (
        <React.Fragment>
            <h4 className="show__mobile">
                Write <br />
                <span>Your category</span>
            </h4>
            <div action className="register__form flex-grow">
                <input 
                    onChange={props.category} 
                    onChange={props.onCategoryChange}
                    type="text" 
                    placeholder="Category.." 
                    className="input" 
                />
            </div>
        </React.Fragment>
    )
}