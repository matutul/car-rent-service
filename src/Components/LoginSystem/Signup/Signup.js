import React, { useState } from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar/Navbar';
import '../Login/Login.css';
import carBg from '../../../image/carLoginPage.svg';
import { useForm } from "react-hook-form";
import { Button } from 'react-bootstrap';
import facebook from '../../../icons/facebookRound.svg';
import google from '../../../icons/google.svg';
import { Link } from "react-router-dom";

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data);

    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
                <div className="row Login d-flex align-items-end">
                    <div className="col-md-6 my-5 border">
                        <form className="d-flex flex-column p-5" onSubmit={handleSubmit(onSubmit)}>

                            <h3 className="text-center mb-5">Sign up Form</h3>

                            <input className="form-control my-2" {...register("fullname", { required: true })} placeholder="Your fullname" />
                            {errors.fullname && <p>This field is required</p>}

                            <input className="form-control my-2" {...register("email", { required: true })} placeholder="Your email" />
                            {errors.email && <p>This field is required</p>}

                            <input className="form-control my-2" type="password" {...register("password", { required: true })} placeholder="Password" />
                            {errors.password && <p>This field is required</p>}
                            <input className="form-control my-2" type="password" {...register("confirmPassword", { required: true })} placeholder="Confirm password" />
                            {errors.confirmPassword && <p>This field is required</p>}

                            <input className="form-control btn btn-success my-4" type="submit" value="Log in" />
                            <p className="text-center">Already a Member? <Link to="/login">Sign in</Link> </p>
                            <p className="row d-flex align-items-center"> <hr className="col-4" />OR<hr className="col-4" /> </p>


                            <Button variant="outline-secondary" className="d-flex align-items-center my-2 secondary-login border">
                                <img className="secondary-login-icon" src={google} alt="" />
                                <p className="text-center w-100 m-0">Continue with Google</p>
                            </Button>

                            <Button variant="outline-primary" className="d-flex align-items-center my-2 secondary-login border">
                                <img className="secondary-login-icon" src={facebook} alt="" />
                                <p className="text-center w-100 m-0">Continue with Facebook</p>
                            </Button>

                        </form>
                    </div>
                    <div className="col-md-6 my-5">
                        <h2 className="text-center mb-5 pb-5">Welcome</h2>
                        <img className="w-100" src={carBg} alt="" />
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Signup;