import React, { useState, useContext, useEffect } from 'react';
import './SolvedComplain.css';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../../App';
import { Button, Spinner } from 'react-bootstrap';
import OrderTableTamplate from '../../RegularOrders/OrderTableTamplate/OrderTableTamplate';

const SolvedComplain = ({ isAdmin }) => {
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [textLength, setTextLength] = useState(0);
    const [addNewComplain, setAddNewComplain] = useState(false);
    const [complains, setComplains] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [columns, setColumns] = useState();
    const [statusChange, setStatusChange] = useState(false);

    console.log(complains);

    useEffect(() => {
        fetch('https://rocky-waters-70556.herokuapp.com/complains?category=solved', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedinUser.email })
        })
            .then(res => res.json())
            .then(result => {
                setComplains(result);
                setIsLoading(false);
            })

        setColumns([
            {
                Header: 'SL',
                Cell: ({ cell }) => {
                    return cell.row.index + 1;
                },
                sortType: 'basic'
            },
            {
                Header: 'Name',
                accessor: 'name', // accessor is the "key" in the data
                sortType: 'basic'
            },
            {
                Header: 'Email',
                accessor: 'email',
                sortType: 'basic'
            },
            {
                Header: 'Subject',
                accessor: 'subject',
                sortType: 'basic'
            },
            {
                Header: 'Complain',
                accessor: 'complain',
                sortType: 'basic'
            },
            {
                Header: 'Date',
                accessor: 'date',
                sortType: 'basic'
            },
            {
                Header: (() => {
                    if (isAdmin) {
                        return 'Actions'
                    }
                    else {
                        return 'Status'
                    }
                })(),
                Cell: ({ cell }) => {
                    console.log("actions of cell", cell)
                    return <>
                        {
                            isAdmin ?
                                <>
                                    <select
                                        name='status'
                                        className="mr-3"
                                        defaultValue={cell.row.original.status}
                                        onChange={(e) => handleChange(e, cell.row.original._id)}
                                    >
                                        {['PENDING', 'UNDER REVIEW', 'SOLVED'].map(complainStatus => (
                                            <option key={complainStatus} value={complainStatus}>
                                                {complainStatus}
                                            </option>
                                        ))}
                                    </select>
                                </>
                                :
                                <>
                                    <Button disabled>{cell.row.original.status}</Button>
                                </>
                        }
                    </>
                }
            }
        ])
    }, [statusChange])


    const handleChange = (e, id) => {
        const orderToUpdate = {
            id: id,
            value: e.target.value
        }
        if (e.target.name === 'status') {
            fetch('https://rocky-waters-70556.herokuapp.com/updateComplainStatus', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ orderToUpdate })
            })
                .then(res => res.json())
                .then(result => {
                    setStatusChange(!statusChange);
                    result ? alert(`Complain status is updated successfully`) : alert('Not updated successfully')
                })
        }
    }

    const onSubmit = data => {
        data.date = new Date();
        data.status = 'PENDING';
        fetch('https://rocky-waters-70556.herokuapp.com/addComplain', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    alert('Complain is successfully submitted.');
                    reset();
                }
            })
        console.log(data)
    };

    const handleOnChange = (e) => {
        setTextLength(e.target.value.length);
    }
    return (
        <div>
            <div className="bookingInformationTitle d-flex justify-content-center align-items-center text-center shadow mb-3 p-2 relative complainHeader">
                <h4>Complain</h4>
                {
                    !isAdmin &&
                    <Button className='makeComplainButton' onClick={() => { setAddNewComplain(true) }}>Make Complain</Button>
                }
            </div>
            {
                addNewComplain &&
                <form className="border p-4 rounded my-5 shadow" onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}

                    <input className="w-100 my-2 py-1 px-3 form-control" {...register("name", { required: true })} defaultValue={loggedinUser.displayName || ""} placeholder="Name" />
                    {errors.name && <p className="text-warning">This is field is required</p>}

                    <input className="w-100 my-2 py-1 px-3 form-control" placeholder="Email" defaultValue={loggedinUser.email || ""} {...register("email", { required: true })} />
                    {errors.email && <p className="text-warning">This is field is required</p>}

                    <input className="w-100 my-2 py-1 px-3 form-control" placeholder="Subject" {...register("subject", { required: true })} />
                    {errors.email && <p className="text-warning">This is field is required</p>}

                    {/* include validation with required or other standard HTML validation rules */}
                    <textarea type="text-area" className="w-100 my-2 py-1 px-3 form-control" style={{ height: '150px' }} placeholder="Your complain..." {...register("complain", { required: true, maxLength: 1200 })} onChange={handleOnChange} />
                    {errors.complain?.type === 'required' && <p className="text-warning">This field is required</p>}
                    {errors.complain?.type === 'maxLength' && <p className="text-warning">Max length is exceeded. Maximum 1200 character. Here is {textLength}</p>}

                    <input className="my-2 px-5 btn btn-primary" type="submit" />
                    {errors.end && <p className="text-warning">This is field is required</p>}

                    <Button className="m-2  px-5 btn btn-warning" onClick={() => { setAddNewComplain(false) }} >Cancel</Button>
                </form>
            }
            {
                isLoading ?
                    <div className="w-100 py-5 d-flex justify-content-center align-items-center">
                        <Spinner animation="border" variant="secondary" />
                    </div>
                    :
                    complains.length ?
                        <OrderTableTamplate tdRows={complains} thRow={columns} handleChange={handleChange} />
                        :
                        <div className="w-100 py-5 d-flex justify-content-center align-items-center">
                            <p>Not Data Found</p>
                        </div>
            }
        </div>
    );
};

export default SolvedComplain;