import React, { useState, useEffect } from "react";
import { doGet, doDelete } from "../config/Axios";
import Swal from "sweetalert2";
import Navbar from "../components/navbar/Navbar";
import SupplierForm from "../components/supplier/Form";
import img from "../assets/proveedores.jpeg";
import loadingGif from "../assets/loading2.gif";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCloseForm = () => {
    setIsVisible(false);
    setSelectedSupplier(null); 
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    toggleVisibility();
  };

  useEffect(() => {
    let loadingTimeout;

    const fetchSuppliers = async () => {
      try {
        const response = await doGet("https://r6ng4v0ala.execute-api.us-east-1.amazonaws.com/Prod/supplier/getAll");
        setSuppliers(response.data.suppliers);
      } catch {
        Swal.fire({
          title: "Error",
          text: "Error al cargar los proveedores",
          icon: "error",
        });
      } finally {
        loadingTimeout = setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchSuppliers();
    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleDelete = (supplierId) => {
    Swal.fire({
      title: '¿Estás seguro de eliminar al proveedor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        doDelete(`https://r6ng4v0ala.execute-api.us-east-1.amazonaws.com/Prod/supplier/delete/${supplierId}`)
          .then(() => {
            Swal.fire(
              'Eliminado!',
              'El proveedor ha sido eliminado.',
              'success'
            );
            setSuppliers(suppliers.filter(supplier => supplier._id !== supplierId));
          })
          .catch(() => {
            Swal.fire({
              title: "Error",
              text: "Error al eliminar el proveedor",
              icon: "error",
            });
          });
      }
    });
  };

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

  return (
    <div style={styles.container}>
      <div style={styles.navbarContainer}>
        <Navbar name="Proveedores" options={options} />
      </div>

      <div style={styles.titleContainer}>
        <img src={img} style={styles.titleImage} alt="proveedores" />
        <h1 style={styles.title}>Lista de proveedores</h1>
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>
          <img src={loadingGif} alt="Loading..." style={styles.loadingGif} />
        </div>
      ) : (
        <>
          <div style={styles.buttonContainer}>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={toggleVisibility}
            >
              Nuevo proveedor
            </button>
          </div>

          <div style={styles.tableContainer}>
            <div style={styles.tableHeader}>
              <div style={{ ...styles.tableTitle, ...styles.tableCell }}>
                Nombre
              </div>
              <div style={{ ...styles.tableTitle, ...styles.tableCell }}>
                Contacto
              </div>
              <div style={{ ...styles.tableTitle, ...styles.tableCell }}>
                Teléfono
              </div>
              <div style={{ ...styles.tableTitle, ...styles.tableCell }}>
                Acciones
              </div>
            </div>

            {suppliers.map((supplier) => (
              <div key={supplier._id} style={styles.tableRow}>
                <div style={styles.tableCell}>{supplier.name}</div>
                <div style={styles.tableCell}>{supplier.contactName}</div>
                <div style={styles.tableCell}>{supplier.phone}</div>
                <div style={styles.tableCell}>
                  <button
                    style={styles.buttonUpdate}
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleEdit(supplier)}
                  >
                    Editar
                  </button>
                  <button
                    style={styles.buttonDelete}
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(supplier._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {isVisible && (
        <div style={styles.formContainer}>
          <SupplierForm
            onClose={handleCloseForm}
            initialValues={selectedSupplier}
            onSubmit={() => {
              handleCloseForm();
            }}
          />
        </div>
      )}
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
  loadingGif: {
    width: '500px',
    height: '400px',
  },
};

export default Suppliers;
