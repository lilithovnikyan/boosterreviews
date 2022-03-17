import "./App.scss";
import React, { useCallback, useState } from 'react';
import Header from './Components/Header/Header';
import Footer from "./Components/Footer/Footer";
import { Route, Routes, useParams } from "react-router-dom";
import PrivacyUserInfo from "./Components/PrivacyUserInfo/PrivacyUserInfo";
import Main from "./Components/Main/Main";

function App() {
    const params = useParams();
    const slug = params["*"];
    const [state, setState] = useState([]);
    const [parameters, setParameters] = useState([])
    const [logoClickData, setlogoClickData] = useState([])

    const wrapperSetParentState = useCallback(val => {
        setParameters(val);
    }, [setParameters]);

    const logoSetParentState = useCallback(val => {
        setlogoClickData(val);
    }, [setlogoClickData]);

    return (
        <div className="App" >
            <Routes >
                {/* <Route path="*" element={
                    <>
                        <Header
                            parameters={parameters}
                            parentStateSetter={wrapperSetParentState}
                            logoClickData={logoClickData}
                            logoSetParentState={logoSetParentState}
                        />
                        <Main parameters={parameters} />
                    </>
                } />

                <Route path={`${state.slug}`} element={
                    <>
                        <Header
                            parameters={parameters}
                            parentStateSetter={wrapperSetParentState}
                            logoClickData={logoClickData}
                            logoSetParentState={logoSetParentState}
                        />
                        <PrivacyUserInfo state={state} setState={setState} />
                    </>
                } /> */}

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
                                <PrivacyUserInfo state={state} setState={setState} /> :
                                <Main parameters={parameters} />
                        }
                        <Footer state={state} setState={setState} />
                    </>
                }>

                </Route>
            </Routes>
        </div>
    );
}

export default App;