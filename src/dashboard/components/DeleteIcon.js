import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button'
import SvgIcon from '@material-ui/core/SvgIcon'
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
    root: {
        color: '#925252',
        '&:hover': {
            color: 'red'
        }
    }
});

export default function DeleteIcon(props) {
    const classes = useStyles();
    return (
        <Tooltip title="Delete">
            <Button size="small" className={classes.root} onClick={props.deleteCard}>
                <SvgIcon>
                    <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                    </svg>
                </SvgIcon>
            </Button>
        </Tooltip>
    )
}
