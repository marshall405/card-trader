import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import ImgModal from './ImgModal'

const useStyles = makeStyles({
    root: {
        width: 310,
        height: 300
    },
    title: {
        fontSize: 18,
    },
    box: {
        boxShadow: "none"
    },
});


export default function SportsCard(props) {
    const classes = useStyles();
    const [toggle, setToggle] = useState(true)
    const [show, setShow] = useState(false)
    const { title, img_url, first_name, last_name, team, year, condition, created_at } = props.card

    const handleSetShow = () => setShow(!show);

    return (


        <Card className={classes.box} onMouseLeave={() => setToggle(true)}>
            {toggle ?
                <CardContent className={classes.root}>
                    <Typography align="center" className={classes.title} color="textSecondary" gutterBottom>
                        {first_name + ' ' + last_name}
                    </Typography>
                    <CardMedia style={{ textAlign: "center" }}>
                        <img src={img_url} alt="player" onClick={handleSetShow} />
                    </CardMedia>

                    <Typography align="center" className={classes.title} color="textSecondary" gutterBottom>
                        {title}
                    </Typography>
                </CardContent>
                :
                <CardContent className={classes.root}>
                    <Typography color="textSecondary" gutterBottom>
                        {props.card.category}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        Team - {team}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        Year - {year}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        Condition - {condition}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        Added On - {created_at.split("T")[0]}
                    </Typography>
                </CardContent>
            }
            <CardActions>
                <Button size="small" onClick={() => setToggle(!toggle)}>{toggle ? "Details" : "Front"}</Button>
            </CardActions>


            {
                show ?
                    <ImgModal img_url={img_url} setShow={handleSetShow} />
                    :
                    null
            }
        </Card >
    )
}