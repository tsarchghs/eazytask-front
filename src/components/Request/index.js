import React from "react";
import axios from "../../utils/axios";

class Request extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: undefined,
            data: undefined,
            error: undefined
        }
        this.methodTypes = [ "POST", "GET", "DELETE", "PATCH", "PUT" ]
        if (this.methodTypes.indexOf(props.method) === -1) {
            throw new Error(`CustomAppError: Invalid type ([ "POST", "GET", "DELETE", "PATCH", "PUT" ])`)
        }
    }
    sendRequest = (options,updateCacheOnly) => {
        if (!updateCacheOnly) this.setState({
            loading: true
        })
        axios(options).then(data => {
            // window.cacheClient.storeRequest(options, data)
            this.setState({ data: data.result || data, loading: false })
        }).catch(error => {
            if (!updateCacheOnly) this.setState({ loading: false, error })
        })
    }
    componentDidMount(){
        let options = {
            method: this.props.method,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                ...this.props.headers
            },
            data: this.props.data,
            url: window.__API_ENDPOINT__ + this.props.path
        }
        console.log(window.__API_ENDPOINT__ + this.props.path)
        // try {
        //     let cache = window.cacheClient.getRequest(options)
        //     console.log({cache})
        //     this.setState({ loading: false, error: undefined, data: cache.result || cache })
        //     this.sendRequest(options,true)
        // } catch (err){
        //     this.sendRequest(options)
        // }
        this.sendRequest(options)
    }
    render(){
        return this.props.children(this.state)
    }
}

export default Request;
