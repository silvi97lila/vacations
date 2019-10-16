import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar=()=>{
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" >
            <ul className="navbar-nav">
                <li className="nav-item">
                    <h2>Admin Panel</h2>
                </li>
                <li className="nav-item">
                <NavLink exact to="/admin" className="nav-link">
                    <b>Vacations</b>
                </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin/days-off" className="nav-link"><b> Days Off</b></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin/compensation-day" className="nav-link"><b> Compensation Day</b></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin/register" className="nav-link"> <b> Register New User</b></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/logout" className="nav-link"><b> Logout</b></NavLink>
                </li>
            </ul>
        </div>
        </nav>
);
}

export default NavBar
