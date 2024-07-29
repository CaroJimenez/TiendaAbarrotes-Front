import React, { useEffect, useState } from "react";
import { doGet, doPost } from "../../config/Axios";
import Swal from "sweetalert2";

export default function RegisterProductForm() {

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        supplier: "",
    });

    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await doGet("/suppliers");
                setSuppliers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSuppliers();
    }, []);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await doPost("/products", product);
            Swal.fire({
                icon: "success",
                title: "Producto registrado",
                showConfirmButton: false,
                timer: 1500,
            });
            setProduct({
                name: "",
                description: "",
                price: "",
                stock: "",
                supplier: "",
            });
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
        <div className="container mt-5 mb-5" style={{width: '550px'}}>
            <div class="card">
                <div class="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                onChange={handleChange}
                                value={product.name}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Descripción
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                onChange={handleChange}
                                value={product.description}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">
                                Precio
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                onChange={handleChange}
                                value={product.price}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="stock" className="form-label">
                                Existencias
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="stock"
                                name="stock"
                                onChange={handleChange}
                                value={product.stock}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="supplier" className="form-label">
                                Proveedor
                            </label>
                            <select
                                className="form-select"
                                id="supplier"
                                name="supplier"
                                onChange={handleChange}
                                value={product.supplier}
                            >
                                <option value="">Selecciona un proveedor</option>
                                {suppliers.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{width: "100%"}}>
                            Registrar
                        </button>
                    </form>
                </div>
            </div>  
        </div>
    );
}

const styles = {

};
