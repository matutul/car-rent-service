import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import './NavbarMain.css';
import { useContext } from 'react';
import { UserContext } from '../../../../App';

const NavbarMain = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const routeToPath = path => {
        history.push(path);
    }

    const handleSignOut = () => {
        setLoggedInUser({});
        sessionStorage.removeItem('idToken');
    }
    // const handleLogIn = () => {
    //     history.push('/login');
    // }
    return (
        <div className="main-nav">
            <Navbar className="nav-bar" collapseOnSelect expand="lg" variant="dark">
                <div className="container">
                    <Navbar.Brand className="brandName" onClick={() => routeToPath('/home')}>CAR RENTAL SERVICE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={() => routeToPath('/home')}>Home</Nav.Link>
                            <Nav.Link onClick={() => routeToPath('/book')}>Book A Ride</Nav.Link>
                            {/* <Nav.Link onClick={() => routeToPath('/dashboard/activeOrder')}>Dashboard</Nav.Link> */}
                            <Nav.Link onClick={() => routeToPath('/about')}>About Us</Nav.Link>
                            <Nav.Link onClick={() => routeToPath('/contact')}>Contact</Nav.Link>
                        </Nav>
                        <Nav className="justify-content-end">
                            {
                                loggedInUser.displayName ? (<NavDropdown title={loggedInUser.displayName} id="collasible-nav-dropdown" className="link">
                                    <NavDropdown.Item onClick={() => routeToPath('/dashboard/activeOrder')}>Dashboard</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleSignOut}>Log out</NavDropdown.Item>
                                </NavDropdown>) : (<><Button onClick={() => routeToPath('/login')} className="menu-btn mx-2" variant="outline-light">Log in</Button>
                                    <Button onClick={() => routeToPath('/signup')} className="menu-btn mx-2" variant="light">Sign up</Button></>)
                            }
                        </Nav>
                    </Navbar.Collapse>
                </div>
                {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
            </Navbar>
        </div>
    );
};

export default NavbarMain;