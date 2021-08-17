import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import ModalSection from '../../Modal/ModalSection';
import RowOfCar from './RowOfCar/RowOfCar';


const Cars = () => {
    const [allCars, setAllCars] = useState([]);
    const [updateAllCars, setUpdateAllCars] = useState(false);
    const [show, setShow] = useState(false);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        fetch('https://rocky-waters-70556.herokuapp.com/cars')
            .then(res => res.json())
            .then(cars => {
                setAllCars(cars);
                setShowLoading(false);
            })
    }, [updateAllCars])

    const handleRemove = (carId) => {
        fetch('http://localhost:4000/deleteCar', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id: carId })
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    setShow(true);
                    setUpdateAllCars(!updateAllCars);
                }
            })
    }

    const modalData = {
        type: 'inform',
        title: 'Success message',
        body: 'The car has been removed successfully'
    }


    // console.log(allCars);
    return (
        <div>
            <h3>Cars:</h3>
            <div className="mt-3 shadow rounded">
                <Table striped borderless hover responsive >
                    <thead>
                        <tr className="border">
                            <th className="border-left">#</th>
                            <th className="border-left">Car Name</th>
                            <th className="border-left">Model</th>
                            <th className="border-left">Year</th>
                            <th className="border-left">Number</th>
                            <th className="border-left">seats</th>
                            <th className="border-left">Price per km</th>
                            <th className="border-left">Image</th>
                            <th className="border-left">Action</th>
                        </tr>
                    </thead>
                    {
                        !showLoading ?
                            <tbody>
                                {
                                    allCars.map((car, index) => <RowOfCar key={index} car={car} index={index} handleRemove={handleRemove} ></RowOfCar>)
                                }
                            </tbody>
                            : <td colspan="9" borderless="true">
                                <div className="w-100 py-4 d-flex justify-content-center align-items-center">
                                    <Spinner animation="border" variant="secondary" />
                                </div>
                            </td>
                    }
                </Table>
            </div>

            <ModalSection information={modalData} showState={[show, setShow]}></ModalSection>
        </div>
    );
};

export default Cars;