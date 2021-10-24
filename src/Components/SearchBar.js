import React, { useState} from 'react'
// import { InputGroup } from 'react-bootstrap'
// import { FormControl } from 'react-bootstrap'
// import $ from 'jquery'
// import autocomplete from 'jquery-ui/ui/widgets/autocomplete'
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function SearchBar({ placeholder, data }) {

    const [filteredData, setFilteredData] = useState([]); 
    const [wordEntered, setWordEntered] = useState("");
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        var newArr = data.map(function(el) { return el[0]; });
        console.log(newArr)
        const newFilter = newArr.filter((value) => {
            return value.toLowerCase().includes(searchWord.toLowerCase());
        })
        if (searchWord === "") {
            setFilteredData([]);
        }
        else {
            setFilteredData(newFilter);
        }
    }

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    }

    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                    {filteredData.length === 0 ? <SearchIcon/> : <CloseIcon id="clearBtn" onClick={clearInput}/>}
                </div>
            </div>
            { filteredData.length !== 0 && (
                <div className="dataResult">
                {
                    filteredData.slice(0, 4).map((value, key) => {
                        return <a className="dataItem" href={value.link} target="_blank"> {value} </a>;
                    })
                }
                </div>)
            }
        </div>
    )
}

export default SearchBar