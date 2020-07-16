import React from "react";

export default class CoverPicture extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="background-title mb5">
                    <h1>{this.props.getTrans(this.props.translations.text_5_1)}</h1>
                    <p className="shadow__title">setup your account</p>
                </div>
                <h5 className="show__mobile"><img src="/images/Group.png" alt="" style={{ width: '20px', marginRight: '10px' }} />
                    {this.props.getTrans(this.props.translations.text_38)}
                </h5>
                <div className="mobile__dots">
                    <span className="dot active" />
                    <span className="dot" />
                    <span className="dot" />
                </div>
                <h4 className="mb30">{this.props.getTrans(this.props.translations.text_7)}</h4>
                {/* <input class="circle-upload" type="file"> */}
                <div className="flex-grow image-upload__style">
                    <label htmlFor="file-upload" className="custom-file-upload">
                        <img ref={ref => this.plusRef = ref} src="/images/plus.png" className="plus-img" alt="" />
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={e => this.props.onChange(e, this.plusRef)}
                    />            
                </div>

                {/* 
                Cover picture <br/>
                <input type="file" name="file" onChange={props.onChange} /> */}
            </React.Fragment>
        )
    }
}