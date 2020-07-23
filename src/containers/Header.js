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

export default function Header(props) {
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        props.setValue(newValue);
    };
    return (
        <header>

            < Paper className={classes.root} >
                <NavLink to="/"> <h1>Sports Card Trading</h1> </NavLink>
                <Tabs
                    value={props.value}
                    onChange={handleChange}
                    centered
                >
                    <Tab label="home" component={NavLink} to="/" />
                    <Tab className="nav-link" label="Browse" component={NavLink} to="/cards" />
                    <Tab label="Login" component={NavLink} to="/login" />
                    <Tab label="Signup" component={NavLink} to="/signup" />
                </Tabs>
            </Paper >
        </header >
    )
}