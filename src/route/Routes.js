import React from "react";
import { Route, Routes } from "react-router-dom";
import Product from "../pages/Product";
import Login from "../pages/Login";

export default function Router() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/products" element={<Product />} />
        </Routes>
    );

}