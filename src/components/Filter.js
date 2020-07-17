import React, { Component } from 'react'

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
export default class Filter extends Component {
    render() {
        return (
            <div>
                <FormControl>
                    <InputLabel htmlFor="sport-native-simple">Sport</InputLabel>
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
                <input type="text" placeholder="search player" onChange={this.props.setSearch} />
            </div>
        )
    }
}
