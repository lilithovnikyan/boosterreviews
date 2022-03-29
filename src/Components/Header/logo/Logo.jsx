import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./Logo.scss"

export default function Logo(props) {

    const [logo, setLogo] = useState([]);
    const [change, setChange] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${window.APICallUrl}/wp-json/wp/v2/media/188`).then(logoImg => {
            setLogo(logoImg.data)
            setLoading(false)
        })

    }, []);

    useEffect(() => {
        props.parentStateSetter(props.logoClickData)
    }, [props.parentStateSetter, change]);

    const onChangeHandler = (item) => {
        props.parentStateSetter(item)
        setChange(item);
    };

    return (
        <>
            {loading ?
                <div className="loadingDiv"></div>
                : <div>
                    <Link to="/" onClick={() => {
                        onChangeHandler(props.logoClickData)
                    }}>
                        <img src={logo.source_url} alt="Logo" className="logo"/>
                    </Link>
                </div>
            }
        </>
    );
}
