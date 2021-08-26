import React, { useContext } from 'react';
import { bookingContext } from '../BookRide/BookRide';
import { Table } from 'react-bootstrap';
// import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './BookingSummary.css';
import { useEffect } from 'react';

const BookingSummary = ({ summaryShow, setSummaryShow }) => {

    const [bookingInfo, setBookingInfo] = useContext(bookingContext);

    useEffect(() => {
        const retrievedObject = JSON.parse(localStorage.getItem('bookingInfo'));
        if (retrievedObject) {
            setBookingInfo(retrievedObject);
        }
    }, [])
    // const [savedCar, setSavedCar] = useState(bookingInfo.car || {});

    // useEffect(() => {
    //     setSavedCar(bookingInfo.car);
    // }, [bookingInfo])
    // console.log(bookingInfo.distanceResponse.distance);

    return (
        <div>
            <div className="bookingInformationTitle d-flex justify-content-center align-items-center text-center shadow mb-3 p-2">
                <h4>Booking Information</h4>
                <div className="editButtonDiv ml-5 d-flex justify-content-center align-items-center p-2"  onClick={() => setSummaryShow(false)}>
                    <FontAwesomeIcon className="editBookingInformation" icon={faPencilAlt} />
                </div>
            </div>
            <Table striped borderless hover size="sm">
                <tbody>
                    <tr>
                        <td scope="col">Name</td>
                        <td>{bookingInfo.name}</td>
                    </tr>
                    <tr>
                        <td scope="col">Phone</td>
                        <td>{bookingInfo.phone}</td>
                    </tr>
                    <tr>
                        <td scope="col">Origin</td>
                        <td>{bookingInfo.start}</td>
                    </tr>
                    <tr>
                        <td scope="col">Destination</td>
                        <td>{bookingInfo.end}</td>
                    </tr>
                    <tr>
                        <td scope="col">Distance</td>
                        <td>{bookingInfo.distanceResponse?.distance?.text}</td>
                    </tr>
                    <tr>
                        <td scope="col">Duration</td>
                        <td>{bookingInfo.distanceResponse?.duration?.text}</td>
                    </tr>
                    <tr>
                        <td scope="col">Pick Date</td>
                        <td>{bookingInfo.pickDate}</td>
                    </tr>
                    <tr>
                        <td scope="col">Drop Date</td>
                        <td>{bookingInfo.dropDate}</td>
                    </tr>
                    <tr>
                        <td scope="col">Total Days</td>
                        <td>{bookingInfo.totalDays}</td>
                    </tr>
                </tbody>
            </Table>
            {/* <button className="btn btn-warning" onClick={() => setSummaryShow(false)}>Edit</button> */}
        </div>
    );
};

export default BookingSummary;