import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexGrow: 1,
    },
});

export default function UserHeader() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
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