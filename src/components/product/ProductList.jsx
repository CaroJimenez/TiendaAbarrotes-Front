import React, { useEffect, useState } from "react";
import { doGet, doPost } from "../../config/Axios";
import Swal from "sweetalert2";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    doGet("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Error al cargar los productos",
          icon: "error",
        });
      });
  }, []);
  

  const addToCart = (product) => {
    return () => {
      doPost("/cart", { productId: product })
        .then(() => {
          Swal.fire({
            title: "Producto agregado",
            text: "El producto se ha agregado al carrito",
            icon: "success",
          });
        })
        .catch(() => {
          Swal.fire({
            title: "Error",
            text: "Error al agregar el producto al carrito",
            icon: "error",
          });
        });
    };
  };

  return (
    <div className="container">
      {products.map((product) => (
        <div key={product.id} className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text">Precio: ${product.price}</p>
            <div style={styles.buttonContainer}>
              <button
                className="btn btn-outline-primary"
                onClick={addToCart(product.id)}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
};
