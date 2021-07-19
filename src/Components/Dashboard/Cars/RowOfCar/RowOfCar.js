import React from 'react';
import { Button } from 'react-bootstrap';

const RowOfCar = ({ car, index }) => {
    console.log(car, index);
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{car.carName}</td>
            <td>{car.modelName}</td>
            <td>{car.modelYear}</td>
            <td>{car.number}</td>
            <td>{car.seat}</td>
            <td>{car.price}</td>
            <td>
                <img style={{ width: '70px' }} src={car.photo} alt="" />
            </td>
            <td>
                <Button variant="warning " className="mx-2">Edit</Button>
                <Button variant="danger" className="mx-2">Delete</Button>
            </td>
        </tr>
    );
};

export default RowOfCar;