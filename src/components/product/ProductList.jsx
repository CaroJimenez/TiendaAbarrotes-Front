import React, { useEffect, useState } from 'react';
import { doGet, doPatch } from '../../config/Axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import loadingGif from '../../assets/loading4.gif';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const role = localStorage.getItem('role');

  useEffect(() => {
    let loadingTimeout;

    const fetchProducts = async () => {
      try {
        const response = await doGet("/product/getAll");
        setProducts(response.data.products);
      } catch {
        Swal.fire({
          title: "Error",
          text: "Error al cargar los productos",
          icon: "error",
        });

      } finally {
        loadingTimeout = setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
      
    };
    fetchProducts();
    return () => clearTimeout(loadingTimeout);
  }, []);

  const addToCart = (productId) => {
    return () => {
      doPatch(`/cart/update/${productId}`, {})
        .then(() => {
          Swal.fire({
            title: "Producto agregado",
            text: "El producto se ha agregado al carrito",
            icon: "success",
          }).then(() => {
            navigate("/cart");
          });
        })
        .catch(() => {
          Swal.fire({
            title: "Error",
            text: "Error al agregar el producto al carrito",
            icon: "error",
          });
        });
      console.log(productId);
    };
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <img src={loadingGif} alt="Loading..." style={styles.loadingGif} />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4">
            <div className="card mt-3 shadow-sm" style={styles.card}>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Precio: ${product.price}</p>
                <p className="card-text">Stock: {product.stock}</p>
                <div style={styles.buttonContainer}>
                  <button
                    className="btn btn-outline-primary"
                    onClick={addToCart(product._id)}
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
    borderRadius: "15px",
    overflow: "hidden",
    transition: "transform 0.2s",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  loadingGif: {
    width: "500px",
    height: "400px",
  },
};
