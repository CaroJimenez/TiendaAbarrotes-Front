import React, { useState } from "react";
import { doPost } from "../../config/Axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function LoginForm() {
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const navigate = useNavigate();

  const login = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    setLoading(true); // Activar estado de carga

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
            localStorage.setItem('email', email); // Save the email in localStorage
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
      setLoading(false); // Desactivar estado de carga
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
        disabled={loading} // Deshabilitar el botón si loading es true
      >
        {loading ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> // Indicador de carga
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
