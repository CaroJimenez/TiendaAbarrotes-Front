import React from 'react';
import productsImage from '../assets/products.png';
import ProductList from '../components/product/ProductList';
import Navbar from "../components/navbar/Navbar";

export default function Product() {
  const role = localStorage.getItem("role");
    const options = [
      {
        name: "Proveedores",
        URL: "/suppliers",
      },
      {
        name: "Carrito",
        URL: "/cart",
      },
    ];

    const navigateToRegisterProduct = () => {
      window.location.href = "/register-product";
    };

    return (
      <div style={styles.container}>
        <div style={styles.navbarContainer}>
          <Navbar name="Productos" options={options} />
        </div>
        <div style={styles.imageWrapper}>
          <img src={productsImage} alt="productos" style={styles.image} />
          <div style={styles.overlay}></div>
        </div>
        <h1 className='mt-3' style={styles.title}>Lista de productos</h1>
        <div className='container'>
          <ProductList />
          {role === "Admins" && (
            <button
              className="btn btn-primary mt-2"
              onClick={navigateToRegisterProduct}
            >
              Registrar producto
            </button>
          )}
        </div>
      </div>
    );
}

// Estilos
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "20rem",
    objectFit: "cover",
    display: "block",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Ajusta la opacidad para la sombra
  },
  navbarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    color: "white",
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "3rem",
  }
};
