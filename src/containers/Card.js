import React from 'react'


export default function Card(props) {
    const { category, img_url, first_name, last_name, team, year, condition } = props.card.info
    return (
        <div> {first_name} </div>
    )
}