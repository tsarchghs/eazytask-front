import React from "react";
import { v1 } from "uuid";

export default class Picture extends React.Component {
    render(){
        console.log("this.props.gallery", this.props.gallery)
        return (
            <React.Fragment>
                <div className="background-title mb30">
                    <h1>Upload</h1>
                    <h3>photos</h3>
                    <p className="shadow__title no-contain">create a task on eazytask easy </p>
                </div>
                <h4 className="show__mobile">
                    Upload <br />
                    <span>photos</span>
                </h4>
                <div className="picture-section flex-grow ">
                    <p>Click one picture to set as thumbnail</p>
                    <div className="flex image-uploads">
                        <div className="image-upload__style flex  flex-column">
                            <label htmlFor="file-upload" className="custom-file-upload"><img src="/images/plus.png" className="plus-img" alt="" /></label>
                            <input onChange={this.props.onFileChange(v1())} id="file-upload" type="file" />
                        </div>
                        {
                            Object.keys(this.props.gallery).map(file_key => (
                                <div onClick={this.props.onThumbnailChange(file_key)} className="image-upload__style flex flex-column">
                                    {this.props.thumbnail == file_key && <div onClick={this.props.onThumbnailChange(file_key)} className="image-upload__mask"><h2>Thumbnail</h2></div>}
                                    {this.props.thumbnail != file_key && <div onClick={this.props.onThumbnailChange(file_key)} className="image-upload__mask"><h2>Set thumbnail</h2></div>}
                                    <div 
                                        onClick={this.props.onGalleryImageRemove(file_key)} 
                                        className="image-upload__close"
                                        style={{zIndex: 1000000}}
                                    >X</div>
                                    {this.props.thumbnail == file_key && <div className="image-upload__label">Thumbnail</div>}
                                    <img src={this.props.gallery[file_key].src} alt="" />
                                    {/* <div onClick={this.props.onGalleryImageRemove(file_key)}>X</div> */}
                                </div>
                            ))
                        }
                        {/* <div>
                            <div onClick={this.props.onThumbnailChange(file_key)} className="image-upload__style flex  flex-column" style={{ width: "10%" }}>
                                <label className="custom-file-upload">
                                    <img src={this.props.gallery[file_key].src} className="plus-img" alt="" /></label>
                                {this.props.thumbnail == file_key && "Thumbnail"}
                            </div>
                            <div onClick={this.props.onGalleryImageRemove(file_key)}>X</div>
                        </div> */}
                    </div>
                </div>

            </React.Fragment>
        )
        return (
            <React.Fragment>
                <div className="background-title mb30">
                    <h1>Upload</h1>
                    <h3>photos</h3>
                    <p className="shadow__title no-contain">create a task on eazytask easy </p>
                </div>
                <h4 className="show__mobile">
                    Upload <br />
                    <span>photos</span>
                </h4>

                <div className="picture-section flex-grow ">
                    <div className="image-upload__style flex  flex-column">
                        <p>Upload pictures of your task</p>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <img src="/images/plus.png" className="plus-img" alt="" /></label>
                        <input onChange={this.props.onFileChange(v1())} id="file-upload" type="file" />
                    </div>
                {
                    Object.keys(this.props.gallery).map(file_key => (
                        <div>
                            <div onClick={this.props.onThumbnailChange(file_key)} className="image-upload__style flex  flex-column" style={{ width: "10%" }}>
                                <label className="custom-file-upload">
                                <img src={this.props.gallery[file_key].src} className="plus-img" alt="" /></label>
                                {this.props.thumbnail == file_key && "Thumbnail"}
                            </div>
                            <div onClick={this.props.onGalleryImageRemove(file_key)}>X</div>
                        </div>
                    ))
                }
                </div>
            </React.Fragment>
        )
    }
}
