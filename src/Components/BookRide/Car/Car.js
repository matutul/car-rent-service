import React from 'react';
// import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { bookingContext } from '../BookRide/BookRide';

const Car = ({ car }) => {
    const [bookingInfo, setBookingInfo] = useContext(bookingContext);

    console.log(bookingInfo);

    const addCarToBookingInfo = () => {

        //Charge for this car based on the given basic booking information
        const dayRent = parseFloat(car.rent);
        const kiloPrice = parseFloat(car.price);
        const days = bookingInfo.totalDays;
        let totalKilos = bookingInfo.distanceResponse.distance.value / 1000;

        if (bookingInfo.updown) {
            totalKilos = totalKilos * 2;
        }
        //calculation
        const totalRent = days * dayRent;
        const totalPrice = kiloPrice * totalKilos;
        const totalCharge = totalRent + totalPrice;
        car.totalRent = totalRent;
        car.totalPrice = totalPrice;
        car.totalCharge = totalCharge;


        //adding this car to the booking form information dataset
        const bookingInfoAddCar = { ...bookingInfo };
        if (!bookingInfo.car || bookingInfoAddCar.car.length <= 0) {
            bookingInfoAddCar.car = [car];
        }
        else {
            const sameCar = bookingInfoAddCar.car.find(savedCar => savedCar._id === car._id);
            if (sameCar) {
                alert("The car is already added.");
            }
            else {
                bookingInfoAddCar.car = [...bookingInfoAddCar.car, car];
            }
        }
        setBookingInfo(bookingInfoAddCar);
        localStorage.setItem('bookingInfo', JSON.stringify(bookingInfoAddCar));
    }

    // console.log(car);

    return (
        <div className="p-2">
            <Card style={{width:'280px'}}>
                <Card.Img style={{ height: "160px", container: 'fit-content' }} variant="top" src={car.photo} />
                <Card.Body>
                    <Card.Title>{car.carName}</Card.Title>
                    <Card.Text>
                        Model: {car.modelName} <br />
                        Model Year: {car.modelYear} <br />
                        Register Number: {car.number} <br />
                        Passenger Seat: {car.seat} <br />
                        Rent per day: {car.rent} <br />
                        Price Per Kilometer: BDT {car.price}&#2547;
                    </Card.Text>
                    <Button variant="success" onClick={addCarToBookingInfo}>Add for ride</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Car;