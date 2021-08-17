import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar/Navbar';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="container aboutUs">
                <h1>This is about us section</h1>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AboutUs;