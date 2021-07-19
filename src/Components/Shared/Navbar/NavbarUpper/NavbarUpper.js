import React from 'react';
import { Link } from "react-router-dom";
import './NavbarUpper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from 'react-bootstrap';

const NavbarUpper = () => {
    return (
        <div className="upper-nav d-flex align-items-center">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand><Link to="/home"></Link></Navbar.Brand>
                    <ul className="navbar-nav d-flex flex-wrap">
                        <li className="nav-item me-5 text-right">
                            <a className="nav-link-secondary" href="mailto: ashrafujjamantutul@gmail.com"> ashrafujjamantutul@gmail.com <FontAwesomeIcon icon={faEnvelope} /></a>
                        </li>
                        <li className="nav-item text-right">
                            <a className="nav-link-secondary" href="tel:01941071009"> 01941071009 <FontAwesomeIcon icon={faPhoneAlt} /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavbarUpper;