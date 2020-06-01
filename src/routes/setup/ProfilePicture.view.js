import React from "react";

export default class ProfilePicture extends React.Component {
    render(){
        return (
            <React.Fragment>
                <div className="background-title mb5">
                    <h1>Profile</h1>
                    <p className="shadow__title">setup your account</p>
                </div>
                <h5 className="show__mobile"><img src="/images/social.png" alt="" style={{ width: '20px', marginRight: '10px' }} />Personal apperance </h5>
                <div className="mobile__dots">
                    <span className="dot active" />
                    <span className="dot" />
                    <span className="dot" />
                </div>
                <h4 className="mb30">Add your profile picture</h4>
                {/* <input class="circle-upload" type="file"> */}
                <div className="flex-grow image-upload__style">
                    <label htmlFor="file-upload" className="custom-file-upload">
                        <img ref={ref => this.plusRef = ref} src="/images/plus.png" style={{position:"inherit"}} className="plus-img" alt="" />
                    </label>
                    <input 
                        id="file-upload" 
                        type="file" 
                        onChange={e => this.props.onChange(e, this.plusRef)}
                    />
                </div>
                {/* Profile picture <br />
                <input type="file" name="file" onChange={this.props.onChange} /> */}
            </React.Fragment>
        )
    }
}
