import React from 'react';
import './NavbarUpper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from 'react-bootstrap';
import logo from '../../../../image/Molla-Rental-Service.png';

const NavbarUpper = () => {
    return (
        <div className="upper-nav d-flex align-items-center">
            <div className="container">
                <div className="upperNavRaw p-2">
                    <Navbar.Brand className="brand"><img className="logo" src={logo} alt="Molla Rental Service Logo" /></Navbar.Brand>
                    <ul className="navbar-nav d-flex">
                        <li className="nav-item my-1">
                            <a className="nav-link-secondary" href="mailto: molla.rental.service@gmail.com"> molla.rental.service@gmail.com <FontAwesomeIcon icon={faEnvelope} /></a>
                        </li>
                        <li className="nav-item my-1">
                            <a className="nav-link-secondary" href="tel:01914411291"> 01914411291 <FontAwesomeIcon icon={faPhoneAlt} /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavbarUpper;