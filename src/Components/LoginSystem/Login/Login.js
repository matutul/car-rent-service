import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar/Navbar';
import './Login.css';
import carBg from '../../../image/carLoginPage.svg';
import { useForm } from "react-hook-form";
import { Button, Spinner } from 'react-bootstrap';
import facebook from '../../../icons/facebookRound.svg';
import google from '../../../icons/google.svg';
import { Link, useLocation, useHistory } from "react-router-dom";
import { initializeFirebaseAppFramework, setIdToken, signInWithEmailAndPassword } from '../Firebase/FirebaseFunction';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import { useState } from 'react';
import ModalSection from '../../Modal/ModalSection';

initializeFirebaseAppFramework();

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset, setFocus } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const location = useLocation();
    const history = useHistory()
    const { from } = location.state || { from: { pathname: "/" } };
    const [loginLoading, setLoginLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState({
        type: '',
        title: '',
        body: ''
    });

    const onSubmit = data => {
        setLoginLoading(true);
        signInWithEmailAndPassword(data)
            .then(signinResponse => {
                setLoginLoading(false);

                if (signinResponse.displayName) {
                    console.log("Message log in page line 45: " + signinResponse.displayName);
                    setIdToken();
                    setLoggedInUser(signinResponse);
                    history.replace(from);
                }

                if (signinResponse.message) {
                    console.log("error message in log in page line 40: " + signinResponse.message);

                    const newModalData = { ...modalData };
                    newModalData.type = 'inform';
                    newModalData.title = "Error Message";
                    newModalData.body = signinResponse.message;
                    setModalData(newModalData);
                    setShow(true);

                    // alert(signinResponse.message);
                    reset();
                    setFocus('email');
                }


            })
    };
    const handleForgetPassword = () => {

    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
                <div className="row Login d-flex align-items-end">
                    <div className="col-md-6 my-5 border">
                        <form className="d-flex flex-column p-5" onSubmit={handleSubmit(onSubmit)}>

                            <h3 className="text-center mb-5">Log in Form</h3>

                            <input label="Email" className="form-control my-2" {...register("email", {
                                required: "You must specify an email",
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "This is not a valid email address."
                                }
                            })} placeholder="Your email" />
                            {errors.email && <p className="text-warning">{errors.email.message}</p>}


                            <input className="form-control my-2" type="password" {...register("password", { required: true })} placeholder="Password" />
                            {errors.password && <p className="text-warning">This field is required</p>}
                            <p className="inline-text-link" onClick={handleForgetPassword}>Forget Passwrod?</p>

                            {/* <input className="form-control btn btn-success my-4" type="submit" value="Log in" /> */}
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
                                        </> : <span>Login</span>
                                }
                            </Button>
                            <p className="text-center">Not a Member? <Link to="/signup">Sign up</Link> </p>

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
            <ModalSection information={modalData} showState={[show, setShow]} ></ModalSection>
        </div>
    );
};

export default Login;