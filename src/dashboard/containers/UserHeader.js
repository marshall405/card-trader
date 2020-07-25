import React from 'react'
import { NavLink } from "react-router-dom";

import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';

export default function UserHeader(props) {
    const handleChange = (event, newValue) => {
        props.setActionValue(1);
    };
    return (
        <header className="user-header-container">

            < Paper className="user-header" >
                <NavLink to="/dashboard" onClick={() => handleChange(this, 0)}> <h2>{window.localStorage.getItem("username")}</h2> </NavLink>

                <Tab label="Logout" component={NavLink} to="/logout" />
            </Paper >
        </header >
    )
}