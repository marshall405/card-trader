import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
    root: {
        borderRadius: '5px',
        '&:hover': {
            color: '#1f59b1',
            backgroundColor: 'rgba(0,0,255,.1)'
        }
    }
}));

export default function Filter(props) {
    const classes = useStyles();

    const handleCategoryChange = (event) => {
        props.setCategory(event.target.value)
    };
    const handleConditionChange = (event) => {
        props.setCondition(event.target.value)
    };

    return (
        <div className="filter">
            <div>
                <FormLabel component="legend">Category</FormLabel>
                <RadioGroup aria-label="categories" name="categories" value={props.category} onChange={handleCategoryChange}>
                    <FormControlLabel className={classes.root} value="All" control={<Radio />} label="All" />
                    <FormControlLabel className={classes.root} value="Football" control={<Radio />} label="Football" />
                    <FormControlLabel className={classes.root} value="Basketball" control={<Radio />} label="Basketball" />
                    <FormControlLabel className={classes.root} value="Baseball" control={<Radio />} label="Baseball" />
                </RadioGroup>
            </div>
            <div>
                <FormLabel component="legend">Condition</FormLabel>
                <RadioGroup aria-label="conditions" name="conditions" value={props.condition} onChange={handleConditionChange}>
                    <FormControlLabel className={classes.root} value="All" control={<Radio />} label="All" />
                    <FormControlLabel className={classes.root} value="Brand New" control={<Radio />} label="Brand New" />
                    <FormControlLabel className={classes.root} value="Like New" control={<Radio />} label="Like New" />
                    <FormControlLabel className={classes.root} value="Very Good" control={<Radio />} label="Very Good" />
                    <FormControlLabel className={classes.root} value="Acceptable" control={<Radio />} label="Acceptable" />
                    <FormControlLabel className={classes.root} value="Not Specified" control={<Radio />} label="Not Specified" />
                </RadioGroup>
            </div>
        </div>
    )

}