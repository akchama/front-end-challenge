import React from 'react'
import { InputGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'

function SearchBar({ placeholder, data }) {
    return (
        <div className="search">
            <InputGroup className="mb-3">
                <FormControl className="searchInputs"
                    placeholder={placeholder}
                    aria-describedby="basic-addon2"
                />
            </InputGroup>
            <div className="dataResult">
                {
                    data.map((value, key) => {
                        return <div> {value} </div>;
                    })
                }
            </div>
        </div>
    )
}

export default SearchBar
