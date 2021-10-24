import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css' 
import Nav from './Components/Navbar.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Login';
import Register from './Register';
import { Redirect } from 'react-router';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
          <Nav />
          <Switch>
            <Route path="/register" component={Register} />
            <Home isLoggedIn={loggedIn} path="/" exact component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
