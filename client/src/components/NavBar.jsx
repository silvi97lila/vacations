import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar=()=>{
    return(
        <div className="home-nav col-md-4">
            <ul className="navbar-nav flex-column ">
                <li className="nav-item">
                    <NavLink exact to="/home" className="nav-link nv" activeclassname="active">
                        <p>
                            Show Enable Proposals
                        </p>
                        </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/home/add-vacations" className="nav-link nv" activeclassname="active">
                        <p>
                            Request Vacations
                        </p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/home/add-daysoff" className="nav-link nv" activeclassname="active">
                        <p>
                            Request Days Off
                        </p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/home/add-compensationday" className="nav-link nv" activeclassname="active">
                        <p>
                            Request Compensation Day
                        </p>
                    </NavLink>
                </li>
                <li className="nav-item" >
                    <span className="glyphicon glyphicon-log-out"></span>
                    <NavLink to="/logout" className="nav-link nv" >
                        <p>
                            Logout
                        </p>
                    </NavLink>
                </li>
            </ul>
        </div>
);
}

export default NavBar
