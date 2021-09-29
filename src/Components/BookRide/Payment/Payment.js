import React from 'react';
import NavbarUpper from './../../Shared/Navbar/NavbarUpper/NavbarUpper';
import NavbarMain from './../../Shared/Navbar/NavbarMain/NavbarMain';
import Footer from './../../Shared/Footer/Footer';
import { useEffect } from 'react';
import './Payment.css';
import { UserContext } from './../../../App';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import CarInPayment from './CarInPayment/CarInPayment';
import { useHistory } from 'react-router-dom';

const Payment = () => {
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    const [carBookingInfo, setCarBookingInfo] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const history = useHistory();

    const onSubmit = data => {
        // const dataForPayment = {
        //     total_amount: Math.ceil(carBookingInfo.cart.total),
        //     currency: 'BDT',
        //     tran_id: `REF${carBookingInfo.data.phone}`, // use unique tran_id for each api call
        //     success_url: 'https://rocky-waters-70556.herokuapp.com/success',
        //     fail_url: 'https://rocky-waters-70556.herokuapp.com/fail',
        //     cancel_url: 'https://rocky-waters-70556.herokuapp.com/cancel',
        //     ipn_url: 'https://rocky-waters-70556.herokuapp.com/ipn',
        //     shipping_method: 'Rent',
        //     product_name: 'Car rent',
        //     product_category: 'Electronic',
        //     product_profile: 'general',
        //     cus_name: carBookingInfo.data.name,
        //     cus_email: data.email,
        //     cus_add1: data.add1,
        //     cus_add2: data.add2,
        //     cus_city: data.city,
        //     cus_state: data.state,
        //     cus_postcode: data.postCode,
        //     cus_country: 'Bangladesh',
        //     cus_phone: carBookingInfo.data.phone,
        //     cus_fax: '',
        //     ship_name: carBookingInfo.data.name,
        //     ship_add1: data.add1,
        //     ship_add2: data.add2,
        //     ship_city: data.city,
        //     ship_state: data.state,
        //     ship_postcode: data.postCode,
        //     ship_country: 'Bangladesh',
        // };

        // fetch('https://rocky-waters-70556.herokuapp.com/ssl-request', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*'
        //     },
        //     body: JSON.stringify(dataForPayment)
        // })
        //     .then(res => res.json())
        //     .then(result => {
        //         console.log(result);
        //         alert(result);
        //     })


        // Adding booking information in database

        if (carBookingInfo.car?.length > 0 && carBookingInfo.cart) {
            fetch('https://rocky-waters-70556.herokuapp.com/addOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...carBookingInfo, paymentAddress: data, orderStatus: 'PENDING', paymentStatus: 'PARTIAL PAID' })
            })
            .then(res => res.json())
            .then(result => {
                if(result){
                    alert("Congrats!, The order is placed successfully!");
                    localStorage.removeItem('bookingInfo');
                    history.push('/book')
                }
            })
        }
    }


    useEffect(() => {
        const retrievedObject = JSON.parse(localStorage.getItem('bookingInfo'));
        if (retrievedObject) {
            setCarBookingInfo(retrievedObject);
            // localStorage.removeItem('bookingInfo');
        }
    }, [carBookingInfo?.car?.length])

    console.log(carBookingInfo);

    return (
        <div>
            <NavbarUpper></NavbarUpper>
            <div className="sticky-top">
                <NavbarMain></NavbarMain>
            </div>


            <div className="container paymentSection">
                <div className="p-4 my-3 shadow priceBox">
                    <div className="row w-100 mx-auto mb-3">
                        <div className="col-md-6">
                            {
                                carBookingInfo?.car?.length > 0 &&
                                <div className="p-3 shadow">
                                    {
                                        carBookingInfo?.car?.map((car, index) => <CarInPayment key={index} car={car} carBookingInfo={carBookingInfo} setCarBookingInfo={setCarBookingInfo}></CarInPayment>)
                                    }
                                </div>
                            }
                        </div>
                        <div className="col-md-6">
                            <div className="p-3 shadow">
                                <div className="bookingInformationTitle d-flex justify-content-center align-items-center text-center shadow mb-3 p-2">
                                    <h4>Total Amount</h4>
                                </div>
                                <Table size="sm">
                                    <tbody>
                                        <tr>
                                            <td scope="col">Total days:</td>
                                            <td>{carBookingInfo?.data?.totalDays}</td>
                                        </tr>
                                        <tr>
                                            <td scope="col">Rent for total days:</td>
                                            <td>{(carBookingInfo?.cart?.rent)?.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td scope="col">Rent for total Kilos:</td>
                                            <td>{(carBookingInfo?.cart?.kiloPrice)?.toFixed(2)}</td>
                                        </tr>
                                        <tr className="totalPrice">
                                            <td scope="col">Total:</td>
                                            <td>{(carBookingInfo?.cart?.total)?.toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className="row w-100 mx-auto mb-3">
                        <div className="bookingInformationTitle d-flex justify-content-center align-items-center text-center shadow mb-3 p-2">
                            <h4>Payment Information</h4>
                        </div>
                        {/* Required information for payment process */}
                        <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                            <input className="form-control my-2" defaultValue={loggedinUser?.email} {...register("email", { required: "You must specify an email" })} placeholder="Your email *" />
                            {errors.email && <p className="text-warning">{errors.email.message}</p>}

                            <input className="form-control my-2" {...register("add1", { required: "You must specify an Address" })} placeholder="Address 1 *" />
                            {errors.add1 && <p className="text-warning">{errors.add1.message}</p>}

                            <input className="form-control my-2" {...register("add2")} placeholder="Address 2" />
                            {errors.add2 && <p className="text-warning">{errors.add2.message}</p>}

                            <input className="form-control my-2" {...register("city", { required: "You must specify an City" })} placeholder="City *" />
                            {errors.city && <p className="text-warning">{errors.city.message}</p>}

                            <input className="form-control my-2" {...register("postCode", { required: "You must specify an Post Code" })} placeholder="Post code *" />
                            {errors.postCode && <p className="text-warning">{errors.postCode.message}</p>}

                            <input className="form-control my-2" {...register("state", { required: "You must specify an State" })} placeholder="State *" />
                            {errors.state && <p className="text-warning">{errors.state.message}</p>}

                            <Button type="submit" disabled={!carBookingInfo?.car?.length}>Pay to Book</Button>
                        </form>
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Payment;