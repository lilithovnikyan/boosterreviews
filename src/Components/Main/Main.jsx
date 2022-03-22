import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import "./Main.scss";

import Reviews from './Reviews/Reviews';
import Tableofcontents from './Tableofcontents/Tableofcontents';
import ScrollUp from './Scroll-up/Scroll-up';
import Banner from "./Banner/Banner";
import { useParams } from 'react-router-dom';
// import { MetaTags } from 'react-meta-tags';


export default function Main(props) {

    const params = useParams();
    const slug = params["*"];
    const componentMounted = useRef(true); // (3) component is mounted
    let { parameters } = props;
    let { object_id } = parameters;
    const [first, setfirst] = useState(componentMounted.current)
    const [acf, setAcf] = useState([]);
    const [desc, setDesc] = useState([]);

    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });

    useEffect(() => {

        if (first) {
            if (object_id != undefined) {
                axios.get(`https://mobileboosterreview.com/wp-json/wp/v2/review-category/${object_id}`)
                    .then(res => {
                        setAcf(res.data.acf)
                        let a = res.data.acf.br_top_description.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
                        setDesc(a);
                    })

            }
        }
        setfirst(true);

        return () => { // This code runs when component is unmounted
            setfirst(false)
            componentMounted.current = false; // (4) set it to false when we leave the page
        }

    }, [parameters, object_id])

    useEffect(() => {
        let content = document?.querySelector('.br-template-read-more-content');
        let readMore = document?.querySelector('.br-template-read-more-button');
        let readLess = document?.querySelector('.br-template-read-less-button');

        if (readMore && readMore) {
            readMore.addEventListener("click", function () {
                if (content.classList.contains("br-d-none")) {
                    content.classList.remove("br-d-none");
                    this.classList.add('br-template-read-more-button-opened')
                }
            })
        }

        if (readLess) {
            readLess.addEventListener("click", function () {
                if (!content.classList.contains("br-d-none")) {
                    content.classList.add("br-d-none");
                    readMore.classList.remove('br-template-read-more-button-opened')
                }
            })
        }
    }, [desc])

    return (

        <>
            {/* <MetaTags>
                <meta name="description" content={desc} />
            </MetaTags> */}
            <div>
                <Banner parameters={props.parameters} />
            </div>
            <div className="main">
                <div className="main-content" dangerouslySetInnerHTML={{ __html: desc }}></div>
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
