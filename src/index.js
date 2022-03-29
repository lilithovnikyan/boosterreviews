import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './ScrollTop';


window.APICallUrl = "https://mobileamplifierreview.be";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>

                <Route path="*" element={
                    <>
                    <ScrollToTop />
                    <App />
                    </>
                } />

            </Routes>


        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

