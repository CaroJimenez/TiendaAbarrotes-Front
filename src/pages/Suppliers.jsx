import React from "react";
import Navbar from "../components/navbar/Navbar";

function Suppliers() {
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
      <div style={{ padding: "3% 0 3%" }}>
        <h1>Lista de proveedores</h1>
        <div style={styles.buttonNewContainer}>
          <button type="submit" className="btn btn-primary">
            Nuevo proveedor
          </button>
        </div>
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
        <div style={styles.tableRow}>
          <div style={styles.tableCell}>Proveedor 829</div>
          <div style={styles.tableCell}>Nombre del contacto</div>
          <div style={styles.tableCell}>1234567890</div>
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
          <div style={styles.tableCell}>Proveedor 1</div>
          <div style={styles.tableCell}>Nombre del contacto</div>
          <div style={styles.tableCell}>12345672838290</div>
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
    flexDirection: "row",
    justifyContent: "space-between",
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
  buttonNewContainer: {
    position: "absolute",
    right: "10%",
    top: "15%",
  },
};

export default Suppliers;
