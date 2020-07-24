import React from "react";
import { Link } from "react-router-dom";

export default props => {
    let text_1; let text_2;
    if (props.mobile) { 
        text_1 = props.getTrans(props.translations.text_2)
        text_2 = props.getTrans(props.translations.text_23)
    }
    if (props.web) { 
        text_1 = props.getTrans(props.translations.text_2)
        text_2 = props.getTrans(props.translations.text_3)
    }
    let { loading, error, payload } = props;
    console.log("home__card gradient",props)
    return (
        <div className={"home__card gradient "}>
            {
                loading && "Loading"
            }
            {
                !loading && error &&
                <h5>
                    No new offers<br />
                </h5>


            }
            { 
                !loading && !error &&
                <Link to={"/task/" + payload.task.id}>
                    <h5>
                        {text_1}   “{payload.task.title}” <br />
                        <span>
                            {text_2}
                        </span>
                    </h5>
                </Link>
            }
            <img src="/images/succ.png" alt="" />
        </div>
    )
}