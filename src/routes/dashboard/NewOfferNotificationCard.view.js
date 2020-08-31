import React from "react";
import { Link } from "react-router-dom";

export default props => {
    let text_1; let text_2;
    if (props.mobile) { 
        text_1 = props.getTrans(props.translations.text_26)
        text_2 = props.getTrans(props.translations.text_27)
    }
    if (props.web) { 
        text_1 = props.getTrans(props.translations.text_32)
        text_2 = props.getTrans(props.translations.text_33)
    }
    let { loading, error, payload } = props;
    return (
        <div className={"home__card gradient "}>
            {
                loading && <h5>Loading...</h5>
            }
            {
                !loading && error &&
                <h5>
                    {props.web && props.translations.text_29 && props.getTrans(props.translations.text_29)}
                    {props.mobile && props.translations.text_25 && props.getTrans(props.translations.text_25)}<br />
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