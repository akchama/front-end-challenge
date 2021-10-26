import React, { useState, useEffect } from 'react'
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Button, Table, Form, ButtonGroup, Alert } from 'react-bootstrap';
import axios from 'axios';

function SearchBar({ placeholder, data , handleWorth, insufficientBalance, userWorth }) {

    const [exchangeCurrency, setExchangeCurrency] = useState({});
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [currentCurrency, setCurrentCurrency] = useState("USD");
    const [filteredData, setFilteredData] = useState([]); 
    const [wordEntered, setWordEntered] = useState("");
	const [show, setShow] = useState(false);
    const [amount, setAmount] = useState("");
    const [currencies, setCurrencies] = useState([])
    const [lastUpdate, setLastUpdate] = useState("")
    const [checkedState, setCheckedState] = useState(
        new Array(currencies.length).fill(false)
      );
    const [tableCurrency, setTableCurrency] = useState([])

    var config = {
        method: 'get',
        url: 'https://v6.exchangerate-api.com/v6/9d31b8ac59a969880555742f/latest/USD',
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
        setInterval(updateData, 2 * 60 * 1000)
        setLastUpdate(new Date().toString());
    }, [])

    const updateData = async () => {
        try {
            axios(config)
            .then(function (response) {
                setExchangeCurrency(response.data.conversion_rates)
            })
            .catch(function (error) {
                console.log(error);
            });
            setLastUpdate(new Date().toString());
       } catch (e) {
           console.log(e);
       }
     }

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((element) => {
            return element[0].toLowerCase().includes(searchWord.toLowerCase());
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
        // console.log(selectedCurrency);
        console.log(exchangeCurrency[selectedCurrency[0]]);
    }

    const handleExchange = () => {
        setCurrencies(oldArray => oldArray.find(({ currency }) => (currency === selectedCurrency[0] || amount > userWorth)) ? 
            oldArray :  [...oldArray, {currency: selectedCurrency[0], acronym: selectedCurrency[1], amount: Math.round(parseInt(amount))}]
        );
        handleWorth(Math.round(parseInt(amount) / exchangeCurrency[selectedCurrency[0]]), currentCurrency, selectedCurrency[0], amount);
        console.log(userWorth + " " + amount)
    }

    const handleBuy = () => {
        
    }

    const handleSell = () => {

    }

    // TODO: Bu kısımda bir checkbox işaretlendiğinde diğer checkbox'ların girdileri silinmesi gerekiyor
    const handleOnChange = (index) => {
        setCheckedState(() => {
            let array = new Array(currencies.length)
            let cloneArray = array.slice();
            cloneArray.splice(index, 1);
            return cloneArray.fill(false);
        });
    }

    const renderCurrency = (currency, index) => {
        return (
            <tr key={index}>
            <td>
            <Form>
                <div key={`default-${currency}`} className="mb-3">
                <Form.Check
                    className="currencyCheckBox"
                    onChange={() => handleOnChange(index)}
                    type='checkbox'
                    checked={checkedState[index]}
                    id={`default-${currency}`}
                />
                </div>

            </Form>
            </td>
            <td>{currency.currency}</td>
            <td>{currency.acronym}</td>
            <td>{currency.amount}</td>
            <td>
            <ButtonGroup aria-label="Basic example">
                <Button onClick={() => handleShow(selectedCurrency)} variant="success">Buy</Button>
                <Button onClick={() => handleShow(selectedCurrency)} variant="danger">Sell</Button>
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
                            return <a className="dataItem" href={value.link} target="_blank" onClick={() => handleShow(value)}> &nbsp;&nbsp;&nbsp;<div>{value[0] + " - " + value[1]}</div> </a>;
                        })
                    }
                    </div>)
                }
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Exchange currency</Modal.Title>
                </Modal.Header>
                    <Modal.Body>From USD to {selectedCurrency[0]}</Modal.Body>
                    <Modal.Body>Rate: {selectedCurrency && Math.round(exchangeCurrency[selectedCurrency[0]] * 100) / 100 } </Modal.Body>
                    <Modal.Body>
                        Amount: <input type="text" className="form-control" onChange={(e) => setAmount(e.target.value)} placeholder="Amount..."/>
                    </Modal.Body>
                    <Modal.Body>
                        {(insufficientBalance &&   <Alert variant={'warning'}>Insufficient balance!</Alert>)}
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
            <p>Last udpated: {lastUpdate} </p>
        </div>
    )
}

export default SearchBar