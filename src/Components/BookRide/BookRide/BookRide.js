import React, { createContext, useEffect } from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar/Navbar';
import './BookRide.css';
import BookingForm from '../BookingForm/BookingForm';
import Map from '../Map/Map';
import { useState } from 'react';
import Car from '../Car/Car';
import BookingSummary from '../BookingSummary/BookingSummary';
import { Button, ProgressBar } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import NavbarUpper from '../../Shared/Navbar/NavbarUpper/NavbarUpper';
import NavbarMain from '../../Shared/Navbar/NavbarMain/NavbarMain';

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
            <NavbarUpper></NavbarUpper>
            <div className="sticky-top">
                <NavbarMain></NavbarMain>
            </div>



            <div className="container">

                <div style={{ backgroundColor: 'rgba(250, 250, 250, 0.8)' }} className="progressbar mt-5 p-4 shadow">
                    <ProgressBar className="my-2" now={45} />
                </div>

                <div className="row booking-section w-100 my-5 mx-0">
                    <div className="col-md-5 my-4">
                        <div className="p-4 w-100 booking-form shadow">
                            {
                                summaryShow ? <BookingSummary summaryShow={summaryShow} setSummaryShow={setSummaryShow}></BookingSummary> : <BookingForm summaryShow={summaryShow} setSummaryShow={setSummaryShow}></BookingForm>
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
                    </div>
                    <div className="col-md-7 my-4 w-100">
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