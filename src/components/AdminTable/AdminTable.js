import React from "react";
import { Link } from "react-router-dom";

function truncate(str, n) {
    if (!str) return;
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
};

export default ({ resource_name_singular, resource_name_plural, fields, items, onDelete }) => {
    return (
        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                    <div style={{ marginTop: "20px", marginRight: "20px" }}>
                        <Link to={`/admin/${resource_name_plural}/create`}>
                            <p className="btn btn-primary float-right">
                                Add new {resource_name_singular}
                            </p>
                        </Link>
                        <h5 className="card-header">List of all {resource_name_plural}</h5>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    {
                                        fields.map(field_name => (
                                            <th scope="col">{field_name == "id" ? "#" : field_name}</th>
                                        ))
                                    }
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map(item => (
                                        <tr id={item.id}>
                                            {
                                                Object.keys(item).map(key => (
                                                    <td>{truncate(item[key],30)}</td>
                                                ))
                                            }
                                            <td>
                                                <div className="dd-nodrag btn-group ml-auto">
                                                    <Link to={`/admin/${resource_name_plural}/${item.id}/edit`}>
                                                        <button className="btn btn-sm btn-outline-light">
                                                            Edit
                                                        </button>
                                                    </Link>
                                                    <button onClick={onDelete(item.id)} className="btn btn-sm btn-outline-light">
                                                        <i className="far fa-trash-alt" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <center>
                                    {!items.length && `No ${resource_name_plural} to show.`}
                                </center>
                            </tbody>
                        </table>
                        {/* <center>
                            <p
                                className="btn btn-primary"
                                style={{ marginTop: "3px" }}
                            >
                                Load more
            </p>
                        </center> */}
                    </div>
                </div>
            </div>
        </div>
    )
}