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
import BigIcons from "./BigIcons";
import WebEditTask from "./WebEditTask";
import getImageUrl from "../../utils/getImageUrl";

const format_number = val => {
    let num_val = Number(val)
    if (num_val < 0) return "0";
    else return num_val
}

const urltoFile = async (url, filename, mimeType) => {
    let res = await fetch(url)
    let buff = await res.arrayBuffer()
    return new File([buff], filename, { url, type: mimeType + (url ? `,${url}` : "" ) });
    
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
    onChange = key => e => {
        if (key === "description") 
            if (e.target.value.length > 250) return;
        this.setState({ [key]: e.target.value })
    }
    getValueOrInput = key => {
        let value = this.state.data[key] !== undefined ? this.state.data[key] : this.props.task[key];
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
        this.executed_fillGalleryThumbnailState = true;
        let task = this.props.task
        this.setState(prevState => {
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
            return prevState;
        })
    }
    onFileChange = e => {
        e.persist()
        e.preventDefault()
        let file = e.target.files[0]
        if (file) {
            var fr = new FileReader();
            fr.onload = d => {
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
        prevState.imagesUpdated = true;
        prevState.data.thumbnail.value = val
        return prevState;
    })
    onGalleryImageRemove = val => () => this.setState(prevState => {
        prevState.imagesUpdated = true;
        prevState.data.gallery = prevState.data.gallery.filter(obj => obj.value !== val)
        if (prevState.data.thumbnail.value == val) {
            prevState.data.thumbnail.value = undefined;
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
            false
        ) return <Redirect to={"/task/" + this.props.task.id}/>
        if (!this.executed_fillGalleryThumbnailState) this.fillGalleryThumbnailState()
        if (this.props.task.Offers && this.props.task.Offers.length) return <Redirect to={"/task/" + this.props.task.id}/>
        return (
            <React.Fragment>
                <WebEditTask 
                    data={this.state.data}
                    onEdit={this.state.onEdit}
                    onChange={key => e => {
                        if (e.persist) e.persist()
                        if (key === "description")
                            if (e.target.value.length > 250) return;
                        this.setState(prevState => {
                            prevState.data[key] = e.target.value;
                            return { ...prevState, data: { ...prevState.data } }
                        })
                    }}
                    data={this.state.data}
                    task={this.props.task}
                    changeOnEdit={val => () => this.setState({ onEdit: val })}
                    onThumbnailChange={this.onThumbnailChange}
                    onGalleryImageRemove={this.onGalleryImageRemove}
                    onFileChange={this.onFileChange}
                    showUpdateButton={this.showUpdateButton}
                    loading={this.state.loading}
                    updateTask={this.updateTask}
                    translations={this.props.translations}
                    app_lang={this.props.app_lang}
                    goBack={this.props.goBack}
                />

            <div class="hide-on-web">
                {/* Hello world */}
                <div className="awesome">	
                    <div className="edit-task__wrapper">
                    <div className="container">
                        <div className="content">
                            <header className="logo-text">
                                <span onClick={this.props.goBack} className="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
                                <h4 className="hide-on-desktop logo-title">
                                {this.props.translations.text_6[this.props.app_lang]}
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
                                                value={this.state.data.title !== undefined ? this.state.data.title : this.props.task.title}
                                            /> 
                                                <span onClick={e => this.setState({ onEdit: "" })} className="edit-pen">
                                                    <img src="/images/edit-pen.png" alt="" />
                                                </span>
                                        </React.Fragment>
                                        :
                                        <h3>{(this.state.data.title !== undefined ? this.state.data.title : this.props.task.title) || "No title..."}
                                            <span onClick={e => this.setState({ onEdit: "TITLE" })} className="edit-pen">
                                                <img src="/images/edit-pen.png" alt="" />
                                            </span>
                                        </h3>
                                }
                                {
                                    this.state.onEdit === "DESCRIPTION" ?
                                        <React.Fragment>
                                            <p className="special">
                                                {this.state.data.description === undefined ?
                                                    250 - this.props.task.description.length :
                                                    250 - this.state.data.description.length
                                                } Characters left
                                            </p>
                                            <textarea className="register__form_input" onChange={e => e.persist() || this.setState(prevState => {
                                                if (e.target.value.length > 250) return prevState;
                                                prevState.data["description"] = e.target.value;
                                                return prevState;
                                            })}
                                                    value={this.state.data.description !== undefined ? this.state.data.description : this.props.task.description}
                                            />
                                            <span onClick={e => this.setState({ onEdit: "" })} className="edit-pen">
                                                <img src="/images/edit-pen.png" alt="" />
                                            </span>
                                        </React.Fragment>
                                        :
                                        <p>{(this.state.data.description !== undefined ? this.state.data.description : this.props.task.description) || "No description.."}
                                            <span onClick={e => this.setState({ onEdit: "DESCRIPTION" })} className="edit-pen">
                                                <img src="/images/edit-pen.png" alt="" />
                                            </span>
                                        </p>
                                }
                                    {/* <img src="/images/edit-pen.png" alt="" /></span></p> */}
                                </div>
                                {/* <BigIcons
                                    data={this.state.data} 
                                    translations={this.props.translations} 
                                    app_lang={this.props.app_lang} 
                                    task={this.props.task}
                                    onChange={key => e => {
                                        e.persist()
                                        this.setState(prevState => {
                                            prevState.data[key] = e.target.value;
                                            return { ...prevState, data: { ...prevState.data } }
                                        })
                                    }}
                                /> */}
                                <div className="offers-images__layout">
                                    <p className="offers-images__title">{this.props.translations.text_4[this.props.app_lang]}</p>
                                    <div className="offers-images">
                                        {
                                            this.state.data.gallery && this.state.data.gallery.map(obj => {
                                                return (
                                                    <div className={"offers-image image-uploads " + (this.state.data.thumbnail.value == obj.value ? "active" : "")}>
                                                        <img onClick={this.onThumbnailChange(obj.value)} src={getImageUrl(obj.value,"small")} alt="" />
                                                        <h4 onClick={this.onThumbnailChange(obj.value)}>{this.props.translations.text_5[this.props.app_lang]}</h4>
                                                        <span style={{ zIndex: 1 }} onClick={this.onGalleryImageRemove(obj.value)} className="remove-th">X</span>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="offers-image image-uploads empty">
                                            <img onClick={() => this.fileInputRef.click()} src="/images/plus.png" alt="" />
                                            <input ref={ref => this.fileInputRef = ref} onChange={this.onFileChange} id="file-upload-2" type="file" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center edit-task__btngroup">
                                    {/* <Link to={`/task/${this.props.match.params.taskId}/edit/offers`}>
                                        <p>View offers for this task</p>
                                    </Link> */}
                                    {
                                        this.showUpdateButton() ?
                                            (
                                                this.state.loading ? <button className="button__style small">{this.props.translations.text_8[this.props.app_lang]}</button> :
                                                    <button onClick={this.updateTask} className="button__style small">{this.props.translations.text_7[this.props.app_lang]}</button>
                                            )
                                            : null
                                    }
                                    
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </React.Fragment>

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
        auth: state.auth[GET_AUTH],
        translations: state.app_lang.data["/task-edit"],
        app_lang: state.app_lang.app_lang,
        common: state.app_lang.common
    
    }
}

export default compose(withRouter,connect(mapStateToProps, { getTask, postOffers, updateTask }))(EditTask);