import React, { useState } from 'react';
import { useEffect } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import ModalSection from '../../Modal/ModalSection';
import Admin from './Admin/Admin';

const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [updateAdminsTable, setUpdateAdminsTable] = useState(false);

    useEffect(() => {
        fetch('https://rocky-waters-70556.herokuapp.com/admins')
            .then(res => res.json())
            .then(data => { 
                setAdmins(data);
                setShowLoading(false);
             })
    }, [updateAdminsTable])

    const handleRemove = (adminId) => {
        setShowLoading(true);
        fetch('http://localhost:4000/deleteAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id: adminId })
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    setShow(true);
                    setUpdateAdminsTable(!updateAdminsTable);
                }
            })
    }

    const modalData = {
        type: 'inform',
        title: 'Success message',
        body: 'The admin has been removed successfully'
    }

    return (
        <div>
            <h3>Admins:</h3>
            <div className="mt-3 shadow rounded">
                <Table striped hover responsive>
                    <thead>
                        <tr className="border">
                            <th className="border-left">#</th>
                            <th className="border-left">Name</th>
                            <th className="border-left">Email</th>
                            <th className="border-left">Photo</th>
                            <th className="border-left">Actions</th>
                        </tr>
                    </thead>
                    {
                        !showLoading ?
                            <tbody>
                                {
                                    admins.map((admin, index) => <Admin key={admin._id} admin={admin} index={index} handleRemove={handleRemove}></Admin>)
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

export default Admins;