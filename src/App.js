import "./App.scss";
import React, {useCallback, useEffect, useState} from 'react';
import Header from './Components/Header/Header';
import Footer from "./Components/Footer/Footer";
import {Route, Routes, useParams} from "react-router-dom";
import PrivacyUserInfo from "./Components/PrivacyUserInfo/PrivacyUserInfo";
import Main from "./Components/Main/Main";
import Loading from "./Components/Main/Loading/Loading";
import axios from "axios";

function App() {
    const params = useParams();
    const slug = params["*"];
    const [state, setState] = useState([]);
    const [parameters, setParameters] = useState([]);
    const [logoClickData, setlogoClickData] = useState([]);

    const wrapperSetParentState = useCallback(val => {
        setParameters(val);
    }, [setParameters]);

    const logoSetParentState = useCallback(val => {
        setlogoClickData(val);
    }, [setlogoClickData]);

    useEffect(() => {
        axios.get(window.APICallUrl + "/wp-json/wp/v2/favicon").then(data => {
            if (typeof data.data.size32 !== "undefined") {
                let icon32 = '<link rel="icon" href="' + data.data.size32[0] + '" sizes="32x32">';
                if (document.head.innerHTML.indexOf(icon32) >= 0) {
                    document.head.innerHTML = document.head.innerHTML.replaceAll(icon32, '');
                }
                document.head.innerHTML += icon32;
            }

            if (typeof data.data.size192 !== "undefined") {
                let icon192 = '<link rel="icon" href="' + data.data.size192[0] + '" sizes="192x192">';
                if (document.head.innerHTML.indexOf(icon192) >= 0) {
                    document.head.innerHTML = document.head.innerHTML.replaceAll(icon192, '');
                }
                document.head.innerHTML += icon192;
            }

            if (typeof data.data.size180 !== "undefined") {
                let icon180 = '<link rel="apple-touch-icon" href="' + data.data.size180[0] + '">';
                if (document.head.innerHTML.indexOf(icon180) >= 0) {
                    document.head.innerHTML = document.head.innerHTML.replaceAll(icon180, '');
                }
                document.head.innerHTML += icon180;
            }

            if (typeof data.data.size270 !== "undefined") {
                let icon270 = '<meta name="msapplication-TileImage" content="' + data.data.size270[0] + '">';
                if (document.head.innerHTML.indexOf(icon270) >= 0) {
                    document.head.innerHTML = document.head.innerHTML.replaceAll(icon270, '');
                }
                document.head.innerHTML += icon270;
            }
        })

        window.onpopstate = function () {
            window.location.reload();
        }
    }, []);

    return (
        <div className="App">
            <Routes>

                <Route path="*" element={
                    <>
                        <Header
                            parameters={parameters}
                            parentStateSetter={wrapperSetParentState}
                            logoClickData={logoClickData}
                            logoSetParentState={logoSetParentState}
                        />
                        {
                            slug === state.slug ?
                                <PrivacyUserInfo state={state} setState={setState}/>
                                : <Main parameters={parameters}/>
                        }
                        <Footer state={state} setState={setState}/>
                    </>
                }>

                </Route>
            </Routes>
        </div>
    )
        ;
}

export default App;