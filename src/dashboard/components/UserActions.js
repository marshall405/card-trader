import React from 'react'
import { NavLink } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const useStyles = makeStyles({
    root: {
        display: "flex",
        padding: "0px 10px"
    },
    item: {
        width: "200px",
        color: "#1f59b1",
        "&:hover": {
            color: "red"
        }
    }
});




export default function UserActions(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChange = (event, newValue) => {
        props.setActionValue(newValue);
    };
    return (
        <div className="user-actions">
            <Hidden smDown>
                <Tabs
                    value={props.action}
                    onChange={handleChange}
                    centered
                >
                    <Tab label="Browse All Cards" component={NavLink} to="/dashboard/browse" />
                    <Tab label="My Cards" component={NavLink} to="/dashboard" />
                    <Tab label="add new card" component={NavLink} to="/dashboard/addcard" />
                    <Tab label="view pending trades" component={NavLink} to="/dashboard/trades" />
                    <Tab label="view offers" component={NavLink} to="/dashboard/offers" />
                </Tabs>
            </Hidden>
            <Hidden mdUp>

                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <SvgIcon><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></SvgIcon>
                </IconButton>
                <Menu
                    className={classes.menu}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem className={classes.item} onClick={handleClose} component={NavLink} to="/dashboard/browse" >Browse All Cards</MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose} component={NavLink} to="/dashboard" >My Cards</MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose} component={NavLink} to="/dashboard/addcard" >Add New Card</MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose} component={NavLink} to="/dashboard/trades" >View Pending Trades</MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose} component={NavLink} to="/dashboard/offers" >View Offers</MenuItem>

                </Menu>

            </Hidden>
        </div>
    )

}
