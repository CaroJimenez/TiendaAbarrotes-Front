import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Cart from '../components/shopping/Cart';

export default function CartPage() {
  const options = [
    {
      name: 'Proveedores',
      URL: '/suppliers',
    },
    {
      name: 'Productos',
      URL: '/products',
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.navbarContainer}>
        <Navbar name="Carrito de Compras" options={options} />
      </div>
      <h1 className="mt-3" style={styles.title}>Carrito de Compras</h1>
      <div className="container">
        <Cart />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  navbarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    color: 'black',
    fontSize: '3rem',
  },
};
