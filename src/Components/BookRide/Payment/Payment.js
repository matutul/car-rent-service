import React from 'react';
import NavbarUpper from './../../Shared/Navbar/NavbarUpper/NavbarUpper';
import NavbarMain from './../../Shared/Navbar/NavbarMain/NavbarMain';
import Footer from './../../Shared/Footer/Footer';
import { useEffect } from 'react';
import './Payment.css';
// import { UserContext } from './../../../App';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const Payment = () => {
    // const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    const [carBookingInfo, setCarBookingInfo] = useState(null);
    useEffect(() => {
        const retrievedObject = JSON.parse(localStorage.getItem('bookingInfo'));
        if (retrievedObject) {
            setCarBookingInfo(retrievedObject);
            // localStorage.removeItem('bookingInfo');
        }
    }, [])
    console.log(carBookingInfo);
    return (
        <div>
            <NavbarUpper></NavbarUpper>
            <div className="sticky-top">
                <NavbarMain></NavbarMain>
            </div>


            <div className="container paymentSection">
                <div className="p-4 my-3 shadow priceBox">
                    <div className="row w-100 mx-auto mb-3">
                        <div className="col-md-6">
                            <div className="p-3 shadow">
                                <p>Rent for total days: <img style={{width: '100px', height: '60px'}} src={carBookingInfo?.car[0]?.photo}></img></p>
                                <p>Rent for total Kilos:  {carBookingInfo?.car[0]?.carName}</p>
                                <p className="border totalPrice px-3 py-2">Rent per day:  {carBookingInfo?.car[0]?.rent}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="p-3 shadow">
                                <p>Total days:  {carBookingInfo?.totalDays}</p>
                                <p>Rent for total days:  {carBookingInfo?.cart?.rent}</p>
                                <p>Rent for total Kilos:  {carBookingInfo?.cart?.kiloPrice}</p>
                                <p className="border totalPrice px-3 py-2">Total Rent:  {carBookingInfo?.cart?.total}</p>
                            </div>
                        </div>
                    </div>
                    <Button>Pay to Book</Button>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Payment;