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

export default function UserHeader(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState();
    console.log(props)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <header>

            < Paper className={classes.root} >
                <NavLink to="/dashboard/allcards" onClick={() => handleChange(this, 0)}> <h2>{props.name}</h2> </NavLink>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                >
                    <Tab label="Logout" component={NavLink} to="/logout" />

                </Tabs>
            </Paper >
        </header >
    )
}