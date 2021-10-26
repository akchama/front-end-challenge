import '../App.css';
import { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import './Login.css'

const LoginForm = ({Login}) => {

    const [details, setDetails] = useState({name: "", surname: ""})
    
    const handleLogin = (e) => {
        Login(details);
    }

    return (
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div className="justify-content-center align-items-center">
                    <form onSubmit={handleLogin}>
                        <h3>SignIn</h3>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Enter your name..." onChange={(event) => setDetails({...details, name: event.target.value}) } value={details.name} />
                        </div>

                        <div className="form-group">
                            <label>Surname</label>
                            <input type="text" className="form-control" placeholder="Enter your surname..." onChange={(event) => setDetails({...details, surname: event.target.value})} value={details.surname}/>
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block register">Register</button>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default LoginForm;
