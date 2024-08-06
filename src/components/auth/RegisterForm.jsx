import React from "react";
import { doPost } from "../../config/Axios";
import Swal from 'sweetalert2';

export default function RegisterForm() {

  const register = async () => {
    const fullname = document.getElementById('fullname').value;
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    try {
      const response = await doPost('https://zaasmqdmhe.execute-api.us-east-1.amazonaws.com/Prod/user/insert', { fullname, user, password });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Usuario registrado correctamente',
        });
        window.location.href = '/';
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'Error al registrar usuario',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al registrar usuario',
      });
    }
  }

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="fullname">Nombre completo</label>
        <input type="text" className="form-control" id="fullname" />
      </div>
      <div className="mb-3">
        <label htmlFor="user">Nombre de usuario</label>
        <input type="text" className="form-control" id="user" />
      </div>
      <div className="mb-3">
        <label htmlFor="password">Contraseña</label>
        <input type="password" className="form-control" id="password" />
      </div>
      <button type="submit" className="btn btn-primary" style={styles.button} onClick={
        (e) => {
          e.preventDefault();
          register();
        }
      }>
        Registrarse
      </button>
      <div className="text-center mt-2">
        <a href="/login">Iniciar sesión</a>
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
}
