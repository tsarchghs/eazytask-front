import React from "react";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb5">
                <h1>{props.getTrans(props.translations.text_32)}</h1>
                <p className="shadow__title">setup your account</p>
            </div>
            <h4 className="show__mobile">{props.getTrans(props.translations.text_32)}</h4>
            <p className="mb30 special">
                {props.getTrans(props.translations.text_33).map(str => (
                    <React.Fragment>{str}<br/></React.Fragment>
                ))}
            </p>
            <div className="flex-grow">
                <img src="/images/computer_display_monochromatic.png" style={{ minWidth: '190px', width: '20%', margin: '0 auto' }} alt="" />
            </div>
        </React.Fragment>
    )
}