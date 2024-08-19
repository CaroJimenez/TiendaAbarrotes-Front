import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Form from "../components/supplier/Form";
import img from "../assets/products.png";

function ManageProducts() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleCloseForm = () => {
    setIsVisible(false);
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
      {isVisible && (
        <div style={styles.formContainer}>
          <Form onClose={handleCloseForm} />
        </div>
      )}

      <div style={styles.navbarContainer}>
        <Navbar name="Administrar productos" options={options} />
      </div>
      <div style={styles.titleContainer}>
        <img src={img} style={styles.titleImage} alt="proveedores" />
        <h1 style={styles.title}>Lista de productos</h1>
      </div>
      <div style={styles.buttonContainer}>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={toggleVisibility}
        >
          Nuevo producto
        </button>
      </div>
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
        <div style={styles.tableRow}>
          <div style={styles.tableCell}>Negrito bimbo</div>
          <div style={styles.tableCell}>$50</div>
          <div style={styles.tableCell}>235</div>
          <div style={styles.tableCell}>Pan con cubierta de chocolate</div>
          <div style={styles.tableCell}>
            <button
              style={styles.buttonUpdate}
              type="submit"
              className="btn btn-primary"
            >
              Editar
            </button>
            <button
              style={styles.buttonDelete}
              type="submit"
              className="btn btn-primary"
            >
              Eliminar
            </button>
          </div>
        </div>
        <div style={styles.tableRow}>
          <div style={styles.tableCell}>Negrito bimbo</div>
          <div style={styles.tableCell}>$50</div>
          <div style={styles.tableCell}>235</div>
          <div style={styles.tableCell}>Pan con cubierta de chocolate</div>
          <div style={styles.tableCell}>
            <button
              type="submit"
              className="btn btn-primary"
              style={styles.buttonUpdate}
            >
              Editar
            </button>
            <button
              style={styles.buttonDelete}
              type="submit"
              className="btn btn-primary"
            >
              Eliminar
            </button>
          </div>
        </div>
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
