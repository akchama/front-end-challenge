import React, { useState, useEffect } from 'react'
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Button, Table, Form, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';

function SearchBar({ placeholder, data , userSearchBar}) {

    const [exchangeCurrency, setExchangeCurrency] = useState({});
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [filteredData, setFilteredData] = useState([]); 
    const [wordEntered, setWordEntered] = useState("");
	const [show, setShow] = useState(false);
    const [amount, setAmount] = useState("");
    const [currencies, setCurrencies] = useState([])

    var config = {
        method: 'get',
        url: 'https://v6.exchangerate-api.com/v6/e3fd651f3e38d8ee70be0677/latest/USD',
        headers: { }
      };

    useEffect(() => {
        axios(config)
            .then(function (response) {
                setExchangeCurrency(response.data.conversion_rates)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

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

    const handleClose = () => setShow(false);
    const handleShow = (value) => {
        setShow(true);
        setSelectedCurrency(value);
        console.log(selectedCurrency);
        console.log(exchangeCurrency[selectedCurrency.toString()]);
    }

    const handleExchange = () => {
        setCurrencies(oldArray => oldArray.find(({ currency }) => currency === selectedCurrency) ? 
            oldArray :  [...oldArray, {currency: selectedCurrency, acronym: selectedCurrency, amount: (Math.round(parseInt(amount) * exchangeCurrency[selectedCurrency.toString()]))}]
        );
    }

    const renderCurrency = (currency, index) => {
        return (
            <tr key={index}>
            <td>
            <Form>
            {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                <Form.Check 
                    type={type}
                    id={`default-${type}`}
                />
                </div>
            ))}
            </Form>
            </td>
            <td>{currency.currency}</td>
            <td>{currency.acronym}</td>
            <td>{currency.amount}</td>
            <td>
            <ButtonGroup aria-label="Basic example">
                <Button variant="success">Buy</Button>
                <Button variant="danger">Sell</Button>
            </ButtonGroup>
            </td>
            </tr>
        )
    }

    return (
        <div className="container">
            <div className="search">
                <div className="searchInputs">
                    <div className="searchIcon">
                        {filteredData.length === 0 ? <SearchIcon/> : <CloseIcon id="clearBtn" onClick={clearInput}/>}
                    </div>
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={wordEntered}
                        onChange={handleFilter}
                    />
                </div>
                { filteredData.length !== 0 && (
                    <div className="dataResult">
                    {
                        filteredData.slice(0, 4).map((value, key) => {
                            return <a className="dataItem" href={value.link} target="_blank" onClick={() => handleShow(value)}> {value} </a>;
                        })
                    }
                    </div>)
                }
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Exchange currency</Modal.Title>
                </Modal.Header>
                    <Modal.Body>From USD to {selectedCurrency}</Modal.Body>
                    <Modal.Body>Rate: {exchangeCurrency[selectedCurrency.toString()]} </Modal.Body>
                    <Modal.Body>
                        Amount: <input type="text" className="form-control" onChange={(e) => setAmount(e.target.value)} placeholder="Amount..."/>
                    </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleExchange}>
                    Exchange
                </Button>
                </Modal.Footer>
            </Modal>
            
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>
                    </th>
                    <th>Acronym</th>
                    <th>Name</th>
                    <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {currencies.map(renderCurrency)}
                </tbody>
            </Table>
        </div>
    )
}

export default SearchBar