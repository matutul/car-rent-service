import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { bookingContext } from '../BookRide/BookRide';
import { UserContext } from '../../../App';
import { useForm } from "react-hook-form";
import './BookingForm.css';




const BookingForm = ({ summaryShow, setSummaryShow }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    const [bookingInfo, setBookingInfo] = useContext(bookingContext);

    useEffect(() => {
        reset(bookingInfo);
    }, [reset])


    const onSubmit = data => {
        console.log("This is data from booking form", data);
        if (data.car?.length > 0) {
            data.car = [];
        }
        const startDate = new Date(data.pickDate);
        const endDate = new Date(data.dropDate);
        const totalDuration = endDate.getTime() - startDate.getTime();
        const totalDays = (totalDuration / (1000 * 3600 * 24)) + 1;
        console.log(totalDays);

        if (bookingInfo.distanceResponse?.status === "NOT_FOUND") {
            alert("Please fill with proper value such as more specific location.");
        }
        else {
            const newBookingInfo = { ...bookingInfo }
            newBookingInfo.data = {name: data.name, phone: data.phone, pickDate: data.pickDate, dropDate: data.dropDate, start: data.start, end: data.end, totalDays};

            setBookingInfo(newBookingInfo);
            console.log(newBookingInfo);
            console.log(bookingInfo);

            localStorage.setItem("bookingInfo", JSON.stringify(newBookingInfo));
            setSummaryShow(true);
        }
    };

    const handleOnChange = e => {
        if (e.target.name === 'start') {
            const updateBookingInfo = { ...bookingInfo }
            updateBookingInfo.data.start = e.target.value;
            setBookingInfo(updateBookingInfo);
        }
        if (e.target.name === 'end') {
            const updateBookingInfo = { ...bookingInfo }
            updateBookingInfo.data.end = e.target.value;
            setBookingInfo(updateBookingInfo);
        }
        // console.log(bookingInfo);
    }

    const handleCheckBoxClick = (e) => {
        const updateUpdown = { ...bookingInfo };
        if (e.target.name === 'updown') {
            updateUpdown.updown = true;
            updateUpdown.car?.forEach(car => {
                car.totalPrice *= 2;
            })
            if (updateUpdown.distanceResponse?.status === "OK") {
                const distanceInResponse = updateUpdown.distanceResponse;
                const distanceOfUpdown = {
                    distance: {
                        text: `${((distanceInResponse.distance.value * 2) / 1000).toFixed(2)} km`,
                        value: distanceInResponse.distance.value * 2
                    },
                    duration: {
                        text: `${((distanceInResponse.duration.value * 2) / (60 * 60)).toFixed(0)} hours ${Math.ceil((((distanceInResponse.duration.value * 2) % (60 * 60)) / 60))} mins`,
                        value: distanceInResponse.duration.value * 2
                    }
                }
                updateUpdown.updownDistance = distanceOfUpdown;
            }
        }

        if (e.target.name === 'oneWay') {
            updateUpdown.updown = false;
            updateUpdown.car?.forEach(car => {
                car.totalPrice *= 0.5;
            })
            if (updateUpdown.updownDistance) {
                delete updateUpdown.updownDistance;
            }
        }
        setBookingInfo(updateUpdown);
        localStorage.setItem('bookingInfo', JSON.stringify(updateUpdown));
        // console.log(bookingInfo);

    }


    return (
        <>
            <div className="bookingInformationTitle d-flex justify-content-center align-items-center text-center shadow mb-3 p-2">
                <h4>Booking Information</h4>
            </div>
            <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}

                <input className="w-100 my-2 py-1 px-3 form-control" {...register("name", { required: true })} defaultValue={loggedinUser.displayName || bookingInfo?.data?.name} placeholder="Name" />
                {errors.name && <p className="text-warning">This is field is required</p>}

                <input className="w-100 my-2 py-1 px-3 form-control" placeholder="Phone number" defaultValue={loggedinUser.phoneNumber || bookingInfo?.data?.phone} {...register("phone", { required: true })} />
                {errors.phone && <p className="text-warning">This is field is required</p>}

                {/* include validation with required or other standard HTML validation rules */}
                <input className="w-100 my-2 py-1 px-3 form-control" placeholder="Start Destination" defaultValue={bookingInfo?.data?.start}  {...register("start", { required: true })} onChange={handleOnChange} />
                {errors.start && <p className="text-warning">This is field is required</p>}

                <input className="w-100 my-2 py-1 px-3 form-control" placeholder="End Destination" defaultValue={bookingInfo?.data?.end} {...register("end", { required: true })} onChange={handleOnChange} />
                {errors.end && <p className="text-warning">This is field is required</p>}

                <label className="my-2 mr-3">
                    <input
                        className="mr-2"
                        // {...register("oneWay")}
                        name="oneWay"
                        // value={true}
                        checked={!bookingInfo.updown}
                        onClick={handleCheckBoxClick}
                        type="checkbox"
                    />
                    One way <span>(শুধু যাওয়া)</span>
                </label>
                <label className="my-2">
                    <input
                        className="mr-2"
                        // {...register("updown")}
                        name="updown"
                        // value={true}
                        checked={bookingInfo.updown}
                        onClick={handleCheckBoxClick}
                        type="checkbox"
                    />
                    UpDown <span>(যাওয়া-আসা)</span>
                </label>

                {
                    (bookingInfo.distanceResponse && bookingInfo?.distanceResponse?.status !== "NOT_FOUND") && <div className="my-3 p-2 distanceInformation shadow">
                        <p className="mb-0">{bookingInfo.updown ? "যাওয়া-আসাঃ" : "শুধু যাওয়াঃ"} </p>
                        {/* <div className="row mt-0 w-100 mx-auto"> */}
                        <div className="col-12">
                            {/* <label className="mb-0">Distance:</label> */}
                            <p className="w-100 py-1 px-3 oneWayInfomation my-1">Distance: {(bookingInfo.updownDistance && bookingInfo.updown) ? bookingInfo.updownDistance?.distance?.text : bookingInfo?.distanceResponse?.distance?.text}</p>
                        </div>
                        <div className="col-12">
                            {/* <label className="mb-0">Possible time:</label> */}
                            <p className="w-100 py-1 px-3 oneWayInfomation my-1">Possible time: {(bookingInfo.updownDistance && bookingInfo.updown) ? bookingInfo.updownDistance?.duration?.text : bookingInfo?.distanceResponse?.duration?.text}</p>
                        </div>
                        {/* </div> */}
                    </div>
                }


                <div className="row">
                    <div className="col-12">
                        <label className="mb-0" htmlFor="pickDate">Pick up date:</label>
                        <input className="w-100 my-2 py-1 px-3 form-control" defaultValue={bookingInfo?.data?.pickDate} type="date" placeholder="Pick up date" {...register("pickDate", { required: true })} />
                        {errors.pickDate && <p className="text-warning">This field is required</p>}
                    </div>
                    <div className="col-12">
                        <label className="mb-0" htmlFor="dropDate">Drop off date:</label>
                        <input className="w-100 my-2 py-1 px-3 form-control" defaultValue={bookingInfo?.data?.dropDate} type="date" placeholder="Drop off date" {...register("dropDate", { required: true })} />
                        {errors.dropDate && <p className="text-warning">This field is required</p>}
                    </div>
                </div>
                <input className="w-100 my-2 btn btn-warning" type="submit" value="Next" />
            </form>
        </>
    );
};

export default BookingForm;