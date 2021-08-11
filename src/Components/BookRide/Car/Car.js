import React from 'react';
import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { bookingContext } from '../BookRide/BookRide';

const Car = ({ car, addedCar }) => {
    // console.log(car);
    const [bookingInfo, setBookingInfo] = useContext(bookingContext);
    const addCarToBookingInfo = id => {
        const bookingInfoAddCar = { ...bookingInfo };
        bookingInfoAddCar.car = car;
        setBookingInfo(bookingInfoAddCar);
    }
    const removeCar = () => {
        const updateBookingInfoAfterRemovingCar = { ...bookingInfo };
        delete updateBookingInfoAfterRemovingCar.car;
        setBookingInfo(updateBookingInfoAfterRemovingCar);
    }
    let classForCarCard = "";
    if (addedCar) {
        classForCarCard = "col-md-12 my-3";
    }
    else {
        classForCarCard = "col-md-4 p-3";
    }
    return (
        <div className={`${classForCarCard}`}>
            <Card>
                <Card.Img variant="top" src={car.photo} />
                <Card.Body>
                    <Card.Title>{car.carName}</Card.Title>
                    <Card.Text>
                        Model: {car.modelName} <br />
                        Model Year: {car.modelYear} <br />
                        Register Number: {car.number} <br />
                        Passenger Seat: {car.seat} <br />
                        Price Per Kilometer: BDT {car.price}&#2547;
                    </Card.Text>
                    {
                        addedCar ? <Button variant="danger" onClick={removeCar}>Remove</Button> : <Button variant="success" onClick={() => addCarToBookingInfo(car)}>Add for ride</Button>
                    }

                </Card.Body>
            </Card>
        </div>
    );
};

export default Car;