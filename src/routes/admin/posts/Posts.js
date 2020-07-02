import React from "react";
import Header from "../common/Header";
import NavBar from "../common/NavBar";
import AdminTable from "../../../components/AdminTable";
import { connect } from "react-redux";
import { getPosts, deletePosts } from "../../../actions/posts";

class Posts extends React.Component {
    componentDidMount(){
        this.props.getPosts()
    }
    render(){
        let { loading, posts } = this.props;
        return (
            <React.Fragment>
                <Header/>
                <NavBar/>
                        <div className="dashboard-wrapper">
                            <div className="container-fluid dashboard-content">
                                <div className="row" />
                                <div className="page-header" style={{ marginTop: "60px" }}>
                                    {/* <div className="input-group col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by name"
                                        />
                                        <div className="input-group-append">
                                            <button type="submit" className="btn btn-primary">
                                                Search
                                            </button>
                                        </div>
                                    </div> */}
                                </div>
                                    { loading && "Loading" }
                                    { !loading && 
                                        <AdminTable 
                                            resource_name_singular="post" 
                                            resource_name_plural="posts" 
                                            fields={[ "id", "title", "content", "thumbnail", "createdAt", "updatedAt" ]}
                                            onDelete={id => () => {
                                                console.log(123);
                                                this.props.deletePosts(id)
                                            }}
                                            items={posts}
                                        />
                                    }
                            </div>
                        </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.allIds.map(id => state.posts.byIds[id]),
    loading: state.posts.loading
})
export default connect(mapStateToProps, { getPosts, deletePosts })(Posts);