import React from "react";
import { ModalContainer, Modal } from 'minimal-react-modal';

class BigIcons extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        let task = this.props.task;
        let due_date = new Date(task.due_date);
        let data = this.props.data || {}
        return (
            <div className="big-icons">
                <ModalContainer key="1">
                    {(openModal, closeModal, isActive) => (
                        <div>
                            <div onClick={openModal} className="big-icon">
                                <div className="flex-grow">
                                    <img src="/images/inter.png" alt="" />
                                </div>
                                <p>{this.props.translations.text_1[this.props.app_lang]}</p>
                                <h5>{new Date(this.props.task.due_date).toLocaleDateString().replace(/\//g, ".")}</h5>
                            </div>
                            <Modal
                                isActive={isActive}     // required
                                closeModal={closeModal} // required
                            >
                                <div key="ASDDASDDSASDDASDDSASDDASDDSAS" style={{ zIndex: 9999999999999999 }} className="date-section">
                                    <h5>Date	</h5>
                                    <img src="/images/calendar.png" width="30" alt="" />
                                    <div className="date-section__tabs mt20 flex jcc aic">
                                        <h3 onClick={() => this.props.onChange("due_date_type")({ target: { value: "FIXED_DATE"}})} className={
                                            data.due_date_type ? 
                                             data.due_date_type === "FIXED_DATE" ? "active": "" : 
                                             task.due_date_type === "FIXED_DATE" ? "active" : ""
                                        }>Fixed</h3>
                                        <h3 
                                            onClick={() => this.props.onChange("due_date_type")({ target: { value: "UNTIL_DATE" } })}
                                            className={
                                                data.due_date_type ?
                                                    data.due_date_type === "UNTIL_DATE" ? "active" : "" :
                                                    task.due_date_type === "UNTIL_DATE" ? "active" : ""
                                            }
                                        >Until</h3>
                                    </div>
                                    <div className="date-section__select flex-grow flex jcc aic ">
                                        <input 
                                            type="number" 
                                            value={data.day || due_date.getDate()} 
                                            placeholder="Day" 
                                            onChange={this.props.onChange("day")}
                                        />
                                        <input 
                                            type="number" 
                                            value={data.month || due_date.getMonth()} 
                                            placeholder="Month" 
                                            onChange={this.props.onChange("month")}
                                        />
                                        <input 
                                            type="number" 
                                            value={data.year || due_date.getFullYear()} 
                                            placeholder="Year" 
                                            onChange={this.props.onChange("year")}
                                        />
                                    </div>
                                    <div className="buttons__group mb5">
                                        <button className="button__style">Save Changes</button>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    )}
                </ModalContainer>
                <ModalContainer key="12">
                    {(openModal, closeModal, isActive) => (
                        <div key="ASDDASDDSASDDASDDSASDDASDDSASDDASDDS">
                            <div onClick={openModal} className="big-icon">
                                <div className="flex-grow">
                                    <img src="/images/pins.png" alt="" />
                                </div>
                                <p>{this.props.task.city}</p>
                                <h5>{this.props.task.zipCode}</h5>
                            </div>
                            <Modal
                                isActive={isActive}     // required
                                closeModal={closeModal} // required
                            >
                                <div style={{ zIndex: 9999999999999999 }}>
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
                                </div>
                            </Modal>
                        </div>
                    )}
                </ModalContainer>
                <ModalContainer key="13">
                    {(openModal, closeModal, isActive) => (
                        <div key="ASDDASDDSASDDASDDS">
                            <div onClick={openModal} className="big-icon">
                                <div className="flex-grow">
                                    <img src="/images/shop.png" alt="" />
                                </div>
                                <p>{this.props.translations.text_2[this.props.app_lang]}</p>
                                <h5>CHF {this.props.task.expected_price}.-</h5>
                            </div>
                            <Modal
                                isActive={isActive}     // required
                                closeModal={closeModal} // required
                            >
                                <div style={{ zIndex: 9999999999999999 }} className="price-section">
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
                            </Modal>
                        </div>
                    )}
                </ModalContainer>
                <ModalContainer key="14">
                    {(openModal, closeModal, isActive) => (
                        <div key="ASDDASDDS">
                            <div onClick={openModal} className="big-icon">
                                <div className="flex-grow">
                                    <img src="/images/house.png" alt="" />
                                </div>
                                <p>{this.props.translations.text_3[this.props.app_lang]}</p>
                                <h5>{this.props.task.Category.name}</h5>
                            </div>
                            <Modal
                                isActive={isActive}     // required
                                closeModal={closeModal} // required
                            >
                                <div style={{ zIndex: 9999999999999999 }} className="cards-section flex-grow ">
                                    <h5>Location	</h5>
                                    <img src="/images/house.png" alt="" style={{ width: '80px' }} className="mb20" />
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
                            </Modal>
                        </div>
                    )}
                </ModalContainer>
            </div>
        )
    }
}

export default BigIcons;