import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Main.scss";

import Reviews from './Reviews/Reviews';
import Tableofcontents from './Tableofcontents/Tableofcontents';
import ScrollUp from './Scroll-up/Scroll-up';
import Banner from "./Banner/Banner"


export default function Main(props) {

    let { parameters } = props;
    let { object_id } = parameters;

    const [acf, setAcf] = useState([]);

    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });

    useEffect(() => {
        if (object_id != undefined) {
            axios.get(`https://mobileboosterreview.com/wp-json/wp/v2/review-category/${object_id}`)
                .then(res => {
                    setAcf(res.data.acf)
                })

        }
    }, [parameters, object_id])

    return (

        <>
            <div>
                <Banner parameters={props.parameters} />
            </div>
            <div className="main">
                <div className="main-content" dangerouslySetInnerHTML={{ __html: bannerDesc }}></div>
                <p className="updated custom-updated">
                    <span>✓ </span>
                    Updated {month} 1
                </p>
                <Reviews parameters={parameters} />
                   <ScrollUp />
            <Tableofcontents parameters={acf} />
            </div>
        </>
    );
};
