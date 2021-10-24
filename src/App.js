import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css' 
import Nav from './Components/Navbar.js'
import Home from './Components/Home';
import LoginForm from './Login';

function App() {

	const [user, setUser] = useState(() => {
		const savedName = localStorage.getItem("name");
		const initValueName = JSON.parse(savedName);
		const savedSurname = localStorage.getItem("surname");
		const initValueSurame = JSON.parse(savedSurname);
		return { name: initValueName, surname: initValueSurame };
	})

	const [login, setLogin] = useState(true);

	const Login = (details) => {
		localStorage.setItem("name", JSON.stringify(details.name));
    	localStorage.setItem("surname", JSON.stringify(details.surname));
		console.log('Logged in!' + details)
		setUser({
			name: details.name,
			surname: details.surname
		})
		setLogin(true);
	}

	const LogoutHandler = (e) => {
		localStorage.removeItem("name");
    	localStorage.removeItem("surname");
		setUser({ name: "", surname: ""})
		setLogin(false);
	}

	return (
		<div className="App">
			<Nav userName={user.name} userSurname={user.surname} Logout={(e) => LogoutHandler(e)}/>
			{(user.name != null && login) ? <Home /> : <LoginForm Login={Login}/>}
		</div>
	);
}

export default App;
