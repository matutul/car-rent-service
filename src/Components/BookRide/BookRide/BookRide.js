import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import Footer from '../../Shared/Footer/Footer';
import './BookRide.css';
import BookingForm from '../BookingForm/BookingForm';
import Map from '../Map/Map';
import Car from '../Car/Car';
import BookingSummary from '../BookingSummary/BookingSummary';
import { Button, Spinner } from 'react-bootstrap';
import NavbarUpper from '../../Shared/Navbar/NavbarUpper/NavbarUpper';
import NavbarMain from '../../Shared/Navbar/NavbarMain/NavbarMain';
import AddedCar from '../AddedCar/AddedCar';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './../../../App';

export const bookingContext = createContext();
// export default bookingContext;

const BookRide = () => {
    const [cars, setCars] = useState([]);
    const [bookingInfo, setBookingInfo] = useState({});
    const [summaryShow, setSummaryShow] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    // const [priceCart, setPriceCart] = useState(null);
    const [loggediInUser, setLoggedinUser] = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        const retrievedObject = JSON.parse(localStorage.getItem('bookingInfo'));
        if (retrievedObject) {
            setBookingInfo(retrievedObject);
            localStorage.removeItem('bookingInfo');
        }
    }, [])

    useEffect(() => {
        fetch('https://rocky-waters-70556.herokuapp.com/cars')
            .then(res => res.json())
            .then(data => {
                setCars(data);
                setShowLoading(false);
            })
    }, [])

    const proceedToBook = () => {
        let rentSumOfAllCar = 0.00;
        let kiloPriceSumOfAllCar = 0.00;
        let totalSumOfAllCar = 0.00;
        for (let i = 0; i < bookingInfo.car?.length; i++) {
            rentSumOfAllCar += bookingInfo.car[i].totalRent;
            kiloPriceSumOfAllCar += bookingInfo.car[i].totalPrice;
            totalSumOfAllCar += bookingInfo.car[i].totalCharge;
            console.log(rentSumOfAllCar, kiloPriceSumOfAllCar, totalSumOfAllCar);
        }
        const cart = {
            rent: rentSumOfAllCar,
            kiloPrice: kiloPriceSumOfAllCar,
            total: totalSumOfAllCar
        }
        const updatePriceCart = { cart, ...bookingInfo };
        setBookingInfo(updatePriceCart);
        localStorage.setItem('bookingInfo', JSON.stringify(updatePriceCart));

        const addBookingInfoToLogginUser = { ...loggediInUser };
        addBookingInfoToLogginUser.bookingInfo = bookingInfo;
        setLoggedinUser(addBookingInfoToLogginUser);
        console.log(bookingInfo);
        history.push('/payment')
    }

    // useEffect(() => {
    //     if(bookingInfo.cart){
    //         history.push('/payment');
    //     }
    // }, [bookingInfo.cart])
    console.log(bookingInfo);

    return (
        <bookingContext.Provider value={[bookingInfo, setBookingInfo]}>
            <NavbarUpper></NavbarUpper>
            <div className="sticky-top">
                <NavbarMain></NavbarMain>
            </div>



            <div className="container">

                {/* <div style={{ backgroundColor: 'rgba(250, 250, 250, 0.8)' }} className="progressbar mt-5 p-4 shadow">
                    <ProgressBar className="my-2" now={45} />
                </div> */}

                <div className="row booking-section w-100 mt-3 mb-5 mx-auto">
                    <div className="col-md-5 my-4">
                        <div className="p-4 w-100 booking-form shadow">
                            {
                                summaryShow ? <BookingSummary summaryShow={summaryShow} setSummaryShow={setSummaryShow}></BookingSummary> : <BookingForm summaryShow={summaryShow} setSummaryShow={setSummaryShow}></BookingForm>
                            }
                        </div>
                        {
                            (bookingInfo.car?.length > 0) &&
                            <div className="p-4 w-100 booking-form mt-4 shadow">
                                <div>
                                    <div className="bookingInformationTitle d-flex justify-content-center align-items-center text-center shadow mb-3 p-2">
                                        <h4>Selected Car</h4>
                                        {/* <div className="editButtonDiv ml-5 d-flex justify-content-center align-items-center p-2" onClick={() => setSummaryShow(false)}>
                                            <FontAwesomeIcon className="editBookingInformation" icon={faPencilAlt} />
                                        </div> */}
                                    </div>
                                    {
                                        bookingInfo.car?.map((car, index) => <AddedCar key={index} car={car}></AddedCar>)
                                    }
                                </div>

                                {
                                    bookingInfo.distanceResponse && bookingInfo.car && <Button className="w-100" onClick={proceedToBook}>Proceed for Booking</Button>
                                }
                            </div>
                        }
                    </div>
                    <div className="col-md-7 my-4 w-100">
                        {/* {
                            (bookingInfo.car?.length > 0 && cart) && (<div>
                                <div className="bookingInformationTitle d-flex justify-content-center align-items-center text-center shadow mb-3 p-2">
                                    <h4>Total Cars: {bookingInfo.car?.length}</h4>
                                </div>
                                <div className="cart">
                                    <Table>
                                        <tbody>
                                            <tr className="my-0 py-0" style={{ fontSize: '1rem' }}>
                                                <td className="td p-0" scope="col">Total Rent:</td>
                                                <td className="td p-0">{(bookingInfo.cart?.rentSumOfAllCar)?.toFixed(2)} &#2547;</td>
                                            </tr>
                                            <tr className="my-0 py-0" style={{ fontSize: '1rem' }}>
                                                <td className="td p-0" scope="col">Total Kilometer Charge:</td>
                                                <td className="td p-0">{(bookingInfo.cart?.kiloPriceSumOfAllCar)?.toFixed(2)} &#2547;</td>
                                            </tr>
                                            <tr className="my-0 py-0" style={{ fontSize: '1rem' }}>
                                                <td className="td p-0" scope="col">Total:</td>
                                                <td className="td p-0">{Math.floor(bookingInfo.cart?.totalSumOfAllCar)} &#2547;</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>)
                        } */}
                        {
                            summaryShow ? <>
                                <div className="text-center w-100 p-3 mb-2 mx-auto shadow">
                                    <h4>SELECT YOUR PREFARED CAR FROM HERE</h4>
                                </div>
                                <div className="row w-100 d-flex flex-wrap justify-content-center mb-5 mx-auto">
                                    {
                                        !showLoading ?
                                            cars.map(car => <Car key={car._id} car={car}></Car>)
                                            :
                                            <div className="w-100 py-5 d-flex justify-content-center align-items-center">
                                                <Spinner animation="border" variant="secondary" />
                                            </div>
                                    }
                                </div>
                            </> : <Map></Map>
                        }
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </bookingContext.Provider>
    );
};

export default BookRide;