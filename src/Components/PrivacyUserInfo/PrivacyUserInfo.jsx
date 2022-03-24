import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import "./PrivacyUserInfo.scss";

export default function PrivacyUserInfo(props) {
    const [footerPages, setFooterPages] = useState([]);
    // const regexpPattern = /<!--[a-zA-Z0-9\._:\/-\s]+Yoast[a-zA-Z0-9\._:\/-\s]+-->([a-zA-Z0-9\.\_\"\'\;\,\?\!\@\#\=\{\[\}\]\<\+\>\:\/\-\s]+)<!--\s\/[a-zA-Z0-9\.\_\:\/\-\s]+Yoast[a-zA-Z0-9\.\_\:\/\-\s]+-->/mig;
    const regexpPattern = /<!--[a-zA-Z0-9._:\-\s]+Yoast[a-zA-Z0-9._:/\-\s]+-->[\s\S]*<!--\s+\/[a-zA-Z0-9._:/-\s]+Yoast[a-zA-Z0-9._:/-\s]+\s+-->/gmi;

    const componentMounted = useRef(true); // (3) component is mounted
    const componentMounted2 = useRef({}); // (3) component is mounted
    const [first, setfirst] = useState(componentMounted.current);
    const [oldCatData, setOldCatData] = useState(componentMounted2.current);

    useEffect(() => {
        if (first) { // (5) is component still mounted?
            axios.get(`${window.APICallUrl}/wp-json/wp/v2/pages/${props.state.object_id}`).then(res => {
                setFooterPages(res.data);
            })
        }
        
        setfirst(true);
        setOldCatData(footerPages);
        return () => { // This code runs when component is unmounted
            setOldCatData(footerPages);
            componentMounted.current = false; // (4) set it to false when we leave the page   [a-zA-Z0-9\._-]+@[a-zA-Z0-9\._-]+\.\w{2,}
            componentMounted2.current = footerPages;
        }
    }, [props.state]);

    useEffect(() => {
        if (typeof footerPages !== "undefined" && typeof footerPages.yoast_head !== "undefined") {
            if (oldCatData) {
                document.head.innerHTML = document.head.innerHTML.replaceAll(regexpPattern, '');
            }
            document.head.innerHTML += footerPages.yoast_head;
        }
        return () => {
            document.head.innerHTML = document.head.innerHTML.replaceAll( regexpPattern, '' );
        }
    }, [footerPages, oldCatData]);

    return (
        <div className="privacy-block">
            <h1>{footerPages && <div dangerouslySetInnerHTML={{ __html: footerPages?.title?.rendered }} />}</h1>
            {footerPages && <div dangerouslySetInnerHTML={{ __html: footerPages?.content?.rendered }} />}
        </div>
    )
}

