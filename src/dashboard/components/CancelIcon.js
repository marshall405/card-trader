import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles({
    root: {
        '&:hover': {
            color: 'red'
        }
    }
});

export default function CancelIcon(props) {
    const classes = useStyles()
    return (
        <Tooltip title="Cancel">
            <Button type={props.type || null} size="small" className={classes.root} onClick={props.cancel}>
                <SvgIcon>
                    <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z" />
                    </svg>
                </SvgIcon>
            </Button>
        </Tooltip>
    )
}
