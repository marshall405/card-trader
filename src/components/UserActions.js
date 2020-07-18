import React, { Component } from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
export default function UserActions() {
    const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Tabs
                value={value}
                onChange={handleChange}
                centered
            >
                <Tab label="Browse All Cards" component={NavLink} to="/browse" />
                <Tab label="Your Cards" component={NavLink} to="/" />
                <Tab label="add new card" component={NavLink} to="/addcard" />
                <Tab label="view cards" />
            </Tabs>
        </div>
    )

}
