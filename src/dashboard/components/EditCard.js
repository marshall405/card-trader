import React, { useState } from 'react'

import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';


import SaveIcon from './SaveIcon';
import CancelIcon from './CancelIcon';


const editCardURL = `${process.env.REACT_APP_API}/cards/`

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
    const cancel = () => {
        history.push('/dashboard')
    }
    const handleSubmit = e => {
        const jwt = window.localStorage.getItem("jwt")
        e.preventDefault()
        let { title, first_name, last_name, team, year, condition, category } = e.target
        fetch(editCardURL + props.card.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': `bearer: ${jwt}`
            },
            body: JSON.stringify({
                title: title.value.trim(),
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
                    <img src={props.card.img_url} className="edit-card-image" alt="edit player" />
                </div>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="player-form">
                        <TextField
                            required
                            defaultValue={props.card.title}
                            id="standard-full-width"
                            label="Card Description"
                            name="title"
                            style={{ margin: 8 }}
                            placeholder="card description"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
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
                                <FormControlLabel value="Brand New" control={<Radio />} label="Brand New" />
                                <FormControlLabel value="Like New" control={<Radio />} label="Like New" />
                                <FormControlLabel value="Very Good" control={<Radio />} label="Very Good" />
                                <FormControlLabel value="Acceptable" control={<Radio />} label="Acceptable" />
                                <FormControlLabel value="Not Specified" control={<Radio />} label="Not Specified" />
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
                        <SaveIcon type="submit" />
                        <CancelIcon cancel={cancel} />
                    </div>

                </form>
            </div>
        </div>
    )

}