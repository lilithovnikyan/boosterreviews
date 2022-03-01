import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./Banner.scss";

function Banner() {
    const [bannerTitle, setBannerTitle] = useState();
    const [bannerBgImage, setBannerBgImage] = useState();
    const [bannerSideImage, setBannerSideImage] = useState();

    useEffect(() => {
        axios.get(`https://mobileboosterreview.com/wp-json/wp/v2/review-category/3`)
            .then(res => {
                setBannerTitle(res.data.acf.br_cat_title)
                setBannerBgImage(res.data.acf.br_cover_background_image)
                setBannerSideImage(res.data.acf.br_cover_side_image);
            })
    }, [])
    return <div className="banner" style={{backgroundImage: `url(${bannerBgImage})`}}>
        <div className="banner-content">
            <h1 className="banner-title">{bannerTitle}</h1>
            <img className="banner-badge" src={bannerSideImage} />
        </div>
    </div>;
}

export default Banner