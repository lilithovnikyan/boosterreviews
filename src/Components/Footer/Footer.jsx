
import React, {useState, useEffect} from "react"
import axios from "axios"

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

    return <footer className="site-footer" role="contentinfo">
        <div className="site-info">
            <div dangerouslySetInnerHTML={{__html: copyright.text}}/>
            <div>
                <nav aria-label="Secondary menu" className="footer-navigation">
                    <ul className="footer-navigation-wrapper">
                        {footerMenu.map((item, index) => {
                            return  <li className="menu-item">
                                    <a href="{item.url}">
                                        <span>{item.title}</span>
                                    </a>
                                </li>
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    </footer>;
}

export default Footer
