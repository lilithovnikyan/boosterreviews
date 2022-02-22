import React from 'react';
import Banner from "./Banner/Banner";
import Logo from './logo/Logo';
import Nav from "./nav/Nav";

export default function Header() {
    return (
        <div>
            <Logo/>
            <Nav/>
            <Banner/>
        </div>
    )
}

