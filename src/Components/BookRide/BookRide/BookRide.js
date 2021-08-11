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
            const updateLoggedInUser = { ...loggedinUser };
            delete updateLoggedInUser.bookingInfoFromHome;
            setLoggedinUser(updateLoggedInUser);
        }
    }, [])

    useEffect(() => {
        fetch('https://rocky-waters-70556.herokuapp.com/cars')
            .then(res => res.json())
            .then(data => setCars(data))
    }, [])
    // console.log(bookingInfo);
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
            <div className="container mb-5">
                <div className="text-center w-75 p-4 mt-5 mx-auto">
                    <h5 className="default-color">BOOK RIDE HERE</h5>
                    <h3>WELCOME TO US</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum repellendus quaerat quo nemo vitae, sequi neque tempora. Ea nam officiis excepturi in odio neque libero?</p>
                </div>
                <div className="row booking-section d-flex align-items-start">
                    <div className="col-md-5 booking-form w-100 p-4 border my-4 shadow">
                        {
                            summaryShow ? <BookingSummary summaryShow={summaryShow} setSummaryShow={setSummaryShow}></BookingSummary> : <BookingForm className="w-100" summaryShow={summaryShow} setSummaryShow={setSummaryShow}></BookingForm>
                        }
                        {
                            (bookingInfo.car) && <div className="mt-5">
                                <h4>Selected Car:</h4>
                                <Car car={bookingInfo.car} addedCar={true}></Car>
                            </div>
                        }
                        {
                            bookingInfo.distanceResponse && bookingInfo.car && <Button className="w-100">Submit for Booking</Button>
                        }

                    </div>
                    <div className="col-md-7 my-4">
                        <Map></Map>
                    </div>
                </div>
                {summaryShow && <>
                    <div className="text-center w-75 p-4 mt-5 mx-auto">
                        <h5 className="default-color">MEET OUR CARS</h5>
                        <h3>SELECT YOUR PREFARED CAR FROM HERE</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum repellendus quaerat quo nemo vitae, sequi neque tempora. Ea nam officiis excepturi in odio neque libero?</p>
                    </div>
                    <div className="row mb-5">

                        {
                            cars.map(car => <Car key={car._id} car={car}></Car>)
                        }
                    </div>
                </>
                }

            </div>
            <Footer></Footer>
        </bookingContext.Provider>
    );
};

export default BookRide;