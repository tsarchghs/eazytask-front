import React from "react";
import { Link } from "react-router-dom";

const MainStep = props => {
    let info = props.reason
        ? { onClick: props.goToStep("THANK"), active: true }
        : { onClick: undefined, active: false }
    return (
        <div className="container">
            <div className="content">
                <header>
                    <span className="show__mobile">
                    <Link to="/my_profile_edit">
                        <img src="/images/arrow.jpeg" alt="" />
                    </Link>
                    </span>
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
                        <div className="filters-card delete-inputs">
                            <div className="filters-lists">
                                {
                                    props.items.map(item => (
                                        <div className="filters-list">
                                            <div 
                                                onClick={props.onChange(item.value)} 
                                                className="filter-input filter-slide"
                                            >
                                                <span className={"filter-input__check " + (props.reason == item.value ? "active" : "")} />
                                                <p>{item.value}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="filters-list">
                                    <div onClick={props.goToStep("OTHER")} className="filter-input filter-slide " style={{ justifyContent: 'space-between' }}><p>Other</p><span><img src="/images/arr-right.png" alt="" /></span></div>
                                </div>
                            </div>
                            <div className="filters-card__extra">
                                <h4 className="mb25 flex aic remove-extra"><img style={{ transform: 'rotate(180deg)', width: '20px', marginRight: '15px' }} src="/images/arr-right.png" alt="" /> Type</h4>
                                <div className="filters-list">
                                    <div className="filter-input filter-slide"><span><img src="/images/arr-right.png" alt="" /></span><p>Category</p></div>
                                </div>
                                <div className="filters-list">
                                    <div className="filter-input filter-slide"><span><img src="/images/arr-right.png" alt="" /></span><p>Category</p></div>
                                </div>
                                <div className="filters-list">
                                    <div className="filter-input filter-slide"><span><img src="/images/arr-right.png" alt="" /></span><p>Category</p></div>
                                </div>
                            </div>
                        </div>
                        {/* 	<div class="flex-grow img-wrapper flex aic jcc">
					<img class="img__mobile " src="/images/ct/mind-map.png" alt="">
				</div> */}
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
                            <span className="dot" />
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
            {
                props.items.map(item => (
                    <React.Fragment>
                        <input
                            type="radio"
                            value={props.reason == item.value}
                            name="reason"
                            onClick={props.onChange(item.value)}
                        />{item.value} <br />
                    </React.Fragment>
                ))
            }
            <div onClick={props.goToStep("OTHER")}>
                <input type="radio" name="reason" />Other
            </div>
            <button onClick={info.onClick} style={info.style}>Next</button>
        </React.Fragment>
    )
}

export default MainStep;