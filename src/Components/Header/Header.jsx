import React from 'react';
import Logo from './logo/Logo';
import Nav from "./nav/Nav";
import "./Header.scss";
import Banner from './Banner/Banner';

export default function Header(props) {

    return (
        <header>
            <div className="top-header">
                <Logo
                    parentStateSetter={props.parentStateSetter}
                    logoSetParentState={props.logoSetParentState}
                    logoClickData={props.logoClickData}
                />
                <Nav
                    parameters={props.parameters}
                    parentStateSetter={props.parentStateSetter}
                    logoSetParentState={props.logoSetParentState}
                />
            </div>
<<<<<<< HEAD
=======
            <Banner parameters={props.parameters} />
>>>>>>> c7ea9c90898960fe2675916d9b3dafa32a6f6ac4
        </header>
    )
}
