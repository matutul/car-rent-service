import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalSection = ({ information, action, showState }) => {

    const [show, setShow] = showState;

    const handleClose = (isSure) => {
        if (isSure) {
            action();
        }
        setShow(false);
    };
    // const handleShow = () => setShow(true);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{information.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{information.body}</Modal.Body>
            <Modal.Footer>
                {
                    (information.type === "confirm") && <>
                        <Button variant="secondary" onClick={() => handleClose(false)}>No</Button>
                        <Button variant="primary" onClick={() => handleClose(true)}>Yes</Button>
                    </>
                }

                {
                    (information.type === "inform") && <Button variant="primary" onClick={() => handleClose(false)}>Okay</Button>
                }
            </Modal.Footer>
        </Modal>
    );
};

export default ModalSection;