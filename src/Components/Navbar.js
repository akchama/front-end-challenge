import { Container } from 'react-bootstrap';
import logo from '../logo.png'
import { Navbar, Button } from 'react-bootstrap';

const Nav = ({userName, userSurname, Logout, userWorth, loggedIn}) => {

    return (
        <div>
            <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">
                <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                Muni
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                {
                    (loggedIn) ?
                    <div>
                        <Navbar.Text id="navbarWorth">
                        USD: ${userWorth}
                        </Navbar.Text>
                    </div>
                    :
                    <Navbar.Text id="navbarWorth">
                    </Navbar.Text>
                }
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                {
                    (loggedIn) ? 
                    <div>
                        <Navbar.Text>
                            Welcome, {userName} {userSurname}
                        </Navbar.Text>
                        <button class="btn btn-sm btn-outline-secondary" type="button" onClick={Logout}>Logout</button>
                    </div>
                    : 
                    <Navbar.Text>
                        Please login!
                    </Navbar.Text>
                }
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
    )
}

export default Nav;
