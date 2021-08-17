import React, { useContext } from 'react';
import { bookingContext } from '../BookRide/BookRide';
import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const BookingSummary = ({ summaryShow, setSummaryShow }) => {

    const [bookingInfo,] = useContext(bookingContext);
    const [invoice, setInvoice] = useState({
        totalDays: bookingInfo.totalDays,
        totalKilo: '',
        priceForKilo: '',
        rentForDays: '',
        total: ''
    })

    useEffect(() => {
        if (bookingInfo.car) {
            if (bookingInfo.distanceResponse) {
                console.log(bookingInfo.distanceResponse);
                const newInvoice = { ...invoice };
                newInvoice.totalKilo = (parseFloat(bookingInfo.distanceResponse?.distance?.text)).toFixed(2);
                if (bookingInfo.updown) {
                    newInvoice.totalKilo = (parseFloat(newInvoice.totalKilo) * 2).toFixed(2);
                }
                newInvoice.priceForKilo = (parseFloat(newInvoice.totalKilo) * bookingInfo.car?.price).toFixed(2);
                newInvoice.rentForDays = (parseFloat(bookingInfo.totalDays) * parseFloat(bookingInfo.car.rent)).toFixed(2);
                newInvoice.total = (parseFloat(newInvoice.priceForKilo) + parseFloat(newInvoice.rentForDays)).toFixed(2);
                setInvoice(newInvoice);
            }
            else {
                const newInvoice = { ...invoice };
                newInvoice.priceForKilo = "Distance not found";
                newInvoice.rentForDays = "Distance not found";
                newInvoice.total = "Distance not found";
                setInvoice(newInvoice);
            }
            console.log("car is added")

        }
        else {
            const newInvoice = { ...invoice };
            newInvoice.priceForKilo = "Add car";
            newInvoice.rentForDays = "Add car";
            newInvoice.total = "Add car";
            setInvoice(newInvoice);
        }
    }, [bookingInfo.car])


    return (
        <div>
            <h4>Booking Information:</h4>
            <Table striped borderless hover size="sm">
                <tbody>
                    <tr>
                        <th scope="col">Name</th>
                        <td>{bookingInfo.name}</td>
                    </tr>
                    <tr>
                        <th scope="col">Phone</th>
                        <td>{bookingInfo.phone}</td>
                    </tr>
                    <tr>
                        <th scope="col">Origin</th>
                        <td>{bookingInfo.start}</td>
                    </tr>
                    <tr>
                        <th scope="col">Destination</th>
                        <td>{bookingInfo.end}</td>
                    </tr>
                    <tr>
                        <th scope="col">Distance</th>
                        <td>{bookingInfo.distanceResponse?.distance?.text}</td>
                    </tr>
                    <tr>
                        <th scope="col">Duration</th>
                        <td>{bookingInfo.distanceResponse?.duration?.text}</td>
                    </tr>
                    <tr>
                        <th scope="col">Pick Date</th>
                        <td>{bookingInfo.pickDate}</td>
                    </tr>
                    <tr>
                        <th scope="col">Drop Date</th>
                        <td>{bookingInfo.dropDate}</td>
                    </tr>
                    <tr>
                        <th scope="col">Total Days</th>
                        <td>{bookingInfo.totalDays}</td>
                    </tr>
                    {
                        bookingInfo.car && bookingInfo.distanceResponse?.distance && (
                            <>
                                <tr>
                                    <th scope="col">Rent</th>
                                    <td>{invoice.rentForDays}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Price for kilo.</th>
                                    <td>{invoice.priceForKilo}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Total</th>
                                    <td>{invoice.total}</td>
                                </tr>
                            </>
                        )
                    }

                </tbody>
            </Table>
            <button className="btn btn-warning" onClick={() => setSummaryShow(false)}>Edit</button>
        </div>
    );
};

export default BookingSummary;