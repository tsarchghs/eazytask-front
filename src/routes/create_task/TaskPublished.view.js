import React from "react";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb5">
                <h1>Your task is</h1>
                <h1>published!</h1>
                <p className="shadow__title">setup your account</p>
            </div>
            <h4 className="show__mobile">Your task is</h4>
            <h4 className="show__mobile mb30">published!</h4>
            <p className="mb30 ">You will be notified when a <br />
          tasker makes you an offer </p>
            <div className="flex-grow">
                <img src="/images/www.png" style={{ minWidth: '190px', width: '20%', margin: '0 auto' }} alt="" />
            </div>
        </React.Fragment>
    )
}