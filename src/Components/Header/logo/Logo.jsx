import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Logo(){

const [logo, setLogo] = useState([])

    useEffect(() => {
        axios.get("https://mobileboosterreview.com/wp-json/wp/v2/media/188").then(logoImg => {
            setLogo(logoImg.data)
        })
        }, []);
        console.log(logo)

    return(
        <div>
            <img src={logo.source_url} alt="" />
        </div>
    );
}
 