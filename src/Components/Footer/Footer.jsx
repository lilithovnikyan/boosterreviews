
import React, {useState, useEffect} from "react"
import axios from "axios"
import "./Footer.scss";

function Footer(props) {
    const [footerMenu, setfirst] = useState([])
    const [copyright, setCopyright] = useState([])

    useEffect(() => {
        axios.get("https://mobileboosterreview.com/wp-json/wp/v2/menu-locations/footer").then(res => {
            setfirst(res.data)
        });

        axios.get("https://mobileboosterreview.com/wp-json/wp/v2/copyright").then(res => {
            setCopyright(res.data)
        })
    }, [])

    return <footer className="footer">
            <div className="footer-content">
                <ul>
                    {footerMenu.map((item, index) => {
                        return  <li className="menu-item">
                                <a href="{item.url}">
                                    {item.title}
                                </a>
                            </li>
                    })}
                </ul>
                <div dangerouslySetInnerHTML={{__html: copyright.text}}/>
            </div>
    </footer>;
}

export default Footer
