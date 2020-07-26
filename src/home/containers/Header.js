import React from 'react'
import { NavLink } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


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

export default function Header(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event, newValue) => {
        props.setValue(newValue);
    };
    return (
        <header>

            < Paper className={classes.root} >
                <NavLink to="/"> <h1>Card Trader</h1> </NavLink>
                <Hidden smDown>
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

                </Hidden>
                <Hidden mdUp>
                    <div>
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
                            <MenuItem className={classes.item} onClick={handleClose} component={NavLink} to="/" >Home</MenuItem>
                            <MenuItem className={classes.item} onClick={handleClose} component={NavLink} to="/cards" >Browse</MenuItem>
                            <MenuItem className={classes.item} onClick={handleClose} component={NavLink} to="/login" >Login</MenuItem>
                            <MenuItem className={classes.item} onClick={handleClose} component={NavLink} to="/signup" >Signup</MenuItem>

                        </Menu>
                    </div>
                </Hidden>
            </Paper >
        </header >
    )
}