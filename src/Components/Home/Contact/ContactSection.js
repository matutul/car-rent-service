import React from 'react';
import './ContactSection.css';
import car from '../../../image/car.jpg';

const Contact = () => {
    return (
        <div className="row w-100 contactSection d-flex align-items-center mx-auto">
            <div className="col-md-6 p-0">
                <img className="w-100" src={car} alt="" />
            </div>
            <div className="col-md-6 p-5">
                <h5 className="default-color">CONTACT US NOW</h5>
                <h2 className="my-4">CAR RENT SERVICE IS GREAT <br /> CAR RENT SERVICING AGENCY!</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusamus, maxime, atque totam vero repellendus ad debitis nisi nihil repudiandae asperiores, deserunt consequatur porro adipisci earum quisquam non maiores similique sunt! Vero ut explicabo optio?</p>
                <button className="btn btn-danger mt-5">CONTACT US NOW</button>
            </div>
        </div>
    );
};

export default Contact;