import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar/Navbar';
import '../Login/Login.css';
import carBg from '../../../image/carLoginPage.svg';
import { useForm } from "react-hook-form";
import { Button, Spinner } from 'react-bootstrap';
import facebook from '../../../icons/facebookRound.svg';
import google from '../../../icons/google.svg';
import { Link, useHistory, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword } from '../Firebase/FirebaseFunction';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import { useState } from 'react';
import ModalSection from '../../Modal/ModalSection';




const Signup = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [modalData, setModalData] = useState({
        type: '',
        title: '',
        body: ''
    });
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const onSubmit = data => {
        setLoginLoading(true);
        console.log(data);

        createUserWithEmailAndPassword(data)
            .then(result => {
                console.log(result);
                if (!result.message) {
                    console.log('In the result displayName field: ' + result.displayName);

                    const newModalData = { ...modalData };
                    newModalData.type = 'inform';
                    newModalData.title = 'Success Message';
                    newModalData.body = 'Sign up is successfully done..! You can log in now..';
                    setModalData(newModalData);
                    setShow(true);

                    setLoggedInUser(result);
                    console.log(loggedInUser);
                    setLoginLoading(false);
                    alert('Sign up is successfully done..! You can log in now..');
                    history.push('/login');
                    // history.replace(from);
                }
                if (result.message) {
                    setLoginLoading(false);
                    const newModalData = { ...modalData };
                    newModalData.type = 'inform';
                    newModalData.title = 'Error Message';
                    newModalData.body = result.message;
                    setModalData(newModalData);
                    setShow(true);
                    // alert(result.message);
                }
            })
    };


    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
                <div className="row Login d-flex align-items-end">
                    <div className="col-md-6 my-5 border">
                        <form className="d-flex flex-column p-5" onSubmit={handleSubmit(onSubmit)}>

                            <h3 className="text-center mb-5">Sign up Form</h3>

                            <input className="form-control my-2" {...register("fullname", { required: true })} placeholder="Your fullname" />
                            {errors.fullname && <p className="text-warning">This field is required</p>}

                            <input className="form-control my-2" {...register("email", {
                                required: "You must specify an email",
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "This is not a valid email address."
                                }
                            })} placeholder="Your email" />
                            {errors.email && <p className="text-warning">{errors.email.message}</p>}

                            <input name="password" className="form-control my-2" type="password" {...register("password", {
                                required: "You must specify a password", minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters"
                                },
                                pattern: {
                                    value: /\d+/g,
                                    message: "At least one digit must."
                                }
                            })} placeholder="Password" />
                            {errors.password && <p className="text-warning">{errors.password.message}</p>}

                            <input className="form-control my-2" type="password" {...register("confirmPassword", {
                                required: "This field is required", validate: value =>
                                    value === watch('password') || "The passwords do not match"
                            })} placeholder="Confirm password" />
                            {errors.confirmPassword && <p className="text-warning">{errors.confirmPassword.message}</p>}

                            {/* <input className="form-control btn btn-success my-4" type="submit" value="Sign up" /> */}

                            <Button type="submit" className="my-4">
                                {
                                    loginLoading ?
                                        <><Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            />
                                            <span> Loading...</span>
                                        </>
                                        : 
                                        <span>Login</span>
                                }
                            </Button>

                            <p className="text-center">Already a Member? <Link to="/login">Sign in</Link> </p>
                            <p className="row d-flex align-items-center"> <hr className="col-4" />OR<hr className="col-4" /> </p>


                            <Button variant="outline-secondary" className="d-flex align-items-center my-2 secondary-login border" disabled>
                                <img className="secondary-login-icon" src={google} alt="" />
                                <p className="text-center w-100 m-0">Continue with Google</p>
                            </Button>

                            <Button variant="outline-primary" className="d-flex align-items-center my-2 secondary-login border" disabled>
                                <img className="secondary-login-icon" src={facebook} alt="" />
                                <p className="text-center w-100 m-0">Continue with Facebook</p>
                            </Button>

                        </form>
                    </div>
                    <div className="col-md-6 my-5">
                        <h2 className="text-center mb-5 pb-5">Welcome</h2>
                        <img className="w-100" style={{transform: 'translate(20%)'}} src={carBg} alt="" />
                    </div>
                </div>
            </div>
            <Footer></Footer>
            <ModalSection information={modalData} showState={[show, setShow]}></ModalSection>
        </div>
    );
};

export default Signup;