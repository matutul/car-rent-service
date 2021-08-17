import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ModalSection from './../../../Modal/ModalSection';

const RowOfCar = ({ car, index, handleRemove }) => {
    // console.log(car, index);
    const [show, setShow] = useState(false);
    // // const [isSureToRemove, setIsSureToRemove] = useState(false);

    // const handleClose = (isSureToRemove) => {
    //     if (isSureToRemove) {
    //         handleRemove(car._id);
    //     }
    //     setShow(false);
    // };
    const handleShow = () => setShow(true);

    const modalData = {
        type: 'confirm',
        title: 'Removing Car',
        body: `Warning: This car will be removed from the list permanently. Are you sure you want to remove?`
    }

    return (
        <>
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
                    <Button variant="danger" className="mx-2" onClick={() => { handleShow() }}>Delete</Button>
                </td>
            </tr>

            {
               show && <ModalSection information={modalData} action={() => handleRemove(car._id)} showState={[show, setShow]}></ModalSection>
            }

            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Removing Car</Modal.Title>
                </Modal.Header>
                <Modal.Body>Warning: This car will be removed from the list permanently. <br /> Are you sure you want to remove?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose(false)}>No</Button>
                    <Button variant="primary" onClick={() => handleClose(true)}>Yes</Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
};

export default RowOfCar;