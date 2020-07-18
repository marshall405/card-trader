import React, { Component } from 'react'


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
export default function UserActions() {
    const [value, setValue] = React.useState(0);

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
                <Tab label="Browse" />
                <Tab label="add new card" />
                <Tab label="view cards" />
            </Tabs>
        </div>
    )

}
