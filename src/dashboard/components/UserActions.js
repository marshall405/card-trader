import React, { Component } from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
export default function UserActions(props) {
    // const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => {
        props.setActionValue(newValue);
    };
    return (
        <div className="user-actions">
            <Tabs
                value={props.action}
                onChange={handleChange}
                centered
            >
                <Tab label="Browse All Cards" component={NavLink} to="/dashboard/browse" />
                <Tab label="Your Cards" component={NavLink} to="/dashboard" />
                <Tab label="add new card" component={NavLink} to="/dashboard/addcard" />
                <Tab label="view trade requests" component={NavLink} to="/dashboard/trades" />
                <Tab label="view offers" component={NavLink} to="/dashboard/offers" />
            </Tabs>
        </div>
    )

}
