import React from 'react';
import './NavbarUpper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from 'react-bootstrap';
import logo from '../../../../image/carRentalProjectLogo.png';

const NavbarUpper = () => {
    return (
        <div className="upper-nav d-flex align-items-center">
            <div className="container">
                <div className="upperNavRaw p-2">
                    <Navbar.Brand className="brand"><img className="logo" src={logo} alt="Car Rental Service Logo" /></Navbar.Brand>
                    <ul className="navbar-nav d-flex">
                        <li className="nav-item my-1">
                            <a className="nav-link-secondary" href="mailto: ashrafujjamantutul@gmail.com"> ashrafujjamantutul@gmail.com <FontAwesomeIcon icon={faEnvelope} /></a>
                        </li>
                        <li className="nav-item my-1">
                            <a className="nav-link-secondary" href="tel:01941071009"> 01941071009 <FontAwesomeIcon icon={faPhoneAlt} /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavbarUpper;