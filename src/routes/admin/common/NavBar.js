import React from "react";
import { Link } from "react-router-dom";

export default props => {
    return (
        <div className="nav-left-sidebar sidebar-dark">
            <div className="menu-list">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <a className="d-xl-none d-lg-none">Dashboard</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav flex-column">
                            <li className="nav-divider">Menu</li>
                            <li className="nav-item ">
                                <a href="/admin/dashboard" />
                                <a
                                    className="nav-link light-gray "
                                    aria-expanded="false"
                                    data-target="#submenu-2"
                                >
                                    <i className="fas fa-desktop" />
                                Dashboard
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a href="/admin/posts" />
                                <Link to="/admin/posts" className="nav-link light-gray">
                                    <i className=" fas fa-mobile-alt" />
                                    Posts
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}