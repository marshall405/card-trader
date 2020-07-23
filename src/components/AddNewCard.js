import React, { useState } from 'react'
import {
    useHistory,
} from "react-router-dom";
import TextField from '@material-ui/core/TextField';

import Radio from '@material-ui/core/Radio';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';

const cardURL = "https://evening-crag-02028.herokuapp.com/cards"
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: 250,
        },
    },
}));

export default function AddNewCard(props) {
    const history = useHistory()
    const classes = useStyles()
    const [condition, setCondition] = useState("");
    const [category, setCategory] = useState("");
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
        e.preventDefault()
        if (condition && category) {
            const jwt = window.localStorage.getItem("jwt")
            const formData = new FormData();


            let { first_name, last_name, team, year, condition, category, file } = e.target

            formData.append('first_name', first_name.value.trim())
            formData.append('last_name', last_name.value.trim())
            formData.append('team', team.value.trim())
            formData.append('year', year.value.trim())
            formData.append('condition', condition.value)
            formData.append('category', category.value)
            formData.append('image', file.files[0])

            console.log(formData)
            fetch(cardURL, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    'Authorization': `bearer: ${jwt}`
                },
                body: formData
            })
                .then(res => res.json())
                .then(card => {
                    if (card.message) {
                        setErrors(card.message)
                    } else {
                        props.addCard(card)
                        setSuccess(true)
                        setTimeout(() => history.push("/dashboard"), 500)
                    }
                })
        }
        else {
            setErrors("Condition and Category are required!")
        }
    }
    return (
        <Container className="home-container">
            <h1 className="page-title">Add New Card</h1>
            <h3> Card Details </h3>
            <div className="new-card-form">
                {
                    errors ?
                        <h5 className="alert"> {errors}</h5>
                        :
                        null
                }
                {
                    success ?
                        <h5 className="success"> Card created successfully!</h5>
                        :
                        null
                }
                <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                    <div className="player-form">
                        <TextField
                            required
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
                    <div className="file-container">
                        <label for="file">Upload Card Image</label>
                        <input name="file" type="file" />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Button type="submit" className="login-button" variant="contained">Create New Card</Button>
                    </div>

                </form>
            </div>
        </Container>
    )

}















// fetch(cardURL, {
//     method: "POST",
//     headers: {
//         "Accept": "application/json",
//         'Authorization': `bearer: ${jwt}`
//     },
//     body: JSON.stringify({
//         first_name: first_name.value.trim(),
//         last_name: last_name.value.trim(),
//         team: team.value.trim(),
//         year: year.value.trim(),
//         condition: condition.value,
//         category: category.value,
//         image: file.files[0]
//     })
// })
//     .then(res => res.json())
//     .then(card => {
//         if (card.message) {
//             setErrors(card.message)
//         } else {
//             props.addCard(card)
//             setSuccess(true)
//             setTimeout(() => history.push("/dashboard"), 500)
//         }
//     })
