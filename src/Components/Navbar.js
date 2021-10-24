import { Container } from 'react-bootstrap';
import logo from '../logo.png'
import { Navbar } from 'react-bootstrap';

function Nav() {
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
                <Navbar.Text>
                Welcome, Mark Otto
                </Navbar.Text>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
    )
}

export default Nav;
