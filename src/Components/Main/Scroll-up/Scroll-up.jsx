import React, { } from 'react';
import { useLocation } from 'react-router-dom'
import "./Scroll-up.scss";

function ScrollUp() {

    const {pathname} = useLocation();

    const clickToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="show-products-container">
                            <div className="show_products_up show-products open">
                                <img onClick={clickToTop}
                                     src="https://www.freeiconspng.com/thumbs/up-arrow-png/up-arrow-png-8.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScrollUp;


