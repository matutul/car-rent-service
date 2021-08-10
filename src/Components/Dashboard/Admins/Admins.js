import React, { useState } from 'react';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Admin from './Admin/Admin';

const Admins = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        fetch('https://rocky-waters-70556.herokuapp.com/admins')
            .then(res => res.json())
            .then(data => setAdmins(data))
    }, [])

    return (
        <div>
            <h3>Admins:</h3>
            <div className="mt-3 shadow rounded">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Photo</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins.map((admin, index) => <Admin key={admin._id} admin={admin} index={index}></Admin>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Admins;