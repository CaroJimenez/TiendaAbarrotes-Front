import React from "react";
import ProductList from "../components/product/ProductList";

export default class Product extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Lista de productos</h1>
        <ProductList />
      </div>
    );
  }
}