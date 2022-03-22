import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import "./Banner.scss";
import { MetaTags } from 'react-meta-tags';

function Banner(props) {

    const { parameters } = props;
    const { object_id } = parameters;
    // const regexpPattern = /<!--[a-zA-Z0-9._:\-\s]+Yoast[a-zA-Z0-9._:/\-\s]+-->[a-zA-Z0-9._\-"';,?!@#=\{\}\[\]<+>%:\/\s]+<!--\s+\/[a-zA-Z0-9._:/-\s]+Yoast[a-zA-Z0-9._:/-\s]+\s+-->/gmi;
    const regexpPattern = /<!--[a-zA-Z0-9._:\-\s]+Yoast[a-zA-Z0-9._:/\-\s]+-->[\s\S]*<!--\s+\/[a-zA-Z0-9._:/-\s]+Yoast[a-zA-Z0-9._:/-\s]+\s+-->/gmi;

    const [catData, setCatData] = useState();
    const [bannerTitle, setBannerTitle] = useState();
    const [bannerBgImage, setBannerBgImage] = useState();
    const [bannerSideImage, setBannerSideImage] = useState();
    const componentMounted = useRef(true); // (3) component is mounted
    const componentMounted2 = useRef({}); // (3) component is mounted
    
    const [first, setfirst] = useState(componentMounted.current);
    const [oldCatData, setOldCatData] = useState(componentMounted.current);

    useEffect(() => {
        
        if (first) { // (5) is component still mounted?
            if (object_id != undefined) {
                axios.get(`${window.APICallUrl}/wp-json/wp/v2/review-category/${object_id}`)
                    .then(res => {
                        setCatData(res.data)
                        setBannerTitle(res.data.acf.br_cat_title)
                        setBannerBgImage(res.data.acf.br_cover_background_image)
                        setBannerSideImage(res.data.acf.br_cover_side_image);
                    })
            }
        }

        setfirst(true);
        setOldCatData(catData);
        return () => { // This code runs when component is unmounted
            setOldCatData(catData);
            componentMounted.current = false; // (4) set it to false when we leave the page   [a-zA-Z0-9\._-]+@[a-zA-Z0-9\._-]+\.\w{2,}
            componentMounted2.current = catData;
        }
    }, [parameters, object_id])

    useEffect(() => {
        if( typeof catData !== "undefined" && typeof catData.yoast_head !== "undefined" ){
            if( oldCatData ){
                document.head.innerHTML = document.head.innerHTML.replaceAll( regexpPattern, '' );
            }
            document.head.innerHTML += catData.yoast_head;
        }
        return () => {
            document.head.innerHTML = document.head.innerHTML.replaceAll( regexpPattern, '' );
        }
    }, [catData, oldCatData]);

    return (
        <>
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