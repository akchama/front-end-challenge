import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css' 
import SearchBar from './Components/SearchBar';

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  console.log(currencyOptions);


  var config = {
    method: 'get',
    url: 'https://v6.exchangerate-api.com/v6/e3fd651f3e38d8ee70be0677/codes',
    headers: { }
  };

  useEffect(() => {
      axios(config)
        .then(function (response) {
          setCurrencyOptions(response.data.supported_codes)
        })
        .catch(function (error) {
          console.log(error);
        });
  }, [])

  return (
    <>
      <SearchBar placeholder="Bir para birimi seçin..." data={currencyOptions} />
    </>
  );
}

export default App;
