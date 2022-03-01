import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Logo(props) {

    const [logo, setLogo] = useState([]);
    const [change, setChange] = useState([]);

    useEffect(() => {
        axios.get("https://mobileboosterreview.com/wp-json/wp/v2/media/188").then(logoImg => {
            setLogo(logoImg.data)
        })
<<<<<<< HEAD
        }, []);

    return(
        <Link to="/">
            <img src={logo.source_url} alt="" />
        </Link>
=======
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
                <img src={logo.source_url} alt="" />
            </Link>
        </div>
>>>>>>> c7ea9c90898960fe2675916d9b3dafa32a6f6ac4
    );
}
