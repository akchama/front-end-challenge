import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css' 
import Nav from './Components/Navbar.js'
import Home from './Components/Home';
import LoginForm from './Components/Login';

function App() {

	const [login, setLogin] = useState(() => {
		const savedName = localStorage.getItem("name");
		const initValueName = JSON.parse(savedName);
		if (initValueName == "" || initValueName == null)
			return false;
		return true;
	});

	const [insufficientBalance, setInsufficientBalance] = useState(false);

	const [user, setUser] = useState(() => {
		const savedName = localStorage.getItem("name");
		const initValueName = JSON.parse(savedName);
		const savedSurname = localStorage.getItem("surname");
		const initValueSurname = JSON.parse(savedSurname);
		const savedWorth = localStorage.getItem("worth");
		const initValueWorth = JSON.parse(savedWorth);
		return { name: initValueName, surname: initValueSurname, worth: initValueWorth };
	});

	const Login = (details) => {
		localStorage.setItem("name", JSON.stringify(details.name));
    	localStorage.setItem("surname", JSON.stringify(details.surname));
		localStorage.setItem("worth", JSON.stringify(10000))
		console.log('Logged in!' + details)
		setUser({
			name: details.name,
			surname: details.surname,
			worth: 10000
		})
		setLogin(true);
	}

	const LogoutHandler = (e) => {
		localStorage.removeItem("name");
    	localStorage.removeItem("surname");
		localStorage.removeItem("worth")
		setUser({ name: "", surname: "", worth: ""})
		setLogin(false);
	}

	const WorthHandler = (e) => {
		let newWorth = user.worth - e;
		if (newWorth < 0) {
			setInsufficientBalance(true)
		}
		else {
			setUser({...user, worth: newWorth})
			localStorage.setItem("worth", JSON.stringify(newWorth))
		}
	}

	return (
		<div className="App">
			<Nav userName={user.name} userSurname={user.surname} Logout={(e) => LogoutHandler(e)} userWorth={user.worth} loggedIn={login}/>
			{(user.name != null && login) ? <Home handleWorth={WorthHandler} checkBalance={insufficientBalance} userWorth={user.worth}/> : <LoginForm Login={Login}/>}
		</div>
	);
}

export default App;
