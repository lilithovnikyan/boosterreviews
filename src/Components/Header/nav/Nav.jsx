import React, {useEffect, useState} from 'react';
import axios from "axios"
import {logDOM} from "@testing-library/react";

const Nav = () => {

    const [menuLink, setMenuLink] = useState([]);

    useEffect(() => {
        axios.get(`https://mobileboosterreview.com/wp-json/wp/v2/menu-locations/primary`).then(menu => {
            // console.log(menu.data)
            setMenuLink(menu.data)
        })
    }, [])

    // console.log(menuLink, "menulink")
    return (
        <div>
            {menuLink.map((item, i) => {
                console.log(item, "item")
                console.log(item.url, "item url")
                return (
                    <div key={i}>
                        <a href={item.url}>{item.title}</a>
                    </div>
                )


            })}
        </div>
    );
};

export default Nav;