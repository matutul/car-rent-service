import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import RowOfCar from './RowOfCar/RowOfCar';


const Cars = () => {
    const [allCars, setAllCars] = useState([]);
    useEffect(() => {
        fetch('https://rocky-waters-70556.herokuapp.com/cars')
            .then(res => res.json())
            .then(cars => setAllCars(cars))
    }, [])
    console.log(allCars);
    return (
        <div>
            <h3>Cars:</h3>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Car Name</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Number</th>
                        <th>seats</th>
                        <th>Price per km</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allCars.map((car, index) => <RowOfCar car={car} index={index}></RowOfCar>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default Cars;