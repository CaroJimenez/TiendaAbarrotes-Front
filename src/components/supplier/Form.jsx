import React from "react";

function Form() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <h5 style={styles.title}>Formulario de proveedores</h5>
        </div>

        <div style={styles.buttonClose}>
          <button class="btn btn-primary" type="submit" style={styles.button}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "50%",
    height: "70%",
    backgroundColor: "var(--color-secondary)",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    borderRadius: "10px",
  },
  title: {
    color: "var(--color-secondary)",
  },
  buttonClose: {
    display: "flex",
    flexDirection: "column-reverse",
    marginRight: "3%",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    marginLeft: "3%",
  },
  button: {
    backgroundColor: "var(--color-primary)",
    borderColor: "var(--color-primary)",
  },
  header: {
    backgroundColor: "var(--color-primary)",
    width: "100%",
    height: "50px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default Form;
