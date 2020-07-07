import React from "react";
import { connect } from "react-redux";
import { getTask } from "../../actions/task";
import { updateTask } from "../../actions/app";
import { postOffers } from "../../actions/offer";
import Loading from "../../components/loading";
import { Redirect, withRouter, Link } from "react-router-dom"
import { v4 } from "uuid";
import { GET_AUTH } from "../../actionTypes";
import { debounce } from "lodash";
import E404 from "../E404";
import { compose } from "recompose";

const format_number = val => {
    let num_val = Number(val)
    if (num_val < 0) return "0";
    else return num_val
}

function urltoFile(url, filename, mimeType) {
    if (true) url = url
    return (fetch(url)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
}

class EditTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            onEdit: "",
            data: {
                
            },
            imagesUpdated: false,
            loading: false
        }
        this.executed_fillGalleryThumbnailState = false;
    }
    componentDidMount() {
        this.props.getTask(this.props.match.params.taskId, "fields=question,user,offers,category")
    }
    setStep = step => () => this.setState({ step })
    onChange = key => e => this.setState({ [key]: e.target.value })
    getValueOrInput = key => {
        let value = this.state.data[key] || this.props.task[key];
        if (this.state.onEdit === key) {
            const handleOnChange = e => {
                e.persist();
                this.setState(prevState => {
                    prevState.data[key] = e.target.value;
                    return prevState;
                })
            }
            return (
                <React.Fragment>
                    <input value={this.state.data[key]} onChange={handleOnChange} />
                    <button onClick={e => this.setState({ onEdit: "" })}>Done</button>
                </React.Fragment>
            )
        } else {
            const handleOnClick = () => this.setState(prevState => {
                prevState.onEdit = key;
                console.log("prevState.data[key]", prevState.data[key])
                if (!prevState.data[key]) prevState.data[key] = this.props.task[key]
                return prevState;
            })
            return <React.Fragment>
                {value}
                <button onClick={handleOnClick}>Edit</button>
            </React.Fragment>
        }
        
    }
    fillGalleryThumbnailState = () => {
        // if (!this.props.task.gallery) return;
        console.log("fillGalleryThumbnailState")
        this.executed_fillGalleryThumbnailState = true;
        let task = this.props.task
        this.setState(prevState => {
            console.log(task,"tasktask")
            prevState.data.gallery = task.gallery ? task.gallery.split(",") : []
            prevState.data.gallery = prevState.data.gallery.map(url => ({
                type: "SOURCE",
                value: url
            }))
            prevState.data.thumbnail = {
                type: "SOURCE",
                value: task.thumbnail
            }
            if (task.thumbnail){
                prevState.data.gallery.push({
                    type: "SOURCE",
                    value: task.thumbnail
                });
            }
            console.log("prevState.data.gallery", prevState.data.gallery)
            return prevState;
        })
    }
    onFileChange = e => {
        console.log("EREEEE")
        e.persist()
        e.preventDefault()
        let file = e.target.files[0]
        if (file) {
            var fr = new FileReader();
            fr.onload = d => {
                console.log("ON_LOAD")
                let src = d.srcElement.result;
                let key = v4()
                let image = { type: "FILE", value: src, key, file }
                this.setState(prevState => {
                    if (prevState.data.gallery.find(obj => obj.key == key)) return prevState;
                    prevState.data.gallery.push(image);
                    prevState.imagesUpdated = true;
                    e.target.value = null;
                    return prevState;
                })
            }
            fr.readAsDataURL(file);
        }
    }
    updateTask = async () => {
        console.log("UPDATE_TASK::",this.state.data);
        this.setState({ loading: true })
        let { gallery, thumbnail, ...rest } = this.state.data;
        let data = { ...rest }
        if (this.state.imagesUpdated || true) {
            data.gallery = gallery.filter(x => x.value !== thumbnail.value)
            let temp_gallery = []
            for (let image of data.gallery){
                temp_gallery.push(await urltoFile(image.value, v4(), "image/jpg"))
            }
            data.gallery = temp_gallery;
            // data.thumbnail = thumbnail.type == "SOURCE" ? urltoFile(thumbnail.value,v4(),"image/jpg") : thumbnail.file
            if (thumbnail.value) data.thumbnail = await urltoFile(thumbnail.value, v4(), "image/jpg")
            else data.remove_thumbnail = true
            if (data.gallery.length == 0) data.remove_gallery = true
        }
        console.log({data},55)
        this.props.updateTask({
            id: this.props.match.params.taskId,
            data
        })
        // this.setState({ data: {}, onEdit: "" })
        setTimeout( () => {
            window.location.replace("")
        }, 1000)
    }
    onThumbnailChange = val => () => this.setState(prevState => {
        console.log("onThumbnailChangeonThumbnailChange")
        prevState.imagesUpdated = true;
        prevState.data.thumbnail.value = val
        return prevState;
    })
    onGalleryImageRemove = val => () => this.setState(prevState => {
        prevState.imagesUpdated = true;
        prevState.data.gallery = prevState.data.gallery.filter(obj => obj.value !== val)
        if (prevState.data.thumbnail.value == val) {
            prevState.data.thumbnail.value = undefined;
            console.log("prevState.data.thumbnail.value = undefined;")
        }
        return prevState;
    })
    showUpdateButton = () => {
        let { gallery, thumbnail, ...rest } = this.state.data;
        return Object.keys(rest).length || this.state.imagesUpdated;
    }
    toggleOptions = () => {
        if (this.state.settingsOpen) return () => this.setState({ settingsOpen: false });
        return () => this.setState({ settingsOpen: true})
    }
    render = () => {
        if (this.props.loading || this.props.auth.loading) return <Loading />
        if (
            (this.props.own_user && this.props.own_user.id !== this.props.task.User.id) || 
            this.props.auth.isAuthenticated === false
        ) return <Redirect to={"/task/" + this.props.task.id}/>
        if (!this.executed_fillGalleryThumbnailState) this.fillGalleryThumbnailState()
        console.log("this.stateee",this.state)
        return (
            <div>
                {/* Hello world */}
                <div className="awesome">	
                    <div className="edit-task__wrapper">
                    <div className="container">
                        <div className="content">
                            <header className="logo-text">
                                <span onClick={() => this.props.history.push("/dashboard")} className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                                <h4 className="hide-on-desktop logo-title">
                                    Edit task
                                    <div className="touchable">
                                        <img onClick={debounce(this.toggleOptions(),10)} src="/images/more.png" style={{ width: '18px' }} alt="" />
                                        <div className={"touchable__content " + (this.state.settingsOpen ? "show" : "")}>
                                            <div className="flex aic jcsb"><p>Delete</p> <img src="/images/trash.png" alt="" /></div>
                                            <div className="flex aic jcsb"><p>Deactivate</p> <img src="/images/sleep.png" alt="" /></div>
                                        </div>
                                    </div>
                                </h4>
                            </header>
                            <section className="tasker-profile">
                                <div className=" edit-task__title">
                                {
                                    this.state.onEdit === "TITLE" ?
                                        <React.Fragment>
                                            <input onChange={e => e.persist() || this.setState(prevState => {
                                                    prevState.data["title"] = e.target.value;
                                                    return prevState;
                                                })}
                                                className="register__form_input"
                                                value={this.state.data.title || this.props.task.title}
                                            /> 
                                                <span onClick={e => this.setState({ onEdit: "" })} className="edit-pen">
                                                    <img src="/images/edit-pen.png" alt="" />
                                                </span>
                                        </React.Fragment>
                                        :
                                        <h3>{this.state.data.title || this.props.task.title}
                                            <span onClick={e => this.setState({ onEdit: "TITLE" })} className="edit-pen">
                                                <img src="/images/edit-pen.png" alt="" />
                                            </span>
                                        </h3>
                                }
                                {
                                    this.state.onEdit === "DESCRIPTION" ?
                                        <React.Fragment>
                                            <input className="register__form_input" onChange={e => e.persist() || this.setState(prevState => {
                                                prevState.data["description"] = e.target.value;
                                                return prevState;
                                            })}
                                                    value={this.state.data.description || this.props.task.description}
                                            />
                                            <span onClick={e => this.setState({ onEdit: "" })} className="edit-pen">
                                                <img src="/images/edit-pen.png" alt="" />
                                            </span>
                                        </React.Fragment>
                                        :
                                        <h3>{this.state.data.description || this.props.task.description}
                                            <span onClick={e => this.setState({ onEdit: "DESCRIPTION" })} className="edit-pen">
                                                <img src="/images/edit-pen.png" alt="" />
                                            </span>
                                        </h3>
                                }
                                    {/* <img src="/images/edit-pen.png" alt="" /></span></p> */}
                                </div>
                                <div className="big-icons">
                                    <div className="big-icon">
                                        <div className="flex-grow">
                                            <img src="/images/inter.png" alt="" />
                                        </div>
                                        <p>Active until</p>
                                        <h5>{new Date(this.props.task.due_date).toLocaleDateString().replace(/\//g, ".")}</h5>
                                    </div>
                                    <div className="big-icon">
                                        <div className="flex-grow">
                                            <img src="/images/pins.png" alt="" />
                                        </div>
                                        <p>{this.props.task.city}</p>
                                        <h5>{this.props.task.zipCode}</h5>
                                    </div>
                                    <div className="big-icon">
                                        <div className="flex-grow">
                                            <img src="/images/shop.png" alt="" />
                                        </div>
                                        <p>Price</p>
                                        <h5>CHF {this.props.task.expected_price}.-</h5>
                                    </div>
                                    <div className="big-icon">
                                        <div className="flex-grow">
                                            <img src="/images/house.png" alt="" />
                                        </div>
                                        <p>Type</p>
                                        <h5>{this.props.task.Category.name}</h5>
                                    </div>
                                </div>
                                <div className="offers-images__layout">
                                    <p className="offers-images__title">Gallery</p>
                                    <div className="offers-images">
                                        {
                                            this.state.data.gallery && this.state.data.gallery.map(obj => {
                                                return (
                                                    <div className={"offers-image image-uploads " + (this.state.data.thumbnail.value == obj.value ? "active" : "")}>
                                                        <img onClick={this.onThumbnailChange(obj.value)} src={obj.value} alt="" />
                                                        <h4 onClick={this.onThumbnailChange(obj.value)}>Thumbnail</h4>
                                                        <span style={{ zIndex: 1000000 }} onClick={this.onGalleryImageRemove(obj.value)} className="remove-th">X</span>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="offers-image image-uploads empty">
                                            <img onClick={() => this.fileInputRef.click()} src="/images/plus.png" alt="" />
                                            <input ref={ref => this.fileInputRef = ref} onChange={this.onFileChange} id="file-upload-2" type="file" />
                                        </div>
                                                    {/* <React.Fragment>
                                                        <div>
                                                            {this.state.data.thumbnail.value == obj.value && <div onClick={this.onThumbnailChange(obj.value)}><h2>Thumbnail</h2></div>}
                                                            {this.state.data.thumbnail.value != obj.value && <div onClick={this.onThumbnailChange(obj.value)}><h2>Set thumbnail</h2></div>}
                                                            <img width={50} src={obj.value} alt="" />
                                                        </div>
                                                        <div
                                                            onClick={this.onGalleryImageRemove(obj.value)}
                                                            style={{ zIndex: 1000000 }}
                                                        >X</div>
                                                    </React.Fragment> */}
                                        {/* <div className="offers-image image-uploads active">
                                            <img src="/images/ustah.jpeg" alt="" />
                                            <h4>Thumbnail</h4>
                                            <span className="remove-th">X</span>
                                        </div>
                                        <div className="offers-image image-uploads ">
                                            <img src="/images/ustah.jpeg" alt="" />
                                            <h4>Thumbnail</h4>
                                            <span className="remove-th">X</span>
                                        </div>
                                        <div className="offers-image image-uploads ">
                                            <img src="/images/ustah.jpeg" alt="" />
                                            <h4>Thumbnail</h4>
                                            <span className="remove-th">X</span>
                                        </div>
                                        <div className="offers-image image-uploads empty">
                                            <img src="/images/plus.png" alt="" />
                                        </div> */}
                                    </div>
                                </div>
                                <div className="text-center edit-task__btngroup">
                                    <Link to={`/task/${this.props.match.params.taskId}/edit/offers`}>
                                        <p>View offers for this task</p>
                                    </Link>
                                    {
                                        this.showUpdateButton() ?
                                            (
                                                this.state.loading ? <button className="button__style small">Saving..</button> :
                                                    <button onClick={this.updateTask} className="button__style small">Save</button>
                                            )
                                            : null
                                    }
                                    
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                    {/* <label htmlFor="name">Enter your name: </label>
                    <input type="text" id="name" /> */}
                </div>
                {/* <p>Enter your HTML here</p> */}
            </div>

        )
        return (
            <div>
                <br />
                {/* {JSON.stringify(this.props.task)} <br /><br /> */}
                Title - {this.getValueOrInput("title")} <br />
                Description - {this.getValueOrInput("description")}<br /> <br />

                Location - { this.props.task.zipCode}, { this.props.task.city} <br />
                Price - { this.props.task.expected_price} CH <br />
                Category -  { this.props.task.Category.name} <br /> <br />

                {/* Thumbnail - {this.props.task.thumbnail ? <img width={100} src={this.props.task.thumbnail} /> : "None"} <br /> <br /> */}
                {/* Gallery - {this.props.task.gallery && this.props.task.gallery.split(",").map(src => (
                    <img src={src} width={100} />
                ))}<br/> */}
                {
                    this.state.data.gallery && this.state.data.gallery.map(obj => {
                        return (
                            <React.Fragment>
                                <div>
                                    {this.state.data.thumbnail.value == obj.value && <div onClick={this.onThumbnailChange(obj.value)}><h2>Thumbnail</h2></div>}
                                    {this.state.data.thumbnail.value != obj.value && <div onClick={this.onThumbnailChange(obj.value)}><h2>Set thumbnail</h2></div>}
                                    <img width={50} src={obj.value} alt="" />
                                </div>
                                <div
                                    onClick={this.onGalleryImageRemove(obj.value)}
                                    style={{ zIndex: 1000000 }}
                                >X</div>
                            </React.Fragment>
                        )
                    })
                }<br />
                <label>
                    Add image: <input onChange={this.onFileChange} type="file"/>
                </label>
                <br /><br />
                <Link to={`/task/${this.props.match.params.taskId}/edit/offers`}>
                    <h6>View offers for this task</h6>
                </Link>
                { 
                    this.showUpdateButton() ? 
                    (
                        this.props.updateTask.loading ? "Loading" :
                        <button onClick={this.updateTask}>Update</button> 
                    )
                    : null
                }

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let { taskId } = ownProps.match.params
    let { error, loading, ...task } = state.tasks.byIds[taskId] || { loading: true }
    let own_user = state.auth.profile;
    return { 
        error,
        loading,
        own_user,
        task: task || {},
        updateTask: state.updateTask,
        auth: state.auth[GET_AUTH]
    }
}

export default compose(withRouter,connect(mapStateToProps, { getTask, postOffers, updateTask }))(EditTask);