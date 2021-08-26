import React from 'react';
import { useForm } from "react-hook-form";
import 'react-calendar/dist/Calendar.css';
import { useContext, useEffect } from 'react';
import { bookingContext } from '../BookRide/BookRide';
import { UserContext } from '../../../App';
import './BookingForm.css';
// import { useState } from 'react';

const BookingForm = ({ summaryShow, setSummaryShow }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    const [bookingInfo, setBookingInfo] = useContext(bookingContext);

    // useEffect(() => {
    //     reset(bookingInfo);
    // }, [reset])

    useEffect(() => {
        const savedBookingInfo = JSON.parse(window.localStorage.getItem('bookingInfo')) || {};
        if (savedBookingInfo) {
            setBookingInfo(savedBookingInfo);
        }
    }, [])

    useEffect(() => {
        reset(bookingInfo);
    }, [reset])

    const onSubmit = data => {
        // console.log(data);
        const startDate = new Date(data.pickDate);
        const endDate = new Date(data.dropDate);
        const totalDuration = endDate.getTime() - startDate.getTime();
        const totalDays = (totalDuration / (1000 * 3600 * 24)) + 1;
        // console.log(totalDays);

        if (bookingInfo.distanceResponse?.status === "NOT_FOUND") {
            alert("Please fill with proper value such as more specific location.");
        }
        else {
            const newBookingInfo = { ...bookingInfo, ...data, totalDays }
            setBookingInfo(newBookingInfo);
            console.log(bookingInfo);
            // localStorage.setItem("bookingInfo", JSON.stringify(newBookingInfo));
            setSummaryShow(true);
        }
    };

    const handleOnChange = e => {
        if (e.target.name === 'start') {
            const updateBookingInfo = { ...bookingInfo }
            updateBookingInfo.start = e.target.value;
            setBookingInfo(updateBookingInfo);
        }
        if (e.target.name === 'end') {
            const updateBookingInfo = { ...bookingInfo }
            updateBookingInfo.end = e.target.value;
            setBookingInfo(updateBookingInfo);
        }
        // console.log(bookingInfo);
    }

    const handleCheckBoxClick = () => {
        const updateUpdown = { ...bookingInfo };
        const isUpdown = updateUpdown.updown;
        if (isUpdown) {
            updateUpdown.updown = false;
            updateUpdown.car?.forEach(car => {
                car.totalPrice *= 0.5;
            })
        }
        if (!isUpdown) {
            updateUpdown.updown = true;
            updateUpdown.car?.forEach(car => {
                car.totalPrice *= 2;
            })
        }
        // updateUpdown.updown = !bookingInfo.updown;
        // updateUpdown.car = [];
        setBookingInfo(updateUpdown);
        localStorage.setItem('bookingInfo', JSON.stringify(updateUpdown));
        console.log(bookingInfo);
    }


    return (
        <>
            <div className="bookingInformationTitle d-flex justify-content-center align-items-center text-center shadow mb-3 p-2">
                <h4>Booking Information</h4>
            </div>
            <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}

                <input className="w-100 my-2 py-1 px-3 form-control" {...register("name", { required: true })} defaultValue={loggedinUser.displayName || bookingInfo.name} placeholder="Name" />
                {errors.name && <p className="text-warning">This is field is required</p>}

                <input className="w-100 my-2 py-1 px-3 form-control" placeholder="Phone number" defaultValue={loggedinUser.phoneNumber || bookingInfo.phone} {...register("phone", { required: true })} />
                {errors.phone && <p className="text-warning">This is field is required</p>}

                {/* include validation with required or other standard HTML validation rules */}
                <input className="w-100 my-2 py-1 px-3 form-control" placeholder="Start Destination" defaultValue={bookingInfo?.start}  {...register("start", { required: true })} onChange={handleOnChange} />
                {errors.start && <p className="text-warning">This is field is required</p>}

                <input className="w-100 my-2 py-1 px-3 form-control" placeholder="End Destination" defaultValue={bookingInfo?.end} {...register("end", { required: true })} onChange={handleOnChange} />
                {errors.end && <p className="text-warning">This is field is required</p>}

                <label className="my-2">
                    <input
                        className="mr-2"
                        {...register("updown")}
                        name="updown"
                        value={true}
                        checked={bookingInfo.updown}
                        onClick={handleCheckBoxClick}
                        type="checkbox"
                    />
                    UpDown <span>(যাওয়া-আসা)</span>
                </label>

                {
                    (bookingInfo.distanceResponse && bookingInfo?.distanceResponse?.status !== "NOT_FOUND") && <div className="my-3 p-2 distanceInformation shadow">
                        <p className="mb-0">শুধু যাওয়া ঃ</p>
                        <div className="row mt-0 w-100 mx-auto">
                            <div className="col-6">
                                <label className="mb-0">Distance:</label>
                                <input className="w-100 py-1 px-3 form-control oneWayInfomation" defaultValue={bookingInfo?.distanceResponse?.distance?.text} placeholder="Distance" disabled={true} />
                            </div>
                            <div className="col-6">
                                <label className="mb-0">Possible time:</label>
                                <input className="w-100 py-1 px-3 form-control oneWayInfomation" defaultValue={bookingInfo?.distanceResponse?.duration?.text} placeholder="Possible time" disabled={true} />
                            </div>
                        </div>
                    </div>
                }


                <div className="row">
                    <div className="col-6">
                        <label className="mb-0" htmlFor="pickDate">Pick up date:</label>
                        <input className="w-100 my-2 py-1 px-3 form-control" defaultValue={bookingInfo?.pickDate} type="date" placeholder="Pick up date" {...register("pickDate", { required: true })} />
                        {errors.pickDate && <p className="text-warning">This is field is required</p>}
                    </div>
                    <div className="col-6">
                        <label className="mb-0" htmlFor="dropDate">Drop off date:</label>
                        <input className="w-100 my-2 py-1 px-3 form-control" defaultValue={bookingInfo?.dropDate} type="date" placeholder="Pick up date" {...register("dropDate", { required: true })} />
                        {errors.dropDate && <p className="text-warning">This is field is required</p>}
                    </div>

                </div>
                <input className="w-100 my-2 btn btn-warning" type="submit" value="Next" />
            </form>
        </>
    );
};

export default BookingForm;