import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Form from "../components/product/Register";
import img from "../assets/products.png";
import { doGet, doDelete } from "../config/Axios"; // Asegúrate de que `doDelete` esté configurado en Axios
import Swal from 'sweetalert2';
import EditProductForm from "../components/product/EditProduct";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Nuevo estado para distinguir entre editar y crear

  const role = localStorage.getItem('role');
  const idToken = localStorage.getItem('id_token');

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCloseForm = () => {
    setIsVisible(false);
    setSelectedProduct(null);
    setIsEditing(false); // Resetea el estado de edición al cerrar el formulario
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditing(true); // Indica que se está editando un producto
    setIsVisible(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!'
      });

      if (result.isConfirmed) {
        await doDelete(`/product/delete/${productId}`, {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        });

        setProducts(products.filter(product => product._id !== productId));

        Swal.fire(
          'Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        );
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error al eliminar el producto',
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await doGet('/product/getAll', {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        });
        setProducts(response.data.products);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Error al cargar los productos',
          icon: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [idToken]);

  const options = [
    {
      name: "Productos",
      URL: "/products",
    },
    {
      name: "Carrito",
      URL: "/cart",
    },
  ];

  if (loading) {
    return (
      <div style={styles.container}>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {isVisible && (
        <div style={styles.formContainer}>
          {isEditing ? (
            <EditProductForm 
              productId={selectedProduct?._id} 
              onClose={handleCloseForm} 
            />
          ) : (
            <Form 
              onClose={handleCloseForm} 
              product={selectedProduct} 
              isEditing={isEditing} // Pasa el estado de edición al formulario
            />
          )}
        </div>
      )}

      <div style={styles.navbarContainer}>
        <Navbar name="Administrar productos" options={options} />
      </div>
      <div style={styles.titleContainer}>
        <img src={img} style={styles.titleImage} alt="proveedores" />
        <h1 style={styles.title}>Lista de productos</h1>
      </div>
      {role === 'Admins' && (
        <div style={styles.buttonContainer}>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={toggleVisibility}
          >
            Nuevo producto
          </button>
        </div>
      )}
      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          <div style={{ ...styles.tableTitle, ...styles.tableCell }}>
            Nombre
          </div>
          <div style={{ ...styles.tableTitle, ...styles.tableCell }}>
            Precio
          </div>
          <div style={{ ...styles.tableTitle, ...styles.tableCell }}>
            Disponibilidad
          </div>
          <div style={{ ...styles.tableTitle, ...styles.tableCell }}>
            Descripción
          </div>
          <div style={{ ...styles.tableTitle, ...styles.tableCell }}>
            Acciones
          </div>
        </div>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} style={styles.tableRow}>
              <div style={styles.tableCell}>{product.name}</div>
              <div style={styles.tableCell}>${product.price}</div>
              <div style={styles.tableCell}>{product.stock}</div>
              <div style={styles.tableCell}>{product.description}</div>
              <div style={styles.tableCell}>
                <button
                  style={styles.buttonUpdate}
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => handleEditProduct(product)}
                >
                  Editar
                </button>
                <button
                  style={styles.buttonDelete}
                  type="submit"
                  className="btn btn-danger"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.tableRow}>
            <div style={styles.tableCell}>No hay productos disponibles</div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  navbarContainer: {
    display: "flex",
    width: "100%",
  },
  tableContainer: {
    width: "80%",
    boxShadow: "0 2px 4px rgba(97, 97, 97, 0.2)",
  },
  tableHeader: {
    display: "flex",
    padding: "1.5% 5% 1.5% 15%",
    backgroundColor: "var(--color-gray)",
    borderRadius: "10px 10px 0 0",
  },
  tableTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "var(--color-secondary)",
  },
  tableRow: {
    display: "flex",
    padding: "1.5% 5% 1.5% 15%",
    backgroundColor: "var(--color-secondary)",
    borderBottom: "1px solid var(--color-gray)",
  },
  tableCell: {
    flex: 1,
    textAlign: "left",
  },
  buttonUpdate: {
    cursor: "pointer",
    marginRight: "1rem",
  },
  buttonDelete: {
    backgroundColor: "var(--color-primary)",
    borderColor: "var(--color-primary)",
    color: "white",
  },
  formContainer: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    marginBottom: "1%",
  },
  titleImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  },
  title: {
    color: "white",
    position: "absolute",
    fontSize: "3rem",
    top: "60%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "80%",
    marginBottom: "1%",
  },
};

export default ManageProducts;
