import React from 'react';
import { useForm } from "react-hook-form";
import 'react-calendar/dist/Calendar.css';
import { useContext } from 'react';
import { bookingContext } from '../BookRide/BookRide';
import { UserContext } from '../../../App';

const BookingForm = ({ summaryShow, setSummaryShow }) => {
    const [loggedinUser,] = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [bookingInfo, setBookingInfo] = useContext(bookingContext);


    const onSubmit = data => {
        if (bookingInfo.distanceResponse.status === "NOT_FOUND") {
            alert("Please fill with proper value such as more specific location.");
        }
        else {
            const newBookingInfo = { distanceResponse: bookingInfo.distanceResponse, ...data, car: bookingInfo.car }
            setBookingInfo(newBookingInfo);
            setSummaryShow(true);
        }
    };

    const handleOnBlur = e => {
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
        console.log(bookingInfo);
    }



    return (
        <>
            <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}

                <input className="w-100 my-2 py-1 px-3 form-control" defaultValue={loggedinUser.displayName || bookingInfo.name} placeholder="Name" {...register("name", { required: true })} />
                {errors.phone && <p>This is field is required</p>}

                <input className="w-100 my-2 py-1 px-3 form-control" defaultValue={loggedinUser.phoneNumber || bookingInfo.phone} placeholder="Phone number" {...register("phone", { required: true })} />
                {errors.phone && <p>This is field is required</p>}

                {/* include validation with required or other standard HTML validation rules */}
                <input className="w-100 my-2 py-1 px-3 form-control" defaultValue={bookingInfo?.start} placeholder="Start Destination" {...register("start", { required: true })} onChange={handleOnBlur} />
                {errors.start && <p>This is field is required</p>}

                <input className="w-100 my-2 py-1 px-3 form-control" defaultValue={bookingInfo?.end} placeholder="End Destination" {...register("end", { required: true })} onChange={handleOnBlur} />
                {errors.end && <p>This is field is required</p>}

                {
                    (bookingInfo.distanceResponse && bookingInfo?.distanceResponse?.status !== "NOT_FOUND") && <div className="row my-3">
                        <div className="col-6">
                            <label className="mb-0">Distance:</label>
                            <input className="w-100 py-1 px-3 form-control" defaultValue={bookingInfo?.distanceResponse?.distance?.text} placeholder="Distance" disabled={true} />
                        </div>
                        <div className="col-6">
                            <label className="mb-0">Possible time:</label>
                            <input className="w-100 py-1 px-3 form-control" defaultValue={bookingInfo?.distanceResponse?.duration?.text} placeholder="Possible time" disabled={true} />
                        </div>
                    </div>
                }


                <div className="row">
                    <div className="col-6">
                        <label className="mb-0" htmlFor="pickDate">Pick up date:</label>
                        <input className="w-100 my-2 py-1 px-3 form-control" defaultValue={bookingInfo?.pickDate} type="date" placeholder="Pick up date" {...register("pickDate", { required: true })} />
                        {errors.pickDate && <p>This is field is required</p>}
                    </div>
                    <div className="col-6">
                        <label className="mb-0" htmlFor="dropDate">Drop off date:</label>
                        <input className="w-100 my-2 py-1 px-3 form-control" defaultValue={bookingInfo?.dropDate} type="date" placeholder="Pick up date" {...register("dropDate", { required: true })} />
                        {errors.dropDate && <p>This is field is required</p>}
                    </div>

                </div>
                <input className="w-100 my-2 btn btn-warning" type="submit" value="Next" />
            </form>
        </>
    );
};

export default BookingForm;