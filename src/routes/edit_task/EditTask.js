import React from "react";
import { connect } from "react-redux";
import { getTask } from "../../actions/task";
import { updateTask } from "../../actions/app";
import { postOffers } from "../../actions/offer";
import Loading from "../../components/loading";
import { Redirect } from "react-router-dom"
import { v4 } from "uuid";
import E404 from "../E404";

const format_number = val => {
    let num_val = Number(val)
    if (num_val < 0) return "0";
    else return num_val
}

function urltoFile(url, filename, mimeType) {
    if (true) url = "https://i.imgur.com/fHyEMsl.jpg"
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
                prevState.data.gallery.push(task.thumbnail);
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
    render = () => {
        if (this.props.loading) return <Loading />
        if (this.props.own_user && this.props.own_user.id !== this.props.task.User.id) return <Redirect to={"/task/" + this.props.task.id}/>
        if (!this.executed_fillGalleryThumbnailState) this.fillGalleryThumbnailState()
        console.log("this.stateee",this.state)
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


                { 
                    Object.keys(this.state.data).length ? 
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
    return { error, loading, own_user, task: task || {}, updateTask: state.updateTask }
}

export default connect(mapStateToProps, { getTask, postOffers, updateTask })(EditTask);