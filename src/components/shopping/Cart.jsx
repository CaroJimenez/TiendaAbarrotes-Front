import React, { useEffect, useState } from "react";
import { doGet, doPost } from "../../config/Axios";
import Swal from "sweetalert2";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    doGet("/cart")
      .then((response) => {
        setCartItems(response.data);
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Error al cargar el carrito",
          icon: "error",
        });
      });
  }, []);

  const removeFromCart = (productId) => {
    doPost("/cart/remove", { productId })
      .then(() => {
        setCartItems(cartItems.filter((item) => item.id !== productId));
        Swal.fire({
          title: "Producto eliminado",
          text: "El producto se ha eliminado del carrito",
          icon: "success",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Error al eliminar el producto del carrito",
          icon: "error",
        });
      });
  };

  const handleCheckout = () => {
    Swal.fire({
      title: "Compra realizada",
      text: "Gracias por tu compra!",
      icon: "success",
    });
  };

  return (
    <div className="container">
      <h1 className="mt-3">Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div key={item.id} className="col-md-4">
              <div className="card mt-3 shadow-sm" style={styles.card}>
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                  style={styles.cardImage}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">Precio: ${item.price}</p>
                  <div style={styles.buttonContainer}>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar del carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary mt-5" onClick={handleCheckout}>
            Proceder a la compra
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    borderRadius: "15px",
    overflow: "hidden",
    transition: "transform 0.2s",
  },
  cardImage: {
    height: "200px",
    objectFit: "cover",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
};
