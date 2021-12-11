import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { Nav } from 'react-bootstrap';
import facebook from '../../../icons/facebook.svg';
import twitter from '../../../icons/twitter.svg';
import web from '../../../icons/web.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMapMarkerAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
    return (
        <div>
            <div className="upper bg-dark p-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 text-secondary">
                            <Link className="text-white default-link" to='/home'>Car Rent Service</Link>
                            <p>Premium Car Rental Service Provider in Bangladesh. 100% Safe, Reliable & Professional. We provide all types of rented Cars, Micros, and Ambulances as per your demand for comfortable travel at a low cost.</p>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <h3 className="text-white">Services: </h3>
                            <div className="border"></div>
                            <div className="service-link d-flex">
                                <Nav defaultActiveKey="/home" className="flex-column w-50">
                                    <Nav.Link className="footer-link">Active</Nav.Link>
                                    <Nav.Link className="footer-link">Link</Nav.Link>
                                    <Nav.Link className="footer-link">Link</Nav.Link>
                                </Nav>
                                <Nav defaultActiveKey="/home" className="flex-column w-50">
                                    <Nav.Link className="footer-link">Active</Nav.Link>
                                    <Nav.Link className="footer-link">Link</Nav.Link>
                                    <Nav.Link className="footer-link">Link</Nav.Link>
                                </Nav>
                            </div>

                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <h3 className="text-white">Get In Touch: </h3>
                            <div className="border"></div>
                            <Nav defaultActiveKey="/home" className="">
                                <Nav.Link className="footer-link"><FontAwesomeIcon icon={faMapMarkerAlt} />{" "}Bagnagar, Dhamrai, Dhaka - 1350.</Nav.Link>
                                <Nav.Link className="footer-link" href="tel:01941071009"><FontAwesomeIcon icon={faMobileAlt} />{" "} 01941071009</Nav.Link>
                                <Nav.Link className="footer-link" href="mailto: ashrafujjamantutul@gmail.com"><FontAwesomeIcon icon={faEnvelope} /> {" "} ashrafujjamantutul@gmail.com </Nav.Link>
                            </Nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom p-4">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="text-secondary">Copyright &copy; matutul - All rights reserved</p>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <a href="#" target="_blank" rel="noreferrer">
                                <img className="social-icon" style={{ width: "50px" }} src={facebook} alt="" />
                            </a>
                            {/* <a href="">
                                <img className="mx-3 social-icon" style={{ width: "50px" }} src={twitter} alt="" />
                            </a> */}
                            <a href="https://mollarentalservice.com/">
                                <img className="social-icon ml-3" style={{ width: "50px" }} src={web} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;