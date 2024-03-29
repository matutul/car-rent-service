import React, { useState, useEffect } from 'react';
import './CompletedOrders.css';
import { Button, Spinner } from 'react-bootstrap';
import OrderTableTamplate from '../OrderTableTamplate/OrderTableTamplate';

const CompletedOrders = ({ email, isAdmin }) => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState()
    const [statusChange, setStatusChange] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://rocky-waters-70556.herokuapp.com/allOrders?orderType=COMPLETED', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
            .then(res => res.json())
            .then(responseData => {
                console.log(responseData)
                if (responseData.length > 0) {
                    setData(responseData);
                }
                setIsLoading(false)
            });

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
                accessor: 'data.name', // accessor is the "key" in the data
                sortType: 'basic'
            },
            {
                Header: 'Phone',
                accessor: 'data.phone',
                sortType: 'basic'
            },
            {
                Header: 'Start',
                accessor: 'data.start',
                sortType: 'basic'
            },
            {
                Header: 'End',
                accessor: 'data.end',
                sortType: 'basic'
            },
            {
                Header: 'TotalDays',
                accessor: 'data.totalDays',
                sortType: 'basic'
            },
            {
                Header: 'Pick Date',
                accessor: 'data.pickDate',
                sortType: 'basic'
            },
            {
                Header: 'Drop Date',
                accessor: 'data.dropDate',
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
                    // console.log("actions of cell", cell)
                    return <>
                        {
                            isAdmin ? <>
                                <select
                                    name='orderStatus'
                                    className="mr-3"
                                    defaultValue={cell.row.original.orderStatus}
                                    onChange={(e) => handleChange(e, cell.row.original._id)}
                                >
                                    {['PENDING', 'PROCESSING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'].map(orderStatus => (
                                        <option key={orderStatus} value={orderStatus}>
                                            {orderStatus}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name='paymentStatus'
                                    defaultValue={cell.row.original.paymentStatus}
                                    onChange={(e) => handleChange(e, cell.row.original._id)}
                                >
                                    {['PARTIAL PAID', 'FULL PAID'].map(paymentStatus => (
                                        <option key={paymentStatus} value={paymentStatus}>
                                            {paymentStatus}
                                        </option>
                                    ))}
                                </select>
                            </>
                                : <>
                                    <Button disabled>{cell.row.original.orderStatus}</Button>
                                    <Button disabled>{cell.row.original.paymentStatus}</Button>
                                </>
                        }
                    </>
                }
            }
        ])
    }, [statusChange])

    // console.log(data);

    const handleChange = (e, id) => {

        const orderToUpdate = {
            id: id,
            value: e.target.value
        }
        if (e.target.name === 'orderStatus') {
            fetch('https://rocky-waters-70556.herokuapp.com/updateOrderStatus', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ orderToUpdate })
            })
                .then(res => res.json())
                .then(result => {
                    setStatusChange(!statusChange);
                    result ? e.target.name === 'orderStatus' ? alert(`Order status is updated successfully`) : alert(`Payment status is updated successfully`) : alert('Not updated successfully')
                })
        }
        if (e.target.name === 'paymentStatus') {
            fetch('https://rocky-waters-70556.herokuapp.com/updatePaymentStatus', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ orderToUpdate })
            })
                .then(res => res.json())
                .then(result => {
                    result ? e.target.name === 'orderStatus' ? alert(`Order status is updated successfully`) : alert(`Payment status is updated successfully`) : alert('Not updated successfully')
                    // setStatusChange(!statusChange);
                })
        }

    }
    return (
        <div>
            <h3>Completed Orders:</h3>
            {
                isLoading ?
                    <div className="w-100 py-5 d-flex justify-content-center align-items-center">
                        <Spinner animation="border" variant="secondary" />
                    </div>
                    :
                    data.length ?
                        <OrderTableTamplate tdRows={data} thRow={columns} handleChange={handleChange} />
                        :
                        <div className="w-100 py-5 d-flex justify-content-center align-items-center">
                            <p>Not Data Found</p>
                        </div>
            }
        </div>
    );
};

export default CompletedOrders;