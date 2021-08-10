import React from 'react';
import { Button } from 'react-bootstrap';

const Admin = ({ admin, index }) => {
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
                <Button variant="warning " className="mx-2">Edit</Button>
                <Button variant="danger" className="mx-2">Remove</Button>
            </td>
        </tr>
    );
};

export default Admin;