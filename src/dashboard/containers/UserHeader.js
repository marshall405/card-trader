import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';

export default function UserHeader(props) {
    const [light, setLight] = useState(true)
    const handleChange = (event, newValue) => {
        props.setActionValue(1);
    };

    const logoLight = () => {
        setLight(!light)
    }
    return (
        <header className="user-header-container">

            < Paper className="user-header" >
                <NavLink to="/dashboard" onClick={() => handleChange(this, 0)}> <h2 id="user-logo" className={light ? "user-logo-light" : "user-logo"}>{window.localStorage.getItem("username")}</h2> </NavLink>

                <Tab label="Logout" component={NavLink} to="/logout" className="user-logout" onMouseEnter={logoLight} onMouseLeave={logoLight} />
            </Paper >
        </header >
    )
}