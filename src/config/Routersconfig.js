import React from 'react';
import {Route, Routes} from "react-router-dom";
import Catalog from "../pages/Catalog";
import Home from "../pages/Home";
import Detail from "../pages/detail/Detail";

function RoutersConfig() {
    return (
        <Routes>
            <Route
                path='/:category/search/:keyword'
                element={<Catalog/>}
            />
            <Route
                path='/:category/:id'
                element={<Detail/>}
            />
            <Route
                path="/:category"
                element={<Catalog/>}
            />
            <Route
                exact
                path="/"
                element={<Home/>}
            />
        </Routes>
    );
}

export default RoutersConfig;