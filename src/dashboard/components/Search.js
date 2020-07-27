import React from 'react'

import TextField from '@material-ui/core/TextField'

export default function Search(props) {
    return (
        <div className="search-container">
            <TextField className="search" id="outlined-basic" label="search by players name" variant="outlined" onChange={props.setSearch} />
        </div>
    )
}
