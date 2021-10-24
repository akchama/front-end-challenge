import { Container } from 'react-bootstrap';
import logo from '../logo.png'
import { Navbar, Button } from 'react-bootstrap';

const Nav = ({userName, userSurname, Logout}) => {

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
                <Navbar.Text id="navbarWorth">
                Total Worth: $14,000
                </Navbar.Text>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                {
                    (userName != "") ? 
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
