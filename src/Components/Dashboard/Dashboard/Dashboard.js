import React, { useContext, useState } from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar/Navbar';
import './Dashboard.css';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faCar, faPlusSquare, faSignOutAlt, faThList, faUserCog, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import CompletedOrders from '../CompletedOrders/CompletedOrders';
import ActiveOrders from '../ActiveOrders/ActiveOrders';
import AddCar from '../AddCar/AddCar';
import Cars from '../Cars/Cars';
import { UserContext } from '../../../App';

const Dashboard = () => {
    const [page, setPage] = useState(null);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const displaySection = pageName => {
        setPage(pageName);
    }
    
    return (
        <div>
            <Navbar></Navbar>
            <div className="row w-100">
                <div className="col-md-3 side-bar">
                    <Nav className="flex-column  p-5 w-100">
                        <Nav.Link className="w-100 px-1 py-3 side-bar-link" onClick={() => displaySection('completedOrder')}><FontAwesomeIcon className="mr-1" icon={faBorderAll} /> Completed orders</Nav.Link>
                        <Nav.Link className="w-100 px-1 py-3 side-bar-link" onClick={() => displaySection('activeOrder')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Active orders</Nav.Link>
                        <Nav.Link className="w-100 px-1 py-3 side-bar-link" onClick={() => displaySection('cars')}><FontAwesomeIcon className="mr-1" icon={faCar} /> Cars</Nav.Link>
                        <Nav.Link className="w-100 px-1 py-3 side-bar-link" onClick={() => displaySection('addCar')}><FontAwesomeIcon className="mr-1" icon={faPlusSquare} /> Add Car</Nav.Link>
                        <Nav.Link className="w-100 px-1 py-3 side-bar-link" onClick={() => displaySection('admin')}><FontAwesomeIcon className="mr-1" icon={faUserCog} /> Admins</Nav.Link>
                        <Nav.Link className="w-100 px-1 py-3 side-bar-link" onClick={() => displaySection('addAdmin')}><FontAwesomeIcon className="mr-1" icon={faUserPlus} /> Add Admin</Nav.Link>
                        <Nav.Link className="w-100 px-1 py-3 side-bar-link" onClick={() => setLoggedInUser({})}><FontAwesomeIcon className="mr-1" icon={faSignOutAlt} /> Log out</Nav.Link>
                    </Nav>
                </div>
                <div className="col-md-6 p-3 border">
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
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;