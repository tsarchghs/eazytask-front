import React from "react";

class Modals extends React.Component {
    render() {
        return (
            <div className="edit-popup" style={{display: "none"}}>
                <div className="edit-popup__content">
                    <div className="date-section">
                        <h5>Date	</h5>
                        <img src="/images/ct/calendar.png" alt="" />
                        <div className="date-section__tabs mt20 flex jcc aic">
                        <h3 className="active">Fixed</h3>
                        <h3>Until</h3>
                        </div>
                        <div className="date-section__select flex-grow flex jcc aic ">
                        <input type="text" placeholder="Day" />
                        <input type="text" placeholder="Month" />
                        <input type="text" placeholder="Year" />
                        </div>
                        <div className="buttons__group mb5">
                        <button className="button__style">Save Changes</button>
                        </div>
                    </div> 
                    <div className="price-section">
                        <h5>Price	</h5>
                        <img src="/images/shop.png" alt="" />
                        <div className="input-price flex aic jcc mt30 mb25">
                        <input type="text" />
                        <h4 className="dark-gray">CHF</h4>
                        </div>
                        <div className="buttons__group mb5">
                        <button className="button__style">Save Changes</button>
                        </div>
                    </div> 
                    <div className="locate-section">
                        <h5>Location	</h5>
                        <div className="flex-grow input__group aic">
                        <img src="/images/pins.png" alt="" className="mb20" />
                        <input type="text" className="input gray " placeholder="Address" />
                        <div className="two__inputs mb20">
                            <input type="text" className="input gray" placeholder="ZIP" />
                            <input type="text" className="input gray" placeholder="Town" />
                        </div>
                        <div className="buttons__group mb5 aic jcc">
                            <button className="button__style">Save Changes</button>
                        </div>
                        </div>
                    </div>
                    <div className="cards-section flex-grow ">
                        <h5>Location	</h5>
                        <img src="/images/house.png" alt="" style={{width: '80px'}} className="mb20" />			
                        <div className="card-task">
                        <div className="card-task__img">
                            <img src="/images/house.png" alt="" />						
                        </div>
                        <div className="card-task__text">
                            <h5>Household</h5>
                            <p>Lorem ipsum dolor sit amet, consectetu</p>
                        </div>
                        </div>
                        <div className="card-task">
                        <div className="card-task__img">
                            <img src="/images/garage.png" alt="" />
                        </div>
                        <div className="card-task__text">
                            <h5>Household</h5>
                            <p>Lorem ipsum dolor sit amet, consectetu</p>
                        </div>
                        </div>
                        <div className="card-task">
                        <div className="card-task__img">
                            <img src="/images/cursor.png" alt="" />							
                        </div>
                        <div className="card-task__text">
                            <h5>Household</h5>
                            <p>Lorem ipsum dolor sit amet, consectetu</p>
                        </div>
                        </div>
                        <div className="buttons__group mb5 jcc aic">
                        <button className="button__style">Save Changes</button>
                        </div>
                    </div> 
                </div>
            </div>

        )
    }
}

export default Modals;