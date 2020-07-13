import React from "react";

export default props => {
    return (
        <div className="dashboard-header">
            <nav className="navbar navbar-expand-lg bg-white fixed-top">
                <a
                    className="navbar-brand"
                    href="#"
                    src="/images/logo.svg"
                >
                    <img src="/images/logo.svg" />
                </a>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav ml-auto navbar-right-top">
                        <p
                            className="btn btn-primary float-right"
                            style={{ marginTop: "12px" }}
                        >
                            Visit as user
                        </p>
                        <li className="nav-item dropdown nav-user">
                            <p
                                className="nav-link nav-user-img"
                                id="navbarDropdownMenuLink2"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOo9ftjYQCU8HW1YByx0oAQdegRxO51mQN0tKKenGRnDZb-_D6"
                                    className="user-avatar-md rounded-circle"
                                />
                            </p>
                            <div
                                className="dropdown-menu dropdown-menu-right nav-user-dropdown "
                                aria-labelledby="navbarDropdownMenuLink2"
                            >
                                <div className="nav-user-info">
                                    <h5 className="mb-0 text-white nav-user-name">admin</h5>
                                    <span className="status" />
                                    <span className="ml-2">Available</span>
                                </div>
                                <p className="dropdown-item" href="#">
                                    <i className="fas fa-user mr-2" />
                                    Account
                                </p>
                                <a href="/admin/settings">
                                    <p className="dropdown-item" href="#">
                                        <i className="fas fa-cog mr-2" />
                                    Setting
                                    </p>
                                </a>
                                <p className="dropdown-item" href="#">
                                    <i className="fas fa-power-off mr-2" />
                                    Logout
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}