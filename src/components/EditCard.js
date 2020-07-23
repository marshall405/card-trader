import React, { useState } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import TextField from '@material-ui/core/TextField';

import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';

const editCardURL = "http://localhost:3001/cards/"
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: 250,
        },
    },
}));


export default function EditCard(props) {
    console.log(props)
    const history = useHistory()
    const classes = useStyles()
    const [condition, setCondition] = useState(props.card.condition);
    console.log(condition)
    const [category, setCategory] = useState(props.card.category);
    const [errors, setErrors] = useState("")
    const [success, setSuccess] = useState(false)
    const handleChange = (event) => {
        switch (event.target.name) {
            case "condition":
                setCondition(event.target.value)
                break;
            case "category":
                setCategory(event.target.value);
                break;
            default:
                break;
        }
    };
    const handleSubmit = e => {
        const jwt = window.localStorage.getItem("jwt")
        e.preventDefault()
        let { first_name, last_name, team, year, condition, category } = e.target
        fetch(editCardURL + props.card.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': `bearer: ${jwt}`
            },
            body: JSON.stringify({
                first_name: first_name.value.trim(),
                last_name: last_name.value.trim(),
                team: team.value.trim(),
                year: year.value.trim(),
                condition: condition.value,
                category: category.value
            })
        })
            .then(res => res.json())
            .then(card => {
                if (card.errors) {
                    setErrors(card.errors)
                } else {
                    setSuccess(true)
                    props.updateCard(card)
                    setTimeout(() => history.push("/dashboard"), 500)
                }
            })
    }
    return (
        <div>
            <h1 className="page-title"> Edit Card</h1>
            <h3> Card Details </h3>
            <div className="new-card-form">
                {
                    errors ?
                        <h5> {errors}</h5>
                        :
                        null
                }
                {
                    success ?
                        <h5> Card successfully updated!</h5>
                        :
                        null
                }
                <div className="edit-card-image-container">
                    <img src={props.card.img_url} className="edit-card-image" />
                </div>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="player-form">
                        <TextField
                            required
                            defaultValue={props.card.first_name}
                            id="standard-full-width"
                            label="Player"
                            name="first_name"
                            style={{ margin: 8 }}
                            placeholder="First Name"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            required
                            defaultValue={props.card.last_name}
                            id="standard-full-width"
                            label="Player"
                            style={{ margin: 8 }}
                            name="last_name"
                            placeholder="Last Name"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            required
                            defaultValue={props.card.team}
                            id="standard-full-width"
                            label="Team"
                            style={{ margin: 8 }}
                            placeholder="Team"
                            name="team"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            required
                            defaultValue={props.card.year}
                            id="standard-full-width"
                            label="Year"
                            name="year"
                            style={{ margin: 8 }}
                            placeholder="YYYY"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className="radio-container">
                        <div>
                            <FormLabel required component="legend">Condition</FormLabel>
                            <RadioGroup required aria-label="condition" name="condition" value={condition} onChange={handleChange}>
                                <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
                                <FormControlLabel value="Good" control={<Radio />} label="Good" />
                                <FormControlLabel value="Fair" control={<Radio />} label="Fair" />
                                <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
                            </RadioGroup>
                        </div>
                        <div>
                            <FormLabel required component="legend">Sport</FormLabel>
                            <RadioGroup required aria-label="sport" name="category" value={category} onChange={handleChange}>
                                <FormControlLabel value="Basketball" control={<Radio />} label="Basketball" />
                                <FormControlLabel value="Football" control={<Radio />} label="Football" />
                                <FormControlLabel value="Baseball" control={<Radio />} label="Baseball" />
                            </RadioGroup>
                        </div>
                    </div>
                    {/* <div className="file-container">
                        <label for="file">Upload Card Image</label>
                        <input name="file" type="file" />
                    </div> */}
                    <div style={{ textAlign: "center" }}>
                        <Button type="submit" className="login-button" variant="contained">Save Changes</Button>
                        <Button variant="contained" color="secondary" onClick={() => history.push("/dashboard")}>Cancel</Button>
                    </div>

                </form>
            </div>
        </div>
    )

}