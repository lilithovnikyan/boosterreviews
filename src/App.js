import React, {useState, useEffect} from "react"
import "./App.scss";
import React, { useCallback, useEffect, useState } from 'react';
import Header from './Components/Header/Header';
import Footer from "./Components/Footer/Footer";
<<<<<<< HEAD
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import PrivacyUserInfo from "./Components/PrivacyUserInfo/PrivacyUserInfo";

function App() {

  const [state, setState] = useState([]);
  
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`${state.slug}`} element={<PrivacyUserInfo state={state} setState={setState}/>} />
        </Routes>
        <Footer setState={setState}/>
=======
import { Route, Routes, useParams } from "react-router-dom";

function App() {

  const [parameters, setParameters] = useState([])
  const [logoClickData, setlogoClickData] = useState([])

  const wrapperSetParentState = useCallback(val => {
    setParameters(val);
  }, [setParameters]);

  const logoSetParentState = useCallback(val => {
    setlogoClickData(val);
  }, [setlogoClickData]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Header
                parameters={parameters}
                parentStateSetter={wrapperSetParentState}
                logoClickData={logoClickData}
                logoSetParentState={logoSetParentState}
              />
              <Main parameters={parameters} />
            </>
          }
        />
      </Routes>
      <Footer />
>>>>>>> c7ea9c90898960fe2675916d9b3dafa32a6f6ac4
    </div>
  );
}

export default App;
