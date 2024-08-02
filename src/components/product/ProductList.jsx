import React, { useEffect, useState } from 'react';
import { doGet, doPost } from '../../config/Axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    doGet('/')
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {
        Swal.fire({
          title: 'Error',
          text: 'Error al cargar los productos',
          icon: 'error',
        });
      });
  }, []);

  const addToCart = (productId) => {
    return () => {
      doPost('/cart', { productId })
        .then(() => {
          Swal.fire({
            title: 'Producto agregado',
            text: 'El producto se ha agregado al carrito',
            icon: 'success',
          }).then(() => {
            navigate('/cart');
          });
        })
        .catch(() => {
          Swal.fire({
            title: 'Error',
            text: 'Error al agregar el producto al carrito',
            icon: 'error',
          });
        });
    };
  };

  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card mt-3 shadow-sm" style={styles.card}>
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Precio: ${product.price}</p>
                <p className="card-text">Categoría: {product.category}</p>
                <p className="card-text">
                  Rating: {product.rating.rate} ({product.rating.count}{' '}
                  opiniones)
                </p>
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
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    borderRadius: '15px',
    overflow: 'hidden',
    transition: 'transform 0.2s',
  },
  cardImage: {
    height: '200px',
    objectFit: 'cover',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
};
