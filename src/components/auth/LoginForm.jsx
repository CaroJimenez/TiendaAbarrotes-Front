import React from "react";
import { doPost } from "../../config/Axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function LoginForm() {
  const navigate = useNavigate();

  const login = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
            localStorage.setItem('email', email); // Save the email in localStorage
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
          localStorage.setItem('email', email); // Save the email in localStorage
          navigate('/products'); // Redirect to the desired page
        } else {
          // Handle other possible errors
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
            localStorage.setItem('email', email); // Save the email in localStorage
            navigate('/change-password');
          }
        });
      } else if (error.response && error.response.data && error.response.data.error_message === "Incorrect username or password") {
        Swal.fire({
          title: 'Valores incorrectos',
          text: 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí',
          cancelButtonText: 'No',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="email">Correo</label>
        <input type="email" className="form-control" id="email" />
      </div>
      <div className="mb-3">
        <label htmlFor="password">Contraseña</label>
        <input type="password" className="form-control" id="password" />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={styles.button}
        onClick={(e) => {
          e.preventDefault();
          login();
        }}
      >
        Iniciar sesión
      </button>
      <div className="text-center mt-2">
        <a href="/register">Registrarse</a>
      </div>
    </form>
  );
}

const styles = {
  button: {
    width: "100%",
    backgroundColor: "#fd6250",
    borderColor: "#fd6250",
  }
};
