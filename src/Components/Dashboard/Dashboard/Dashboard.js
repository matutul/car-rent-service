import React, { useContext, useState } from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar/Navbar';
import './Dashboard.css';
import { Nav, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faCar, faPlusSquare, faSignOutAlt, faThList, faUserCog, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import CompletedOrders from '../CompletedOrders/CompletedOrders';
import ActiveOrders from '../ActiveOrders/ActiveOrders';
import AddCar from '../AddCar/AddCar';
import Cars from '../Cars/Cars';
import { UserContext } from '../../../App';
import AddAdmin from '../AddAdmin/AddAdmin';
import Admins from '../Admins/Admins';
import { useEffect } from 'react';
import {
    useHistory,
    useParams
} from "react-router-dom";
import NavbarUpper from '../../Shared/Navbar/NavbarUpper/NavbarUpper';
import NavbarMain from '../../Shared/Navbar/NavbarMain/NavbarMain';


const Dashboard = () => {
    const [page, setPage] = useState("");
    const { pageName } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        setPage(pageName);
    }, [pageName])

    useEffect(() => {
        fetch('https://rocky-waters-70556.herokuapp.com/checkAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setIsAdmin(true);
                }
                setShowLoading(false);
            })
    }, [])

    const history = useHistory();


    const displaySection = subPage => {
        // setPage(pageName);
        history.push(`/dashboard/${subPage}`);
    }

    return (
        <div>
            <NavbarUpper></NavbarUpper>
            <div className="sticky-top">
                <NavbarMain></NavbarMain>
            </div>
            <div className="dashboard">
                {
                    !showLoading ? (
                        <div className="row w-100 dashboard">
                            <div className="side-bar">
                                <Nav className="flex-column p-5 w-100">
                                    <Nav.Link className={`w-100 px-3 py-2 my-2 side-bar-link ${page === "activeOrder" ? "active" : ""}`} onClick={() => displaySection('activeOrder')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Active orders</Nav.Link>
                                    <Nav.Link className={`w-100 px-3 py-2 my-2 side-bar-link ${page === "completedOrder" ? "active" : ""}`} onClick={() => displaySection('completedOrder')}><FontAwesomeIcon className="mr-1" icon={faBorderAll} /> Completed orders</Nav.Link>
                                    {
                                        isAdmin && <div className="w-100">
                                            <Nav.Link className={`w-100 px-3 py-2 my-2 side-bar-link ${page === "cars" ? "active" : ""}`} onClick={() => displaySection('cars')}><FontAwesomeIcon className="mr-1" icon={faCar} /> Cars</Nav.Link>
                                            <Nav.Link className={`w-100 px-3 py-2 my-2 side-bar-link ${page === "addCar" ? "active" : ""}`} onClick={() => displaySection('addCar')}><FontAwesomeIcon className="mr-1" icon={faPlusSquare} /> Add Car</Nav.Link>
                                            <Nav.Link className={`w-100 px-3 py-2 my-2 side-bar-link ${page === "admin" ? "active" : ""}`} onClick={() => displaySection('admin')}><FontAwesomeIcon className="mr-1" icon={faUserCog} /> Admins</Nav.Link>
                                            <Nav.Link className={`w-100 px-3 py-2 my-2 side-bar-link ${page === "addAdmin" ? "active" : ""}`} onClick={() => displaySection('addAdmin')}><FontAwesomeIcon className="mr-1" icon={faUserPlus} /> Add Admin</Nav.Link>
                                        </div>
                                    }
                                    <Nav.Link className="w-100 px-3 py-2 my-2 side-bar-link logOutButton" onClick={() => { setLoggedInUser({}); sessionStorage.removeItem('idToken'); }}><FontAwesomeIcon className="mr-1" icon={faSignOutAlt} /> Log out</Nav.Link>
                                </Nav>
                            </div>
                            <div className="p-5 pageContainer">
                                {
                                    (page === "") && <ActiveOrders></ActiveOrders>
                                }
                                {
                                    (page === 'completedOrder') && <CompletedOrders></CompletedOrders>
                                }
                                {
                                    (page === 'activeOrder') && <ActiveOrders></ActiveOrders>
                                }
                                {
                                    (page === 'cars') && <Cars></Cars>
                                }
                                {
                                    (page === 'addCar') && <AddCar></AddCar>
                                }
                                {
                                    (page === 'admin') && <Admins></Admins>
                                }
                                {
                                    (page === 'addAdmin') && <AddAdmin></AddAdmin>
                                }
                            </div>
                        </div>
                    ) : <div className="w-100 py-5 d-flex justify-content-center align-items-center">
                        <Spinner animation="border" variant="secondary" />
                    </div>
                }
            </div>

            <Footer></Footer>
        </div>
    );
};

export default Dashboard;