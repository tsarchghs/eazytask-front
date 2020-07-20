import React from "react";
import { withRouter } from "react-router-dom";

class WebEditTask extends React.Component {
    render(){
        return (
            <React.Fragment>
                <section className="offers-layout edit-task__wrapper tasker-profile edit-task__layout hide-on-mobile">
                <div style={{
                        backgroundImage: `url(${this.props.task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__})`
                    }} className="offers-picture">
                <div className="offer-picture__buttons">
                    <div style={{ cursor: "pointer"}} onClick={() => {
                        try {
                            this.props.history.goBack();
                        } catch (e) {
                            this.props.history.push("/dashboard")
                        }
                    }} className="offer-picture__back"><img src="/images/arrow.jpeg" alt="" /></div>
                    <div className="offer-picture__edit hide">
                    <img src="/images/more.png" alt="" />
                    </div>	
                </div>
                </div>
                <div className="offers-content modified">
                <div className="offers__cards min-h__cards">
                    <div className="offers__card " style={{height: 'initial'}}>
                    <div className="offers__card--top">
                        <div className=" edit-task__title">
                        {
                            this.props.onEdit === "TITLE" ?
                                <React.Fragment>
                                    <input onChange={this.props.onChange("title")}
                                        className="register__form_input"
                                        value={this.props.data.title || this.props.task.title}
                                    /> 
                                        <span onClick={this.props.changeOnEdit("")} className="edit-pen">
                                            <img src="/images/edit-pen.png" alt="" />
                                        </span>
                                </React.Fragment>
                                :
                                <h3 className="text-center">{this.props.data.title || this.props.task.title}
                                    <span onClick={this.props.changeOnEdit("TITLE")} className="edit-pen">
                                        <img src="/images/edit-pen.png" alt="" />
                                    </span>
                                </h3>
                        }
                                {
                                    this.props.onEdit === "DESCRIPTION" ?
                                        <React.Fragment>
                                            <input className="register__form_input" onChange={this.props.onChange("description")}
                                                    value={this.props.data.description || this.props.task.description}
                                            />
                                            <span onClick={this.props.changeOnEdit("")} className="edit-pen">
                                                <img src="/images/edit-pen.png" alt="" />
                                            </span>
                                        </React.Fragment>
                                        :
                                        <p className="text-center">{this.props.data.description || this.props.task.description}
                                            <span onClick={this.props.changeOnEdit("DESCRIPTION")} className="edit-pen">
                                                <img src="/images/edit-pen.png" alt="" />
                                            </span>
                                        </p>
                                }
                        {/* <p className="text-center mb0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse<span className="edit-pen"><img src="/images/edit-pen.png" alt="" /></span></p> */}
                        </div>
                    </div>
                    </div>
                    <div className="big-icons jcc mb40">
                    <div className="big-icon">
                        <div className="flex-grow">
                        <img src="/images/inter.png" alt="" />
                        </div>
                        <p>Active until</p>
                        <h5>03.06.2020</h5>
                    </div>
                    <div className="big-icon">
                        <div className="flex-grow">
                        <img src="/images/pins.png" alt="" />
                        </div>
                        <p>Bern</p>
                        <h5>3004</h5>
                    </div>
                    <div className="big-icon">
                        <div className="flex-grow">
                        <img src="/images/shop.png" alt="" />
                        </div>
                        <p>Price</p>
                        <h5>CHF 300.-</h5>
                    </div>
                    <div className="big-icon">
                        <div className="flex-grow">
                        <img src="/images/house.png" alt="" />
                        </div>
                        <p>Type</p>
                        <h5>Household</h5>
                    </div>
                    </div>
                    <div className="offers-images__layout">
                    <p className="offers-images__title">Gallery</p>
                    <div className="offers-images">
                    {
                        this.props.data.gallery && this.props.data.gallery.map(obj => {
                            return (
                                <div className={"offers-image image-uploads " + (this.props.data.thumbnail.value == obj.value ? "active" : "")}>
                                    <img onClick={this.props.onThumbnailChange(obj.value)} src={obj.value} alt="" />
                                    <h4 onClick={this.props.onThumbnailChange(obj.value)}>Thumbnail</h4>
                                    <span style={{ zIndex: 1000000 }} onClick={this.props.onGalleryImageRemove(obj.value)} className="remove-th">X</span>
                                </div>
                            )
                        })
                    }
                    <div className="offers-image image-uploads empty">
                        <img onClick={() => this.fileInputRef2.click()} src="/images/plus.png" alt="" />
                        <input ref={ref => this.fileInputRef2 = ref} onChange={this.props.onFileChange} id="file-upload-2" type="file" />
                    </div>
                    </div>
                    <center>
                        {
                            this.props.showUpdateButton() ?
                                (
                                    this.props.loading ? <button className="button__style small">Saving..</button> :
                                        <button onClick={this.props.updateTask} className="button__style small">Save</button>
                                )
                                : null
                        }          
                    </center>
                    </div>
                </div>
                </div>
            </section>	  
            </React.Fragment>
        )
    }
}

export default withRouter(WebEditTask);