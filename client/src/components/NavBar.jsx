import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar=()=>{
    return(
        <div className="home-nav col-md-4">
            <ul className="navbar-nav flex-column ">
                <li className="nav-item">
                    <NavLink exact to="/home" className="nav-link">Show Enable Proposals</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/home/add-vacations" className="nav-link">Request Vacations</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/home/add-daysoff" className="nav-link" >Request Days Off</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/home/add-compensationday" className="nav-link">Request Compensation Day</NavLink>
                </li>
                <li className="nav-item">
                    <span className="glyphicon glyphicon-log-out"></span>
                    <NavLink to="/logout" className="nav-link" >
                        Logout
                    </NavLink>
                </li>
            </ul>
        </div>
);
}

export default NavBar
