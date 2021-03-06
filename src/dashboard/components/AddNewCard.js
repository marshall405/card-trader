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


import PreviewNewCard from './PreviewNewCard'

const cardURL = `${process.env.REACT_APP_API}/cards`

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
    const [image, setImage] = useState("");
    const [errors, setErrors] = useState("")
    const [success, setSuccess] = useState(false)

    const [title, setTitle] = useState("")



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
            let { title, first_name, last_name, team, year, condition, category, file } = e.target

            formData.append('title', title.value.trim())
            formData.append('first_name', first_name.value.trim())
            formData.append('last_name', last_name.value.trim())
            formData.append('team', team.value.trim())
            formData.append('year', year.value.trim())
            formData.append('condition', condition.value)
            formData.append('category', category.value)
            formData.append('image', file.files[0])

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
                    console.log(card)
                    if (card.message) {
                        setErrors(card.message)
                    } else {
                        props.addCard(card)
                        setSuccess(true)
                        props.setActionValue(1)
                        setTimeout(() => history.push("/dashboard"), 500)
                    }
                })
        }
        else {
            setErrors("Condition and Category are required!")
        }
    }

    return (
        < Container className="home-container" >
            <h1 className="page-title">Add New Card</h1>
            <div className="new-card-form">
                <h3> Card Details </h3>

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
                            label="Card Description"
                            name="title"
                            style={{ margin: 8 }}
                            placeholder="Card Description"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => setTitle(e.target.value)}
                        />
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
                        <div className="radio-new">
                            <FormLabel required component="legend">Condition</FormLabel>
                            <RadioGroup required aria-label="condition" name="condition" value={condition} onChange={handleChange}>
                                <FormControlLabel value="Brand New" control={<Radio />} label="Brand New" />
                                <FormControlLabel value="Like New" control={<Radio />} label="Like New" />
                                <FormControlLabel value="Very Good" control={<Radio />} label="Very Good" />
                                <FormControlLabel value="Acceptable" control={<Radio />} label="Acceptable" />
                                <FormControlLabel value="Not Specified" control={<Radio />} label="Not Specified" />
                            </RadioGroup>
                        </div>
                        <div className="radio-new">
                            <FormLabel required component="legend">Sport</FormLabel>
                            <RadioGroup required aria-label="sport" name="category" value={category} onChange={handleChange}>
                                <FormControlLabel value="Basketball" control={<Radio />} label="Basketball" />
                                <FormControlLabel value="Football" control={<Radio />} label="Football" />
                                <FormControlLabel value="Baseball" control={<Radio />} label="Baseball" />
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="file-container">
                        <label htmlFor="file">Upload Card Image</label>
                        <input name="file" type="file" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Button type="submit" className="login-button" variant="contained">Create New Card</Button>
                    </div>

                </form>
            </div>
            {
                title ?
                    <>
                        <h2 className="preview-title"> Card Preview </h2>
                        <PreviewNewCard title={title} condition={condition} category={category} img={image} />
                    </>
                    :
                    null
            }
        </Container >
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
