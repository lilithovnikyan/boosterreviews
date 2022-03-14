import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import "./Banner.scss";
import { MetaTags } from 'react-meta-tags';

function Banner(props) {

    const { parameters } = props;
    const { object_id } = parameters;

    const [bannerTitle, setBannerTitle] = useState();
    const [bannerBgImage, setBannerBgImage] = useState();
    const [bannerSideImage, setBannerSideImage] = useState();
    const componentMounted = useRef(true); // (3) component is mounted
    
    const [first, setfirst] = useState(componentMounted.current);

    useEffect(() => {
        
        if (first) { // (5) is component still mounted?
            if (object_id != undefined) {
                axios.get(`https://mobileboosterreview.com/wp-json/wp/v2/review-category/${object_id}`)
                    .then(res => {
                        setBannerTitle(res.data.acf.br_cat_title)
                        setBannerBgImage(res.data.acf.br_cover_background_image)
                        setBannerSideImage(res.data.acf.br_cover_side_image);
                    })
            }
        }

        setfirst(true);
        return () => { // This code runs when component is unmounted
            setfirst(false);
            componentMounted.current = false; // (4) set it to false when we leave the page
        }
    }, [parameters, object_id])

    return (
        <>
            <MetaTags>
                <title>{bannerTitle}</title>
                <meta property="og:title" content={bannerTitle} />
                <meta property="og:image" content={bannerBgImage} />
            </MetaTags>

            <div className="banner" style={{ backgroundImage: `url(${bannerBgImage})` }}>
                <div className="banner-content">
                    <h1 className="banner-title">{bannerTitle}</h1>
                    <img className="banner-badge" src={bannerSideImage} />
                </div>
            </div>
        </>
    );
}

export default Banner