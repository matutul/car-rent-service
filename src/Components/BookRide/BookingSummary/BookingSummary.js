import React, { useContext } from 'react';
import { bookingContext } from '../BookRide/BookRide';

const BookingSummary = ({ summaryShow, setSummaryShow }) => {
    const [bookingInfo, ] = useContext(bookingContext);
    return (
        <div>
            <h4>Booking Information:</h4>
            <p>Name: {bookingInfo.name} <br />Phone: {bookingInfo.phone} <br />Origin: {bookingInfo.start} <br />Destination: {bookingInfo.end} <br />Distance: {bookingInfo.distanceResponse?.distance?.text} <br />Duration: {bookingInfo.distanceResponse?.duration?.text} <br />Pick Date: {bookingInfo.pickDate} <br />Drop Date: {bookingInfo.dropDate} </p>
            <button className="btn btn-warning" onClick={() => setSummaryShow(false)}>Edit</button>
        </div>
    );
};

export default BookingSummary;