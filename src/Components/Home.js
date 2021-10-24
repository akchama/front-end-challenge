import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar'
import axios from 'axios';
import '../App.css';
import { Route, Redirect } from 'react-router-dom';

function Home(props) {

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

    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return (
            <div id="searchbar">
                <SearchBar placeholder="Bir para birimi seçin..." data={currencyOptions}/>
            </div>
        )
    }
    return (
        <Redirect to="/login" />
    )
}

export default Home;
