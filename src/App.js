import React, {useState, useEffect} from "react"
import "./App.scss";
import Header from './Components/Header/Header';
import Footer from "./Components/Footer/Footer";
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
    </div>
  );
}

export default App;
