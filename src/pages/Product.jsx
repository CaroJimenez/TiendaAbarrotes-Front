import React from 'react';
import productsImage from '../assets/products.png';
import ProductList from '../components/product/ProductList';

export default class Product extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.imageWrapper}>
          <img src={productsImage} alt="productos" style={styles.image} />
          <div style={styles.overlay}></div>
        </div>
        <h1 className='mt-3'>Lista de productos</h1>
        <ProductList />
      </div>
    );
  }
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
};
