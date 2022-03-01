import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Outlet, useOutletContext } from 'react-router-dom';
import Banner from '../Header/Banner/Banner';
import "./Main.scss";
import Reviews from './Reviews/Reviews';

export default function Main(props) {

    let { parameters } = props;
    let { object_id } = parameters;

    const [bannerDesc, setBannerDesc] = useState([]);
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });

    useEffect(() => {
        if (object_id != undefined) {
            axios.get(`https://mobileboosterreview.com/wp-json/wp/v2/review-category/${object_id}`)
                .then(res => {
                    setBannerDesc(res.data.acf.br_top_description)
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
            </div>
        </>
    );
};
