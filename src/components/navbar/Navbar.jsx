import React from "react";
import "../../global/styles/index.css";

function Navbar(props) {
  const { name, options } = props;
  const role = localStorage.getItem("role");

  const closeSession = () => {
    console.log("closeSession");
    localStorage.clear();
  };

  const filteredOptions = options.filter(option => {
    if (role === "Admins") {
      return option.name === "Productos" || option.name === "Proveedores";
    }
    if (role === "Users") {
      return option.name === "Productos";
    }
    return false; // Hide options for any other roles
  });

  const LogOut = () => {
    console.log("Cerrar sesión");
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>{name}</div>
      <div>
        {role === "Admins" && (
          <>
            <a href="/manage-products" style={styles.link}>
              Productos
            </a>
            <a href="/suppliers" style={styles.link}>
              Proveedores
            </a>
          </>
        )}
        {role === "Users" && (
          <a href="/products" style={styles.link}>
            Productos
          </a>
        )}
      </div>
      <div>
        <a href="/" style={styles.link} onClick={closeSession}>
          Cerrar sesión
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "var(--color-primary)",
    display: "flex",
    justifyContent: "space-between",
    padding: "1.5rem 2rem",
    boxShadow: "0 2px 4px rgba(97, 97, 97, 0.2)",
    width: "100%",
  },
  title: {
    color: "var(--color-secondary)",
    fontSize: "1.4rem",
    fontWeight: 725,
  },
  link: {
    textDecoration: "none",
    color: "var(--color-secondary)",
    fontSize: "1.2rem",
    marginLeft: "1rem",
  },
  logout: {
    backgroundColor: "var(--color-primary)",
    color: "white",
    borderColor: "var(--color-primary)",
    fontSize: "1.2rem",
    marginLeft: "1rem",
  },
};

export default Navbar;
