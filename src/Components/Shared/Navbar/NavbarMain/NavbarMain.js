import React from 'react';
import { useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './NavbarMain.css';

const NavbarMain = () => {

    const history = useHistory();
    const routeToPath = path => {
        history.push(path);
    }

    return (
        <Navbar className="nav-bar" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <div className="container">

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => routeToPath('/home')}>Home</Nav.Link>
                        <Nav.Link onClick={() => routeToPath('/book')}>Book A Ride</Nav.Link>
                        <Nav.Link onClick={() => routeToPath('/dashboard')}>Dashboard</Nav.Link>
                        <Nav.Link onClick={() => routeToPath('/about')}>About Us</Nav.Link>
                        <Nav.Link onClick={() => routeToPath('/contact')}>Contact</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </div>
            {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        </Navbar>
    );
};

export default NavbarMain;