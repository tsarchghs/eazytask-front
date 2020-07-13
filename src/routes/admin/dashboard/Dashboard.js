import React from "react";
import Header from "../common/Header";
import NavBar from "../common/NavBar";

import axios from "../../../utils/axios";

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            from: undefined,
            to: undefined,
            payload: undefined,
            err: false
        }
    }
    componentDidMount(){
        this.getStatistics()
    }
    getStatistics = async () => {
        this.setState({ loading: true})
        let query = "";
        let { from, to } = this.state;
        if (from && to) query = `?from=${from}&to=${to}`
        let response = await axios.get("/statistics" + query).catch(err => {
            console.log(err);
            this.setState({ loading: false, err: true })
        })
        let payload = response.data.data;
        this.setState({
            payload,
            loading: false
        }) 
    }
    render(){
        let disabledButton = !this.state.from || !this.state.to
        let { loading, err, payload } = this.state;
        console.log(this.state)
        return (
            <React.Fragment>
                <Header/>
                <NavBar/>
                    <div className="dashboard-wrapper">
                        <div className="container-fluid dashboard-content"></div>
                        { loading && "Loading .."}
                        { !loading && payload &&
                            <React.Fragment>
                            <div style={{marginLeft: "5%", marginTop: "5%"}} className="row">
                                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-inline-block">
                                                        <h5 className="text-muted">Total Users</h5>
                                                        <h2 className="mb-0">{payload.users_count}</h2>
                                                    </div>
                                                    <div className="float-right icon-circle-medium  icon-box-lg  bg-secondary-light mt-1">
                                                        <i className="fa fa-user fa-fw fa-sm text-secondary" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div  className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-inline-block">
                                                        <h5 className="text-muted">Total Askers</h5>
                                                        <h2 className="mb-0">{payload.askers_count}</h2>
                                                    </div>
                                                    <div className="float-right icon-circle-medium  icon-box-lg  bg-secondary-light mt-1">
                                                        <i className="fa fa-user fa-fw fa-sm text-secondary" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div  className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-inline-block">
                                                        <h5 className="text-muted">Total Taskers</h5>
                                                        <h2 className="mb-0">{payload.taskers_count}</h2>
                                                    </div>
                                                    <div className="float-right icon-circle-medium  icon-box-lg  bg-secondary-light mt-1">
                                                        <i className="fa fa-user fa-fw fa-sm text-secondary" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            <div className="row" style={{marginLeft: "5%"}}>
                                <div  className="col-5">
                                    <div className="card">
                                        <div className="card-body">
                                            {

                                            }
                                            <div className="d-inline-block">
                                                {
                                                    Object.keys(payload.category_tasks).map(key => (
                                                        <React.Fragment>
                                                            <h5 className="text-muted">{key}: {payload.category_tasks[key]}</h5>
                                                            <h2 className="mb-0"></h2>
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            </React.Fragment>

                        }   
                        From: <input value={this.state.from} onChange={e => this.setState({ from: e.target.value })} type="date" /> <br/>
                        To: <input value={this.state.to} onChange={e => this.setState({ to: e.target.value })}  type="date" />
                        <button 
                            className="button__style" 
                            type="button"
                            onClick={loading || disabledButton ? undefined : this.getStatistics}
                            style={{ backgroundColor: disabledButton ? "darkgrey" : undefined }}
                        >Search</button>
                    </div>
            </React.Fragment>        
        )
    }
}

export default Dashboard;