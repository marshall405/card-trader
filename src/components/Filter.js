import React, { Component } from 'react'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';

export default class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <FormControl>
                    <InputLabel htmlFor="sport-native-simple">Sort by sport</InputLabel>
                    <Select
                        native

                        onChange={this.props.setFilter}
                        inputProps={{
                            name: 'Sport',
                            id: 'sport-native-simple',
                        }}
                    >
                        <option value="all" >All</option>
                        <option value={"Basketball"}>Basketball</option>
                        <option value={"Football"}>Football</option>
                        <option value={"Baseball"}>Baseball</option>
                    </Select>
                </FormControl>
                <FormControl >
                    <TextField className="search" id="outlined-basic" label="search by players name" variant="outlined" onChange={this.props.setSearch} />
                </FormControl>
            </div>
        )
    }
}
