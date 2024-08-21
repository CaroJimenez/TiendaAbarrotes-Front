import React, { useState } from "react";
import { doPost } from "../../config/Axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("El correo no es válido").required("El correo electrónico es requerido"),
    password: Yup.string().required("La contraseña es requerida")
  });

  const handleLogin = async (values) => {
    const { email, password } = values;

    setLoading(true);

    try {
      const response = await doPost('https://1zzmagp341.execute-api.us-east-1.amazonaws.com/Prod/login', { username: email, password });

      if (response.data && response.data.error_message === "Missing 'AuthenticationResult' in response") {
        Swal.fire({
          title: 'Cambio de Contraseña',
          text: 'Debes cambiar tu contraseña temporal. ¿Quieres proceder?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem('email', email);
            navigate('/change-password');
          }
        });
      } else {
        console.log('Respuesta del servidor:', response.data);
        if (response.data.id_token) {
          localStorage.setItem('id_token', response.data.id_token);
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('refresh_token', response.data.refresh_token);
          localStorage.setItem('role', response.data.role);
          localStorage.setItem('email', email);
          if(localStorage.getItem('role') === 'Admins'){
            navigate('/manage-products');
          }else if(localStorage.getItem('role') === 'Users'){
            navigate('/products');
          }
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      if (error.response && error.response.data && error.response.data.error_message === "Missing 'AuthenticationResult' in response") {
        Swal.fire({
          title: 'Cambio de Contraseña',
          text: 'Debes cambiar tu contraseña temporal. ¿Quieres proceder?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem('email', email);
            navigate('/change-password');
          }
        });
      } else if (error.response && error.response.data && error.response.data.error_message === "Incorrect username or password") {
        Swal.fire({
          title: 'Valores incorrectos',
          text: 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="email">Correo</label>
            <Field type="email" className="form-control" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Contraseña</label>
            <Field type="password" className="form-control" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="text-danger" />
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
              "Iniciar sesión"
            )}
          </button>
          <div className="text-center mt-2">
            <a href="/register">Registrarse</a>
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
};
