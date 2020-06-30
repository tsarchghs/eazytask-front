import React from "react";

const OtherStep = props => {
    let info = props.reason
        ? { onClick: props.goToStep("THANK"), active: true }
        : { onClick: undefined, active: false }
    return (
        <div className="container">
            <div className="content">
                <header>
                    <span className="show__mobile">
                    <img onClick={props.goToStep("MAIN")} src="/images/arrow.jpeg" alt="" /></span>
                    <a href="#" style={{ visibility: 'hidden' }}><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                </header>
                <section className="two-column__layout setup__mobile create-task">
                    <div className="two-column__info flex flex-column">
                        <div className="background-title ">
                            {/* <h1>Task</h1>
					<h3>review</h3>
					<p class="shadow__title no-contain">create a task on eazytask easy </p> */}
                        </div>
                        <h4 className="show__mobile text-center">We are sorry to see you go</h4>
                        <p className="special text-center">Please tell us why you decided to delete your account.</p>
                        {/* 	<div class="flex-grow img-wrapper flex aic jcc">
					<img class="img__mobile " src="/images/ct/mind-map.png" alt="">
				</div> */}
                        <form action="" class="register__form flex-grow" style={{marginTop: 0}}>
                            <textarea 
                                value={props.reason} 
                                onChange={e => props.onChange(e.target.value)()} 
                                className="textarea" name="" id="" placeholder="Type here"></textarea>
                        </form>
                        <div className="buttons__group">
                            <button
                                onClick={info.onClick}
                                className={"button__style " + (info.active ? "" : "not-filled")}
                            >Next</button>
                        </div>
                    </div>
                    <div className="two-column__img ">
                        <div className="two-column__image">
                            <img src="/images/ct/mind-map.png" alt="" />
                        </div>
                        <div className="dots__group">
                            <span className="dot active" />
                            <span className="dot active" />
                            <span className="dot" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
    return (
        <React.Fragment>
            <h3>We are sorry to see you go</h3><br />
            <h5>Please tell us why you decided to delete your account.</h5>
            <form action="" class="register__form flex-grow" style={{marginTop: 0}}>
                <textarea value={props.reason} onChange={e => props.onChange(e.target.value)()} class="textarea" name="" id="" placeholder="Type here"></textarea>
            </form>
            {/* <textarea value={props.reason} onChange={e => props.onChange(e.target.value)()} type="text" /> */}
            {/* <button onClick={info.onClick} style={info.style}>Next</button> */}
            <div className="buttons__group">
                <button
                    onClick={info.onClick}
                    className={"button__style " + (info.active ? "" : "not-filled")}
                >Next</button>
            </div>

        </React.Fragment>
    )
}

export default OtherStep;