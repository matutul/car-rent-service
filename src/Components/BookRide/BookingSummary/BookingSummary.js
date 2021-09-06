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
                        <td>{bookingInfo.data.name}</td>
                    </tr>
                    <tr>
                        <td scope="col">Phone</td>
                        <td>{bookingInfo.data.phone}</td>
                    </tr>
                    <tr>
                        <td scope="col">Origin</td>
                        <td>{bookingInfo.data.start}</td>
                    </tr>
                    <tr>
                        <td scope="col">Destination</td>
                        <td>{bookingInfo.data.end}</td>
                    </tr>
                    <tr>
                        <td scope="col">Distance</td>
                        <td>{(bookingInfo.updownDistance && bookingInfo.updown) ? bookingInfo.updownDistance?.distance?.text : bookingInfo?.distanceResponse?.distance?.text}</td>
                    </tr>
                    <tr>
                        <td scope="col">Duration</td>
                        <td>{(bookingInfo.updownDistance && bookingInfo.updown) ? bookingInfo.updownDistance?.duration?.text : bookingInfo?.distanceResponse?.duration?.text}</td>
                    </tr>
                    <tr>
                        <td scope="col">Pick Date</td>
                        <td>{bookingInfo.data.pickDate}</td>
                    </tr>
                    <tr>
                        <td scope="col">Drop Date</td>
                        <td>{bookingInfo.data.dropDate}</td>
                    </tr>
                    <tr>
                        <td scope="col">Total Days</td>
                        <td>{bookingInfo.data.totalDays}</td>
                    </tr>
                </tbody>
            </Table>
            {/* <button className="btn btn-warning" onClick={() => setSummaryShow(false)}>Edit</button> */}
        </div>
    );
};

export default BookingSummary;