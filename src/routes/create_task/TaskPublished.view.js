import React from "react";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb5">
                <h1>{props.getTrans(props.translations.text_45)}</h1>
                <h1>{props.getTrans(props.translations.text_46)}</h1>
                <p className="shadow__title">setup your account</p>
            </div>
            <h4 className="show__mobile">{props.getTrans(props.translations.text_45)}</h4>
            <h4 className="show__mobile mb30">{props.getTrans(props.translations.text_46)}</h4>
            <p className="mb30 fs20 mt25">{props.getTrans(props.translations.text_47)}</p>
            <div className="flex-grow">
                <img src="/images/computer_display_monochromatic_1.png" style={{ minWidth: '190px', width: '20%', margin: '0 auto' }} alt="" />
            </div>
        </React.Fragment>
    )
}