import React, { useState } from "react";
import { doPost } from "../../config/Axios";
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("El nombre completo es requerido").min(3, "El nombre debe tener al menos 3 caracteres").max(50, "El nombre debe tener máximo 50 caracteres"),
    email: Yup.string().email("El correo no es válido").required("El correo electrónico es requerido"),
    phone_number: Yup.string().required("El número de teléfono es requerido").matches(/^[0-9]+$/, "El número de teléfono debe contener solo números"),
    age: Yup.number().required("La edad es requerida").min(18, "Debes ser mayor de edad").max(100, "La edad no puede superar los 100 años"),
    gender: Yup.string().required("El género es requerido"),
  });

  const handleRegister = async (values) => {
    const { fullname, email, phone_number, age, gender } = values;

    const user_name = email;

    const requestBody = JSON.stringify({
      email,
      phone_number,
      name: fullname,
      age,
      gender,
      user_name,
    });

    setLoading(true);

    try {
      const response = await doPost(
        'https://1zzmagp341.execute-api.us-east-1.amazonaws.com/Prod/insert-user',
        requestBody,
        { 'Content-Type': 'application/json' }
      );

      console.log("Response:", response);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Usuario registrado correctamente. Revisa tu correo para más detalles.',
          timer: 3000,
          timerProgressBar: true,
        }).then(() => {
          window.location.href = '/';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'Error al registrar usuario',
        });
      }
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al registrar usuario',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Formik
      initialValues={{ fullname: '', email: '', phone_number: '', age: '', gender: '' }}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="fullname">Nombre completo</label>
            <Field type="text" className="form-control" id="fullname" name="fullname" />
            <ErrorMessage name="fullname" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Correo electrónico</label>
            <Field type="email" className="form-control" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone_number">Número de teléfono</label>
            <Field type="text" className="form-control" id="phone_number" name="phone_number" />
            <ErrorMessage name="phone_number" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="age">Edad</label>
            <Field type="number" className="form-control" id="age" name="age" />
            <ErrorMessage name="age" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="gender">Género</label>
            <Field as="select" className="form-control" id="gender" name="gender">
              <option value="">Selecciona...</option>
              <option value="Male">Masculino</option>
              <option value="Female">Femenino</option>
              <option value="Other">Otro</option>
            </Field>
            <ErrorMessage name="gender" component="div" className="text-danger" />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={styles.button}
            disabled={loading || isSubmitting}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Registrarse"
            )}
          </button>
          <div className="text-center mt-2">
            <a href="/">Iniciar sesión</a>
          </div>

          <style jsx>{`
            .spinner-border-sm {
              width: 1.2rem;
              height: 1.2rem;
              border-width: 0.2em;
            }

            .btn:disabled {
              opacity: 0.65;
              cursor: not-allowed;
            }
          `}</style>
        </Form>
      )}
    </Formik>
  );
}

const styles = {
  button: {
    width: "100%",
    backgroundColor: "#fd6250",
    borderColor: "#fd6250",
  }
}
