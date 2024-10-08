import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import img from "../../assets/product.png";

export default function ProductForm({ onClose, initialValues, onSubmit }) {
  const [supplier, setSupplier] = useState({
    name: "",
    contact: "",
    phone: "",
  });

  useEffect(() => {
    if (initialValues) {
      setSupplier({
        name: initialValues.name || "",
        contact: initialValues.contact || "",
        phone: initialValues.phone || "",
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const action = initialValues ? "actualizar" : "registrar";
    const id = initialValues ? initialValues._id : null;
    console.log(id);
    const url = initialValues
      ? `https://c6v8kro3w7.execute-api.us-east-1.amazonaws.com/Prod/supplier/update/${id}`
      : "https://c6v8kro3w7.execute-api.us-east-1.amazonaws.com/Prod/supplier/insert";

    Swal.fire({
      title: `¿Estás seguro de ${action} el proveedor?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, ${action}`,
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const headers = {
            "Content-Type": "application/json",
          };

          if (initialValues) {
            await axios.patch(url, supplier, { headers });
            Swal.fire({
              icon: "success",
              title: "Proveedor actualizado",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(supplier);
          } else {
            await axios.post(url, supplier, { headers });
            Swal.fire({
              icon: "success",
              title: "Proveedor registrado",
              showConfirmButton: false,
              timer: 1500,
            });
          }

          setSupplier({
            name: "",
            contact: "",
            phone: "",
          });
          setTimeout(() => {
            window.location.href = window.location.href;
          }, 3000);

          if (onSubmit) onSubmit();
        } catch (error) {
          console.error(error);
          console.log(supplier);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: initialValues
              ? "Error al actualizar el proveedor"
              : "Error al registrar el proveedor",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const handleClear = () => {
    setSupplier({
      name: "",
      contact: "",
      phone: "",
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <h5 style={styles.title}>
            {initialValues ? "Editar producto" : "Nuevo producto"}
          </h5>
        </div>

        <div style={styles.buttonClose}>
          <button
            className="btn btn-primary"
            type="button"
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
            className="form-control"
            placeholder="Nombre del producto"
            aria-label="productName"
            aria-describedby="basic-addon1"
            name="name"
            value={supplier.name}
            onChange={handleChange}
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type=" number"
            className="form-control"
            placeholder="Precio"
            aria-label="price"
            aria-describedby="basic-addon1"
            name="Price"
            value={supplier.contact}
            onChange={handleChange}
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="number"
            className="form-control"
            placeholder="Disponibilidad"
            aria-label="disponibility"
            aria-describedby="basic-addon1"
            name="disponibility"
            value={supplier.phone}
            onChange={handleChange}
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            className="form-control"
            placeholder="Descripción"
            aria-label="description"
            aria-describedby="basic-addon1"
            name="description"
            value={supplier.phone}
            onChange={handleChange}
          />
        </div>
        <div style={styles.buttonsContainer}>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            {initialValues ? "Actualizar" : "Registrar"}
          </button>
          <button
            className="btn btn-warning"
            type="button"
            onClick={handleClear}
          >
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
    height: "75%",
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
    height: "8%",
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
