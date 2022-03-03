import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./PrivacyUserInfo.scss";

export default function PrivacyUserInfo(props) {
  const [footerPages, setFooterPages] = useState([]);

  useEffect(() => {
    axios.get(`https://mobileboosterreview.com/wp-json/wp/v2/pages/${props.state.object_id}`).then(res => {
        setFooterPages(res.data);
      })
  }, [props.state]);

  return (
    <div className="privacy-block">
      <h1>{footerPages && <div dangerouslySetInnerHTML={{__html: footerPages?.title?.rendered}}/>}</h1>
      {footerPages && <div dangerouslySetInnerHTML={{__html: footerPages?.content?.rendered}}/>}
    </div>
  )
}

