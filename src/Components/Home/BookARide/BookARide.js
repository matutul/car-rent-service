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
                <div className="row">
                    <div className="col-md-6 col-lg-3">
                        <input className="form-control" placeholder="Pick up location" {...register("start", { required: "Specify a pick up location" })} />
                        {errors.start && <p className="errorMessage">{errors.start.message}</p>}
                    </div>

                    <div className="col-md-6 col-lg-3">
                        <input className="form-control" placeholder="Drop off location" {...register("end", { required: "Specify a drop off location" })} />
                        {/* errors will return when field validation fails  */}
                        {errors.end && <p className="errorMessage">{errors.end.message}</p>}
                    </div>

                    <div className="col-md-6 col-lg-3">
                        <input className="form-control" placeholder="Phone Number" {...register("phone", { required: "Specify a phone number" })} />
                        {/* errors will return when field validation fails  */}
                        {errors.phone && <p className="errorMessage">{errors.phone.message}</p>}
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <input className="form-control btn bookARideSubmitBtn" type="submit" value="Book A Ride" />
                    </div>
                </div>







            </form>
        </div>
    );
};

export default BookARide;