import React from "react";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb5">
                <h1>Ready to go</h1>
                <p className="shadow__title">setup your account</p>
            </div>
            <h4 className="show__mobile">Ready to go</h4>
            <p className="mb30 special">Lorem ipsum dolor sit amet, <br /> consetetur sadipscing elitr, sed diam. </p>
            <div className="flex-grow">
                <img src="/images/computer_display_monochromatic.png" style={{ minWidth: '190px', width: '20%', margin: '0 auto' }} alt="" />
            </div>
        </React.Fragment>
    )
}