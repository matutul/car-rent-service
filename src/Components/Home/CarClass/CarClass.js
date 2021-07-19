import React from 'react';
import './CarClass.css';
import economy from '../../../icons/economy.svg';
import standard from '../../../icons/standard.svg';
import business from '../../../icons/business.svg';

const CarClass = () => {
    return (
        <div className="container text-center">
            <h5 className="default-color">CAR CLASSES AND RATES</h5>
            <h2 className="my-3">CHOOSE YOUR CAR</h2>
            <div className="row my-5">
                <div className="col-md-4">
                    <div className="car-class border rounded p-4 text-center">
                        <img style={{height: "100px"}} className="my-2" src={economy} alt="" />
                        <h3>Economy Class</h3>
                        <p className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aliquid repellendus.</p>
                        <p className="default-color price">BDT 2.5&#2547;/km</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="car-class border rounded p-4 text-center">
                        <img style={{height: "100px"}} className="my-2" src={standard} alt="" />
                        <h3>Standard Class</h3>
                        <p className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aliquid repellendus ipsum harum.</p>
                        <p className="default-color price">BDT 3.5&#2547;/km</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="car-class border rounded p-4 text-center">
                        <img style={{height: "100px"}} className="my-2" src={business} alt="" />
                        <h3>Business Class</h3>
                        <p className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aliquid repellendus ipsum harum.</p>
                        <p className="default-color price">BDT 4.5&#2547;/km</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarClass;