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
                                    <Nav.Link className="default-link">Active</Nav.Link>
                                    <Nav.Link className="default-link">Link</Nav.Link>
                                    <Nav.Link className="default-link">Link</Nav.Link>
                                </Nav>
                                <Nav defaultActiveKey="/home" className="flex-column w-50">
                                    <Nav.Link className="default-link">Active</Nav.Link>
                                    <Nav.Link className="default-link">Link</Nav.Link>
                                    <Nav.Link className="default-link">Link</Nav.Link>
                                </Nav>
                            </div>

                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <h3 className="text-white">Get In Touch: </h3>
                            <div className="border"></div>
                            <Nav defaultActiveKey="/home" className="">
                                <Nav.Link className="default-link"><FontAwesomeIcon icon={faMapMarkerAlt} /> 251/1, South Pirerbagh, Amtola, Mirpur, Dhaka- 1216
</Nav.Link>
                                <Nav.Link className="default-link" href="tel:01914411291"><FontAwesomeIcon icon={faMobileAlt} /> 01914411291</Nav.Link>
                                <Nav.Link className="default-link" href="mailto: molla.rental.service@gmail.com"><FontAwesomeIcon icon={faEnvelope} />  molla.rental.service@gmail.com </Nav.Link>
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
                            <a href="www.facebook.com/molla.rental.service" target="_blank" rel="noreferrer">
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