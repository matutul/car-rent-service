import React from 'react';
import { useContext, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { bookingContext } from './../BookRide/BookRide';
import './AddedCar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const AddedCar = ({ car }) => {
    const [bookingInfo, setBookingInfo] = useContext(bookingContext);

    const handleRemove = (id) => {
        const carToRemove = { ...bookingInfo };
        carToRemove.car = carToRemove.car.filter(car => car._id !== id);
        setBookingInfo(carToRemove);
        localStorage.setItem('bookingInfo', JSON.stringify(carToRemove));
    }

    return (
        <div className="addedCar w-100 d-flex align-items-center justify-content-center shadow my-3">
            <div className="carImage">
                <img src={car.photo} alt={car.carName} />
            </div>
            <div className="details my-0 py-0">
                <Table borderless size="sm" className="m-0">
                    <tbody>
                        <tr className="my-0 py-0" style={{ fontSize: '1rem' }}>
                            <td className="td p-0" scope="col">Price:</td>
                            <td className="td p-0">{(car.totalRent).toFixed(2)} &#2547;</td>
                        </tr>
                        <tr className="my-0 py-0" style={{ fontSize: '1rem' }}>
                            <td className="td p-0" scope="col">Kilometer Charge:</td>
                            <td className="td p-0">{(car.totalPrice).toFixed(2)} &#2547;</td>
                        </tr>
                        <tr className="my-0 py-0" style={{ fontSize: '1rem' }}>
                            <td className="td p-0" scope="col">Total:</td>
                            <td className="td p-0">{Math.floor(car.totalCharge)} &#2547;</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="action">
                <FontAwesomeIcon className="minusButton float-right m-2 text-warning" icon={faMinusCircle} onClick={() => handleRemove(car._id)} />
            </div>
        </div>
    );
};

export default AddedCar;