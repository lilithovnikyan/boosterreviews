import "./App.scss";
import React, { useCallback, useState } from 'react';
import Header from './Components/Header/Header';
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import PrivacyUserInfo from "./Components/PrivacyUserInfo/PrivacyUserInfo";

function App() {
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
        <Route
          path={`${state.slug}`}
          element={
            <>
              <Header
                parameters={parameters}
                parentStateSetter={wrapperSetParentState}
                logoClickData={logoClickData}
                logoSetParentState={logoSetParentState}
              />
              <PrivacyUserInfo state={state} setState={setState}/>
            </>
          }
        />
      </Routes>
      <Footer setState={setState}/>
    </div>
  );
}

export default App;
