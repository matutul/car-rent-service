import React from 'react';
import address from '../../../icons/address.svg';
import airport from '../../../icons/airport.svg';
import longDistance from '../../../icons/longDistance.svg';
import taxi from '../../../icons/taxi.svg';

const Services = () => {
    return (
        <div className="container">
            <div className="text-center w-75 m-auto p-4">
                <h5 className="default-color">WHAT WE OFFER</h5>
                <h3>WELCOME TO US</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum repellendus quaerat quo nemo vitae, sequi neque tempora. Ea nam officiis excepturi in odio neque libero?</p>
            </div>
            <div className="row">
                <div className="col-lg-3 col-sm-6 text-center p-2">
                    <div className="p-2">
                        <img className="m-4" src={address} style={{ height: '90px' }} alt="" />
                        <h3>Address Pickup</h3>
                        <p>We always pick up our clients on time, 24/7 availability.</p>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 text-center p-2">
                    <div className="p-2">
                        <img className="m-4" src={airport} style={{ height: '90px' }} alt="" />
                        <h3>Airport Transfer</h3>
                        <p>GetCab specialized in 24 hours airport transfer service.</p>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 text-center p-2">
                    <div className="p-2">
                        <img className="m-4" src={longDistance} style={{ height: '90px' }} alt="" />
                        <h3>Long Distance</h3>
                        <p>We offer you a long distance taxi service to anywhere.</p>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 text-center p-2">
                    <div className="p-2">
                        <img className="m-4" src={taxi} style={{ height: '90px' }} alt="" />
                        <h3>Taxi Tours</h3>
                        <p>We offer a taxi tours of various durations and complexity.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;