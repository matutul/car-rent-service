import React from 'react';
import NavbarMain from '../NavbarMain/NavbarMain';
import NavbarUpper from '../NavbarUpper/NavbarUpper';

const Navbar = () => {
    return (
        <div>
            <NavbarUpper></NavbarUpper>
            <NavbarMain></NavbarMain>
        </div>
    );
};

export default Navbar;