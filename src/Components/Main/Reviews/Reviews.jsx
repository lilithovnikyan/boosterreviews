import React, { useEffect, useRef, useState } from 'react';
import '../Reviews/Reviews.css';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';

export default function Reviews(props) {

    const [reviewObj, setReviewObj] = useState([]);
    let { object_id } = props.parameters;
    const componentMounted = useRef(false); // (3) component is mounted
    const [first, setfirst] = useState(componentMounted.current);


    useEffect(() => {
        if (first) { // (5) is component still mounted?
            if (object_id !== undefined) {
                axios.get(`https://mobileboosterreview.com/wp-json/wp/v2/review?review-category=${object_id}`).then(res => {
                    setReviewObj(res.data.reverse())
                })
            }
        }

        setfirst(true);
        return () => { // This code runs when component is unmounted
            setfirst(false);
            componentMounted.current = true; // (4) set it to false when we leave the page
        }
    }, [props.parameters, object_id])

    return (
        <div className='container clearfix pr-lg-0 pl-lg-0 mobile-90 mobile-100-container'>
            <div className="topline nobottommargin clearfix">
                <div id="posts">
                    <div className="container-fluid br-content-container">
                        {reviewObj.map((itemData, i) => {
                            let item = itemData.acf;
                            let { thumbnail } = itemData;
                            let { br_url, br_price, br_sale_price, br_rating } = item;
                            let { br_features_list_col1, br_features_list_col2 } = item;
                            let { br_rating_level_text, br_ratings_count } = item;
                            let { br_bast_rated } = item;
                            let price = '';
                            let bestRated = '';
                            if (br_sale_price !== '') {
                                price = <strong>
                                    <span className="new-price">{'$' + br_sale_price}</span>
                                    <span className="strike">{'$' + br_price}</span>
                                </strong>
                            } else {
                                price = <strong>
                                    <span className="new-price">{'$' + br_price}</span>
                                </strong>
                            }

                            if (br_bast_rated) {
                                bestRated = <div className="best-rated">
                                    Best rated 2021
                                </div>;
                            } else {
                                bestRated = '';
                            }

                            let starStyle = { width: 'calc(' + (parseFloat(br_rating) * 10) + '% - 4px)' }

                            return <article key={i} id="post-201" className="product post-201 review type-review status-publish has-post-thumbnail hentry review-category-4g-signal-boosters entry">
                                <div className="row no-gutters product-row">
                                    <div className="order-1 order-md-1 col-7 col-md-3 col-lg-3 col-xl-3 product-logo py-3">
                                        {bestRated}
                                        <div className="product-number">{i + 1}</div>
                                        <a target="_blank" href={br_url}>
                                            <img src={thumbnail} loading="lazy" />
                                        </a>
                                    </div>
                                    <div className="order-3 order-md-2 col-12 col-md-6 col-lg-6 col-xl-6 product-features-col no-gutters">

                                        <div className="row no-gutters">
                                            <div className="col-12 visible-desktop">
                                                <div className="row no-gutters text-center rating-price-row price-version">
                                                    <div className="col-6 col-rating">
                                                        <span className="user-rating-text">Our Rating</span>
                                                        <div className="stars-container clearfix">
                                                            <div>
                                                                <span className="fa fa-star"></span>
                                                                <span className="fa fa-star"></span>
                                                                <span className="fa fa-star"></span>
                                                                <span className="fa fa-star"></span>
                                                                <span className="fa fa-star"></span>
                                                            </div>
                                                            <div className="color-stars" style={starStyle} >
                                                                <span className="fa fa-star"></span>
                                                                <span className="fa fa-star"></span>
                                                                <span className="fa fa-star"></span>
                                                                <span className="fa fa-star"></span>
                                                                <span className="fa fa-star"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-6 col-price">
                                                        <span className="price-text">Price</span>
                                                        <p className="price">
                                                            {price}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 product-feature-list first-feature-list">
                                                <div className="metadata">
                                                    <ul className="inner-table-features">
                                                        {br_features_list_col1.map((listItem, j) => {
                                                            return <li key={j} className={`inner-table-feat ${listItem.br_feature_available ? 'green_img' : 'red_img'}`}>
                                                                <span> {listItem.br_feature_name}</span>
                                                            </li>
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 product-feature-list">
                                                <div className="metadata">
                                                    <ul className="inner-table-features">
                                                        {br_features_list_col2.map((listItem, j) => {
                                                            return <li key={j} className={`inner-table-feat ${listItem.br_feature_available ? 'green_img' : 'red_img'}`}>
                                                                <span> {listItem.br_feature_name}</span>
                                                            </li>
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>

                                            <a className="read-review" href={br_url}>Read Review</a>
                                            <div className="job-meta table-cta-container visible-mobile">
                                                <a target="_blank" href={br_url} rel="nofollow" className="btn btn-primary btn-green button-score tracking-link visit-link-table">Visit site</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="order-2 order-md-3 col-5 col-md-3 col-lg-3 col-xl-3 product-rating">
                                        <span className="score-text">Score</span>

                                        <div className="job-meta metascore visible-desktop">
                                            <p className="score-p">{br_rating}</p>
                                            <p className="remark">{br_rating_level_text}</p>
                                            <div className="stars-container clearfix">
                                                <div>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                </div>
                                                <div className="color-stars" style={starStyle} >
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                </div>
                                            </div>
                                            <p className="rating-text">User Ratings ({br_ratings_count})</p>
                                            <div className="job-meta table-cta-container visible-desktop">
                                                <a href={br_url} target="_blank" rel="nofollow" className="btn btn-primary btn-green button-score tracking-link visit-link-table">Visit site</a>
                                            </div>
                                        </div>
                                        <div className="job-meta metascore price-version visible-mobile">
                                            <div className="price-container">
                                                <p className="price">
                                                    <strong>
                                                        <span className="new-price">$385</span>
                                                        <span className="strike">$530</span>
                                                    </strong>
                                                </p>
                                            </div>
                                            <p className="score-p">{br_rating}</p>
                                            <p className="remark">{br_rating_level_text}</p>

                                            <div className="stars-container clearfix">
                                                <div>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                </div>
                                                <div className="color-stars" style={starStyle} >
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                </div>
                                            </div>
                                            <p className="rating-text">User Ratings ({br_ratings_count})</p>
                                        </div>
                                    </div>
                                </div>

                            </article>
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}
