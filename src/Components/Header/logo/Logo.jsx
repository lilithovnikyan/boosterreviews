import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Logo.scss"

export default function Logo(props) {

    const [logo, setLogo] = useState([]);
    const [change, setChange] = useState([]);

    useEffect(() => {
        axios.get("https://mobileboosterreview.com/wp-json/wp/v2/media/188").then(logoImg => {
            setLogo(logoImg.data)
        })
    }, []);

    useEffect(() => {
        props.parentStateSetter(props.logoClickData)
    }, [props.parentStateSetter, change]);

    const onChangeHandler = (item) => {
        props.parentStateSetter(item)
        setChange(item);
    };

    return (
        <div>
            <Link to="/" onClick={()=>{onChangeHandler(props.logoClickData)}}>
                <img src={logo.source_url} alt=""  className="logo"/>
            </Link>
        </div>
    );
}
