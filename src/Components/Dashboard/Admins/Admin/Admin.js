import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ModalSection from '../../../Modal/ModalSection';

const Admin = ({ admin, index, handleRemove }) => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const modalData = {
        type: 'confirm',
        title: 'Removing Admin',
        body: `Warning: This Admin will be removed from the list permanently. Are you sure you want to remove?`
    }
    
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{admin.name}</td>
            <td>{admin.email}</td>
            {
                admin.photo === "N/A" ? <td>{admin.photo}</td> : <td>
                    <img style={{ height: '70px', borderRadius: '50%' }} src={admin.photo} alt="" />
                </td>
            }

            <td>
                <Button variant="danger" className="mx-2" onClick={() => handleShow()}>Remove</Button>
            </td>
            {
               show && <ModalSection information={modalData} action={() => handleRemove(admin._id)} showState={[show, setShow]}></ModalSection>
            }
        </tr>
    );
};

export default Admin;