import React, { useEffect, useState } from "react";
import { doGet, doPost } from "../../config/Axios";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function RegisterProductForm() {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("El nombre es requerido").min(3, "El nombre debe tener al menos 3 caracteres").max(12, "El nombre debe tener máximo 12 caracteres"),
        description: Yup.string().required("La descripción es requerida").min(3, "La descripción debe tener al menos 3 caracteres").max(50, "La descripción debe tener máximo 50 caracteres"),
        price: Yup.number().required("El precio es requerido").min(1, "El precio debe ser mayor a 0").max(10000, "El precio debe ser menor a 10000"),
        stock: Yup.number().required("Las existencias son requeridas").min(1, "Las existencias deben ser mayor a 0").max(10000, "Las existencias deben ser menor a 10000"),
        id_supplier: Yup.string().required("El proveedor es requerido"),
    });

    const [suppliers, setSuppliers] = useState([]);
    
    useEffect(() => {
        doGet("https://c6v8kro3w7.execute-api.us-east-1.amazonaws.com/Prod/supplier/getAll")
            .then((response) => {
                setSuppliers(response.data.suppliers);
                console.log(response.data.suppliers);
            })
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "Error al cargar los proveedores",
                    icon: "error",
                });
            });
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await doPost("/product/insert", values);
            Swal.fire({
                icon: "success",
                title: "Producto registrado",
                showConfirmButton: false,
                timer: 1500,
            });
            resetForm();
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error al registrar el producto",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    return (
        <div className="container mt-5 mb-5" style={{ width: '550px' }}>
            <div className="card">
                <div className="card-body">
                    <Formik
                        initialValues={{
                            name: "",
                            description: "",
                            price: "",
                            stock: "",
                            id_supplier: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isValid }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Nombre
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Descripción
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        name="description"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">
                                        Precio
                                    </label>
                                    <Field
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                    />
                                    <ErrorMessage name="price" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="stock" className="form-label">
                                        Existencias
                                    </label>
                                    <Field
                                        type="number"
                                        className="form-control"
                                        id="stock"
                                        name="stock"
                                    />
                                    <ErrorMessage name="stock" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="supplier" className="form-label">
                                        Proveedor
                                    </label>
                                    <Field
                                        as="select"
                                        className="form-select"
                                        id="supplier"
                                        name="id_supplier"
                                    >
                                        <option value="">Selecciona un proveedor</option>
                                        {suppliers.map((supplier) => (
                                            <option key={supplier._id} value={supplier._id}>
                                                {supplier.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="id_supplier" component="div" className="text-danger" />
                                </div>
                                <button type="submit" className="btn btn-outline-primary mt-2" disabled={!isValid} style={styles.btn}>
                                    Registrar
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

const styles = {
    btn: {
        width: '100%',
    }
}