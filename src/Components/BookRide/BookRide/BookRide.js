import React, { createContext, useEffect } from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar/Navbar';
import './BookRide.css';
import BookingForm from '../BookingForm/BookingForm';
import Map from '../Map/Map';
import { useState } from 'react';
import Car from '../Car/Car';
import BookingSummary from '../BookingSummary/BookingSummary';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../../../App';

export const bookingContext = createContext();

const BookRide = () => {

    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    const [cars, setCars] = useState([]);
    const [bookingInfo, setBookingInfo] = useState({});
    const [summaryShow, setSummaryShow] = useState(false);


    useEffect(() => {
        if (loggedinUser.bookingInfoFromHome) {
            setBookingInfo(loggedinUser.bookingInfoFromHome);
            const updateLoggedInUser = {...loggedinUser};
            delete updateLoggedInUser.bookingInfoFromHome;
            setLoggedinUser(updateLoggedInUser);
        }
    }, [])

    useEffect(() => {
        fetch('http://localhost:4000/cars')
            .then(res => res.json())
            .then(data => setCars(data))
    }, [])
    console.log(bookingInfo);
    return (
        <bookingContext.Provider value={[bookingInfo, setBookingInfo]}>
            <Navbar></Navbar>
            <div className="header-image">
                <div className="container d-flex flex-column justify-content-center text-white header-text">
                    <div className="col-6">
                        <h2>Book A Ride For You</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sapiente ipsa saepe ea quidem nulla dolore, quisquam dolor eum, error veritatis reiciendis necessitatibus laborum ut?</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row booking-section d-flex align-items-center">
                    <div className="col-md-5 p-4 border booking-form">
                        {
                            summaryShow ? <BookingSummary summaryShow={summaryShow} setSummaryShow={setSummaryShow}></BookingSummary> : <BookingForm summaryShow={summaryShow} setSummaryShow={setSummaryShow}></BookingForm>
                        }
                        {
                            (bookingInfo.car) && <Car car={bookingInfo.car} addedCar={true}></Car>
                        }
                        {
                            bookingInfo.distanceResponse && bookingInfo.car && <Button className="w-100">Submit for Booking</Button>
                        }

                    </div>
                    <div className="col-md-7">
                        <Map></Map>
                    </div>
                </div>
                {summaryShow &&
                    <div className="row">
                        {
                            cars.map(car => <Car car={car}></Car>)
                        }
                    </div>
                }

            </div>
            <Footer></Footer>
        </bookingContext.Provider>
    );
};

export default BookRide;