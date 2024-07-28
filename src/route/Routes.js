import React from "react";
import { Route, Routes } from "react-router-dom";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Suppliers from "../pages/Suppliers";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/products" element={<Product />} />
      <Route path="/suppliers" element={<Suppliers />} />
    </Routes>
  );
}
