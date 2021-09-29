import React, { useContext, useState, useEffect } from 'react';
import Footer from '../../Shared/Footer/Footer';
import './Dashboard.css';
import { Spinner } from 'react-bootstrap';

import ActiveOrders from '../RegularOrders/ActiveOrders/ActiveOrders';
import CompletedOrders from '../RegularOrders/CompletedOrders/CompletedOrders';
import AddCar from '../AddCar/AddCar';
import Cars from '../Cars/Cars';
import { UserContext } from '../../../App';
import AddAdmin from '../AddAdmin/AddAdmin';
import Admins from '../Admins/Admins';

import NavbarUpper from '../../Shared/Navbar/NavbarUpper/NavbarUpper';
import NavbarMain from '../../Shared/Navbar/NavbarMain/NavbarMain';
import SideNavbar from './SideNavbar/SideNavbar';
import ConfirmedOrders from '../RegularOrders/ConfirmedOrders/ConfirmedOrders';
import CancelledOrders from '../RegularOrders/CancelledOrders/CancelledOrders';
import OrderRequests from '../MonthlyOrders/OrderRequests/OrderRequests';
import OrdersList from '../MonthlyOrders/OrdersList/OrdersList';
import ActiveComplain from '../ComplainBox/ActiveComplain/ActiveComplain';
import SolvedComplain from '../ComplainBox/SolvedComplain/SolvedComplain';
import ActiveUsers from '../Users/ActiveUsers/ActiveUsers';
import BlockedUsers from '../Users/BlockedUsers/BlockedUsers';

import {
    useHistory,
    useParams
} from "react-router-dom";
import Review from '../Review/Review';


const Dashboard = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [page, setPage] = useState("activeOrder");
    const { pageName } = useParams();
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLoading, setShowLoading] = useState(true);



    useEffect(() => {
        setPage(pageName);
        // console.log('setPage : ', pageName);
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
                                <SideNavbar isAdmin={isAdmin} displaySection={displaySection} page={page} />
                            </div>
                            <div className="p-lg-5 pageContainer">
                                {
                                    (page === "") && <ActiveOrders />
                                }

                                {/* Regular orders dropdown*/}
                                {
                                    (page === 'activeOrder') && <ActiveOrders email={loggedInUser.email} isAdmin={isAdmin} />
                                }
                                {
                                    (page === 'completedOrder') && <CompletedOrders email={loggedInUser.email} isAdmin={isAdmin} />
                                }
                                {
                                    (page === 'confirmedOrder') && <ConfirmedOrders email={loggedInUser.email} isAdmin={isAdmin} />
                                }
                                {
                                    (page === 'calcelledOrder') && <CancelledOrders email={loggedInUser.email} isAdmin={isAdmin} />
                                }

                                {/* Monthly orders dropdown */}
                                {
                                    (page === 'orderRequests') && <OrderRequests />
                                }
                                {
                                    (page === 'ordersList') && <OrdersList />
                                }

                                {/* Complain box dropdown */}
                                {
                                    (page === 'activeComplains') && <ActiveComplain isAdmin={isAdmin} />
                                }
                                {
                                    (page === 'solvedComplains') && <SolvedComplain isAdmin={isAdmin} />
                                }

                                {/* Users dropdown */}
                                {
                                    (page === 'activeUsers') && <ActiveUsers />
                                }
                                {
                                    (page === 'blockedUsers') && <BlockedUsers />
                                }

                                {/* Cars dropdown */}
                                {
                                    (page === 'carsList') && <Cars></Cars>
                                }
                                {
                                    (page === 'addCar') && <AddCar></AddCar>
                                }

                                {/* Admin */}
                                {
                                    (page === 'admin') && <Admins></Admins>
                                }
                                {
                                    (page === 'addAdmin') && <AddAdmin></AddAdmin>
                                }
                                {
                                    (page === 'review') && <Review isAdmin={isAdmin}></Review>
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