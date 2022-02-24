import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./Nav.scss";
import {Link} from "react-router-dom";

const Nav = () => {

    const [menuLink, setMenuLink] = useState([]);

    useEffect(() => {
        axios.get(`https://mobileboosterreview.com/wp-json/wp/v2/menu-locations/primary`).then(menu => {
            setMenuLink(menu.data)
        })
    }, [])

    return (
        <div className="right-menu">
            {menuLink.map((item, i) => {

                return (
                    <li key={i}>
                        <Link className="right-menu-link" to={item.slug}>{item.title}</Link>
                    </li>
                )
            })}
        </div>
    );
};

export default Nav;