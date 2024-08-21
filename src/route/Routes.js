import React from "react";
import { Route, Routes } from "react-router-dom";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Suppliers from "../pages/Suppliers";
import Register from "../pages/Register";
import RegisterProduct from "../pages/RegisterProduct";
import CartPage from '../pages/CartPage';
import Cart from "../pages/Cart";
import ManageProducts from "../pages/ManageProducts";
import ChangePassword from "../components/auth/ChangePassword";
import PrivateRoute from "./PrivateRoutes";
import PrivateRouteUser from "./PrivateRoutesUser";

export default function Router() {

  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/change-password" element={<ChangePassword />} />

       {/* Rutas Privada de Admin */}
      <Route
        path="/register-product"
        element={
          <PrivateRoute>
            <RegisterProduct />
          </PrivateRoute>
        }
      />

      <Route
        path="/suppliers"
        element={
          <PrivateRoute>
            <Suppliers />
          </PrivateRoute>
        }
      />

      <Route
        path="/manage-products"
        element={
          <PrivateRoute>
            <ManageProducts />
          </PrivateRoute>
        }
      />

      {/* Rutas privadas de user */}

      <Route
        path="/products"
        element={
          <PrivateRouteUser>
            <Product />
          </PrivateRouteUser>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRouteUser>
            <CartPage />
          </PrivateRouteUser>
        }
      />
      <Route
        path="/mi-carrito"
        element={
          <PrivateRouteUser>
            <Cart />
          </PrivateRouteUser>
        }
      />

    </Routes>
  );
}
