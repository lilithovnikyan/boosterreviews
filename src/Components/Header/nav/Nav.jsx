import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import "./Nav.scss";
import { Link, Outlet, useOutlet, useParams } from "react-router-dom";

const Nav = (props) => {
    const [burger, setBurger] = useState(false);

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
        for( var i = 0; i< menuLink.length; i++){
            if (slug == menuLink[i].slug) {
                props.parentStateSetter(menuLink[i]);
                break;
            }else{
                props.parentStateSetter(menuLink[0]);
            }
        }
        
        props.logoSetParentState(menuLink[0])
    }, [props.parentStateSetter, menuLink, change]);

    const onSliderChangeHandler = (item) => {
        props.parentStateSetter(item)
        setChange(item);
    };

    return (
        <div className="right-menu">
        <div className="menu-bar" onClick={() => setBurger(!burger)} value={burger}>
        {/*<h4>{burger ? "Close" : "Menu"}</h4>*/}
        <div className={`header-burger ${burger ? "active" : ""}`}>

            <span></span>
        </div>


    </div>
        <ul className={burger ? "open" : ""}>
            {menuLink.map((item, i) => {

                let active = '';
                if (slug == item.slug) {
                    active = 'active';
                }

                return (
                    <li key={i}>
                        <Link className={`right-menu-link ${active}`} onClick={()=>{ onSliderChangeHandler(item) }} to={'/'+item.slug}>{item.title}</Link>
                    </li>
                )
            })}
            </ul>
        </div>
    );
};

export default Nav;