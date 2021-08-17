import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar/Navbar';
import './Contact.css';

const Contact = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="container contact">
                <h1>this is contact section</h1>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Contact;