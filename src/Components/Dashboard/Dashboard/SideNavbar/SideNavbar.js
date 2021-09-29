import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faCar, faPlusSquare, faSignOutAlt, faThList, faUserCog, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Nav, Spinner, NavDropdown } from 'react-bootstrap';
import { UserContext } from '../../../../App';

const SideNavbar = ({ isAdmin, displaySection, page }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [showDropdown, setShowDropdown] = useState({
        regularOrders: false,
        monthlyOrders: false,
        complainBox: false,
        users: false,
        cars: false,
        websiteEdits: false
    });

    const handleShowDropdown = dropDownLink => {
        // const isValid = false;
        if (dropDownLink === 'regularOrders' ||
            dropDownLink === 'monthlyOrders' ||
            dropDownLink === 'complainBox' ||
            dropDownLink === 'users' ||
            dropDownLink === 'cars' ||
            dropDownLink === 'websiteEdit') {
            const updateSideBar = { ...showDropdown };
            updateSideBar[dropDownLink] = !showDropdown[dropDownLink];
            setShowDropdown(updateSideBar);
        }
    }


    return (
        <>
            <Nav className="flex-column p-2 p w-100">
                {/* Regular orders dropdown menus */}
                <Nav.Link className={`w-100 px-3 py-2 mt-2 dropDown-link ${(page === "activeOrder" || page === "confirmedOrder" || page === "completedOrder" || page === "calcelledOrder") ? "dropDown-link-active" : ""}`} onClick={() => handleShowDropdown('regularOrders')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Regular orders</Nav.Link>
                {
                    (showDropdown.regularOrders) &&
                    <div className="dropDownContainer w-100">
                        <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "activeOrder" ? "active" : ""}`} onClick={() => displaySection('activeOrder')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Active orders</Nav.Link>

                        <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "confirmedOrder" ? "active" : ""}`} onClick={() => displaySection('confirmedOrder')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Confirmed orders</Nav.Link>

                        <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "completedOrder" ? "active" : ""}`} onClick={() => displaySection('completedOrder')}><FontAwesomeIcon className="mr-1" icon={faBorderAll} /> Completed orders</Nav.Link>

                        <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "calcelledOrder" ? "active" : ""}`} onClick={() => displaySection('calcelledOrder')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Cancelled orders</Nav.Link>
                    </div>
                }

                {
                    isAdmin && <div className="w-100">
                        {/* Monthly orders dropdown menus */}
                        <Nav.Link className={`w-100 px-3 py-2 dropDown-link ${(page === "orderRequests" || page === "ordersList") ? "dropDown-link-active" : ""}`} onClick={() => handleShowDropdown('monthlyOrders')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Monthly orders</Nav.Link>
                        {
                            (showDropdown.monthlyOrders) &&
                            <div className="dropDownContainer w-100">
                                <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "orderRequests" ? "active" : ""}`} onClick={() => displaySection('orderRequests')}><FontAwesomeIcon className="mr-1" icon={faThList} />  Order requests</Nav.Link>

                                <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "ordersList" ? "active" : ""}`} onClick={() => displaySection('ordersList')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Orders list</Nav.Link>
                            </div>
                        }
                    </div>
                }


                {/* Complain Box dropdown menus */}
                <Nav.Link className={`w-100 px-3 py-2 dropDown-link ${(page === "activeComplains" || page === "solvedComplains") ? "dropDown-link-active" : ""}`} onClick={() => handleShowDropdown('complainBox')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Complain box</Nav.Link>
                {
                    (showDropdown.complainBox) &&
                    <div className="dropDownContainer w-100">
                        <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "activeComplains" ? "active" : ""}`} onClick={() => displaySection('activeComplains')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Active complains</Nav.Link>

                        <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "solvedComplains" ? "active" : ""}`} onClick={() => displaySection('solvedComplains')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Solved complains</Nav.Link>
                    </div>
                }
                
                
                {
                    isAdmin && <div className="w-100">
                        {/* Users dropdown menus */}
                        < Nav.Link className={`w-100 px-3 py-2 dropDown-link ${(page === "activeUsers" || page === "blockedUsers") ? "dropDown-link-active" : ""}`} onClick={() => handleShowDropdown('users')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Users</Nav.Link>
                        {
                            (showDropdown.users) &&
                            <div className="dropDownContainer w-100">
                                <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "activeUsers" ? "active" : ""}`} onClick={() => displaySection('activeUsers')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Active users</Nav.Link>

                                <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "blockedUsers" ? "active" : ""}`} onClick={() => displaySection('blockedUsers')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Blocked users</Nav.Link>
                            </div>
                        }


                        {/* Cars dropdown menus */}
                        <Nav.Link className={`w-100 px-3 py-2 dropDown-link ${(page === "addCar" || page === "carsList") ? "dropDown-link-active" : ""}`} onClick={() => handleShowDropdown('cars')}><FontAwesomeIcon className="mr-1" icon={faCar} /> Cars</Nav.Link>
                        {
                            (showDropdown.cars) &&
                            <div className="dropDownContainer w-100">
                                <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "addCar" ? "active" : ""}`} onClick={() => displaySection('addCar')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Add car</Nav.Link>

                                <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "carsList" ? "active" : ""}`} onClick={() => displaySection('carsList')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Cars list</Nav.Link>
                            </div>
                        }

                        <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "hostList" ? "active" : ""}`} onClick={() => displaySection('hostList')}><FontAwesomeIcon className="mr-1" icon={faCar} /> Host list</Nav.Link>


                        {/* Website edits dropdown menus */}
                        <Nav.Link className={`w-100 px-3 py-2 dropDown-link ${(page === "userReviews" || page === "logo" || page === "slideImages" || page === "homePageText") ? "dropDown-link-active" : ""}`} onClick={() => handleShowDropdown('websiteEdit')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Website edit</Nav.Link>
                        {
                            (showDropdown.websiteEdit) &&
                            <div className="dropDownContainer w-100">
                                <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "userReviews" ? "active" : ""}`} onClick={() => displaySection('userReviews')}><FontAwesomeIcon className="mr-1" icon={faThList} /> User reviews</Nav.Link>

                                <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "logo" ? "active" : ""}`} onClick={() => displaySection('logo')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Logo</Nav.Link>

                                <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "slideImages" ? "active" : ""}`} onClick={() => displaySection('slideImages')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Slide images</Nav.Link>

                                <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "homePageText" ? "active" : ""}`} onClick={() => displaySection('homePageText')}><FontAwesomeIcon className="mr-1" icon={faThList} /> Homepage text</Nav.Link>
                            </div>
                        }

                        <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "transections" ? "active" : ""}`} onClick={() => displaySection('transections')}><FontAwesomeIcon className="mr-1" icon={faPlusSquare} /> Transections</Nav.Link>

                        <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "admin" ? "active" : ""}`} onClick={() => displaySection('admin')}><FontAwesomeIcon className="mr-1" icon={faUserCog} /> Admins</Nav.Link>
                        
                        <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "addAdmin" ? "active" : ""}`} onClick={() => displaySection('addAdmin')}><FontAwesomeIcon className="mr-1" icon={faUserPlus} /> Add Admin</Nav.Link>

                    </div>
                }
                <Nav.Link className={`w-100 px-3 py-2 side-bar-link ${page === "review" ? "active" : ""}`} onClick={() => displaySection('review')}><FontAwesomeIcon className="mr-1" icon={faUserCog} /> {isAdmin ? 'Client Reviews':'Review' }</Nav.Link>
                
                <Nav.Link className="w-100 px-3 py-2 my-2 side-bar-link logOutButton" onClick={() => { setLoggedInUser({}); sessionStorage.removeItem('idToken'); }}><FontAwesomeIcon className="mr-1" icon={faSignOutAlt} /> Log out</Nav.Link>
            </Nav >
        </>
    );
};

export default SideNavbar;