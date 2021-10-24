import './App.css';
import { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router';

function Login() {

    const [name, setName] = useState(" ");
    const [surname, setSurname] = useState(" ");
    let history = useHistory();

    useEffect(() => {
        localStorage.setItem("name", JSON.stringify(name));
        localStorage.setItem("surname", JSON.stringify(surname));
      }, [name, surname]);

    const handleLogin = (e) => {
        e.preventDefault();
        history.push('/home')
    }

    return (
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div className="col-sm-3">
                    <form onSubmit={handleLogin}>
                        <h3>Hesap Oluştur</h3>
                        <div className="form-group">
                            <label>İsim</label>
                            <input type="text" className="form-control" placeholder="İsminizi giriniz" onChange={(event) => setName(event.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Soyisim</label>
                            <input type="text" className="form-control" placeholder="Şifrenizi giriniz" onChange={(event) => setSurname(event.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block">Kayıt ol</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login);
