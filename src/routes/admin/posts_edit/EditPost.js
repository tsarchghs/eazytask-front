import React from "react";
import { Link, withRouter } from "react-router-dom";
import ReactQuill from "react-quill";

import Header from "../common/Header";
import NavBar from "../common/NavBar";

import { connect } from "react-redux";
import { getPost, patchPosts } from "../../../actions/posts";

import { compose } from "recompose";

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

const CreateForm = props => {
    return (
        <form onSubmit={props.onSubmit}>
            <div className="row">
                <div className="col-12" style={{ marginRight: "24%", marginLeft: "-28%", marginTop: "10%" }}>
                    <center />
                    <div className="card" style={{ width: "150% " }}>
                        <div className="card-header">
                            <h4 className="mb-0">Update post: {props.originalData.title}</h4>
                        </div>
                        <div
                            className="col-md-12 mb-12"
                            style={{ marginTop: "5%" }}
                        >
                            <label style={{ display: "flex" }}>
                                <img
                                    src={(props.data.thumbnail ? props.data.thumbnail.src : "") || props.originalData.thumbnail}
                                    style={{ border: "1px solid black", minWidth: 100, maxWidth: 100 }}
                                />
                                <input onChange={props.onFileChange} type="file" style={{ display: "none" }} />
                                <div>Edit</div>
                            </label>

                            <div>
                                <label>Title22</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={props.data.title || props.originalData.title}
                                    onChange={props.onChange("title")}
                                />
                            </div>
                            <div>
                                <label>Content</label>
                                <ReactQuill
                                    modules={modules}
                                    formats={formats}
                                    value={props.data.content || props.originalData.content}
                                    onChange={props.onChange("content")}
                                />
                            </div>
                            <hr className="mb-12" />
                            <button
                                className="btn btn-primary btn-lg btn-block"
                                type="submit"
                                style={{ marginBottom: "20px" }}
                            >
                                Update post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {

            }
        }
    }
    componentDidMount(){
        let { postId } = this.props.match.params;
        this.props.getPost(postId);
    }
    onChange = key => e => {
        let value;
        if (typeof (e) === "string") value = e;
        else value = e.target.value;
        this.setState(prevState => {
            let { data } = this.state;
            data[key] = value;
            return { ...prevState, data: { ...data } }
        })
    }
    onSubmit = e => {
        e.preventDefault();
        let { title, content, thumbnail } = this.state.data;
        let body = { title, content, thumbnail: thumbnail ? thumbnail.file : undefined }
        let { postId } = this.props.match.params;
        this.props.patchPosts(postId,body);
    }
    onFileChange = e => {
        e.persist()
        e.preventDefault()
        let file = e.target.files[0]
        let useThis = this;
        if (file) {
            var fr = new FileReader();
            fr.onload = function (d) {
                let src = d.srcElement.result;
                useThis.setState(prevState => {
                    prevState.data["thumbnail"] = { file, src };
                    return prevState;
                })
            }
            fr.readAsDataURL(file);
        }
    }
    render() {
        let { loading, err, success } = this.props;
        console.log("props.originalData", this.props.post)
        return (
            <React.Fragment>
                <Header />
                <NavBar />
                <div className="dashboard-wrapper">
                    <div className="container-fluid dashboard-content">
                        <div className="row" style={{ marginTop: "5%" }}>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div>
                                    <div style={{ marginTop: "20px", marginRight: "20px" }} />
                                    <div className="row">
                                        <div className="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                                            {success && "Created post"}
                                            {err && JSON.stringify(err)}
                                            {loading && "Loading..."}
                                            {!loading &&
                                                <CreateForm
                                                    onSubmit={this.onSubmit}
                                                    data={this.state.data}
                                                    originalData={this.props.post}
                                                    onChange={this.onChange}
                                                    onFileChange={this.onFileChange}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    let { postId } = ownProps.match.params;
    let { loading, error, ...post } = state.posts.byIds[postId] || { loading: true };
    return { loading, error, post }
}

export default compose(withRouter, connect(mapStateToProps, { getPost, patchPosts }))(CreatePost);