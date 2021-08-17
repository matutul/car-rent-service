import React from 'react';
import BookARide from '../BookARide/BookARide';
import Header from '../Header/Header';
import Services from '../Services/Services';
import Footer from '../../Shared/Footer/Footer';
import './Home.css';
import Contact from '../Contact/ContactSection';
import CarClass from '../CarClass/CarClass';
import Testimonials from '../Testimonials/Testimonials';
import NavbarUpper from '../../Shared/Navbar/NavbarUpper/NavbarUpper';
import NavbarMain from '../../Shared/Navbar/NavbarMain/NavbarMain';


const Home = () => {
    return (
        <div>
            <NavbarUpper></NavbarUpper>
            <div className="sticky-top">
                <NavbarMain></NavbarMain>
            </div>
            <Header></Header>
            <BookARide></BookARide>
            <Services></Services>
            <Contact></Contact>
            <CarClass></CarClass>
            <Testimonials></Testimonials>
            <Footer></Footer>
        </div>
    );
};

export default Home;