import React from "react";
import { Route, Routes } from "react-router-dom";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Suppliers from "../pages/Suppliers";
import Register from "../pages/Register";
import RegisterProduct from "../pages/RegisterProduct";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/products" element={<Product />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-product" element={<RegisterProduct />} />
    </Routes>
  );
}
