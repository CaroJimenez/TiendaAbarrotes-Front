import React from "react";
import img from "../../assets/delivery.png";

function Form({ onClose }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <h5 style={styles.title}>Formulario de proveedores</h5>
        </div>

        <div style={styles.buttonClose}>
          <button
            class="btn btn-primary"
            type="submit"
            style={styles.button}
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>

      <div style={styles.body}>
        <div style={styles.imgContainer}>
          <img src={img} alt="proveedores" style={styles.img} />
        </div>

        <div style={styles.inputContainer}>
          <input
            type="text"
            class="form-control"
            placeholder="Nombre del proveedor"
            aria-label="SupplierName"
            aria-describedby="basic-addon1"
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            class="form-control"
            placeholder="Contacto"
            aria-label="Contact"
            aria-describedby="basic-addon1"
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="number"
            class="form-control"
            placeholder="Teléfono"
            aria-label="PhoneNumber"
            aria-describedby="basic-addon1"
          />
        </div>
        <div style={styles.buttonsContainer}>
          <button class="btn btn-primary" type="submit">
            Registrar
          </button>
          <button class="btn btn-warning" type="submit">
            Limpiar
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
    flexDirection: "column",
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
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",

  },
  inputContainer: {
    display: "flex",
    margin: "1%",
    width: "80%",

    height: "9%",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row-reverse",

    margin: "1%",
    width: "80%",
    height: "9%",
    gap: "1rem",
  },
  imgContainer: {
    width: "40%",

    height: "40%",
  },
  img: {
    width: "100%",
    height: "100%",
  },
};

export default Form;
