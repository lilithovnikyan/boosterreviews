import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import "./Nav.scss";
import { Link, Outlet, useOutlet, useParams } from "react-router-dom";

const Nav = (props) => {
    const params = useParams();
    const slug = params["*"];
    const [menuLink, setMenuLink] = useState([]);
    const [change, setChange] = useState([])

    useEffect(() => {
        axios.get(`https://mobileboosterreview.com/wp-json/wp/v2/menu-locations/primary`).then(menu => {
            setMenuLink(menu.data)
        })
    }, [props.logoSetParentState, change])

    useEffect(() => {
        menuLink.map((item, i) => {
            if (slug == item.slug) {
                props.parentStateSetter(item)
            } else if (slug === '') {
                props.parentStateSetter(menuLink[0])
            }
        })
        
        props.logoSetParentState(menuLink[0])
    }, [props.parentStateSetter, menuLink, change]);

    const onSliderChangeHandler = (item) => {
        props.parentStateSetter(item)
        setChange(item);
    };

    return (
        <div className="right-menu">
            {menuLink.map((item, i) => {

                let active = '';
                if (slug == item.slug) {
                    active = 'active';
                }

                return (
                    <li key={i}>
                        <Link className={`right-menu-link ${active}`} onClick={()=>{ onSliderChangeHandler(item) }} to={item.slug}>{item.title}</Link>
                    </li>
                )
            })}
        </div>
    );
};

export default Nav;