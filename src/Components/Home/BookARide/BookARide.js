import React from 'react';
import { useForm } from "react-hook-form";
import './BookARide.css';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../App';

const BookARide = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);

    const history = useHistory();
    const onSubmit = data => {
        const bookARideInfoFromHome = { ...loggedinUser };
        bookARideInfoFromHome.bookingInfoFromHome = data;
        setLoggedinUser(bookARideInfoFromHome);
        history.push('/book');
    };

    return (
        <div className="container py-5 text-center">
            <form className="form border rounded p-5" onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                {/* include validation with required or other standard HTML validation rules */}
                <input placeholder="Start Destination" {...register("start", { required: true })} />

                {errors.start && <span>This field is required</span>}
                <input placeholder="End Destination" {...register("end", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.end && <span>This field is required</span>}
                <input placeholder="Phone Number" {...register("phone", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.phone && <span>This field is required</span>}

                <input className="btn btn-danger my-0 submit-btn" type="submit" value="Book A Ride" />
            </form>
        </div>
    );
};

export default BookARide;