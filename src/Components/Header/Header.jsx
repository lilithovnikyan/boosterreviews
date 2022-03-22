import React from 'react';
import Logo from './logo/Logo';
import Nav from "./nav/Nav";
import "./Header.scss";

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
        </header>
    )
}

