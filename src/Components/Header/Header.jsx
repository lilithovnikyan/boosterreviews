import React from 'react';
import Logo from './logo/Logo';
import Nav from "./nav/Nav";
import "./Header.scss";

export default function Header() {
    return (
        <header>
            <div className="top-header">
                <Logo/>
                <Nav/>
            </div>
        </header>
    )
}
