import React, { useState } from "react";
import { doPost } from "../../config/Axios";
import Swal from 'sweetalert2';

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const register = async () => {
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone_number = document.getElementById('phone_number').value;
    const age = parseInt(document.getElementById('age').value, 10);
    const gender = document.getElementById('gender').value;

    // Verifica si todos los campos necesarios están presentes
    if (!fullname || !email || !phone_number || isNaN(age) || !gender) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos.',
      });
      return;
    }

    // Asigna el valor de email al user_name
    const user_name = email;

    // Construye el cuerpo de la solicitud
    const requestBody = JSON.stringify({
      email,
      phone_number,
      name: fullname,
      age,
      gender,
      user_name // Asignar el valor de email como user_name
    });

    setLoading(true); // Activar estado de carga

    try {
      const response = await doPost(
        'https://1zzmagp341.execute-api.us-east-1.amazonaws.com/Prod/insert-user',
        requestBody,
        { 'Content-Type': 'application/json' } // Asegúrate de establecer el encabezado correcto
      );

      // Imprime la respuesta en la consola
      console.log("Response:", response);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Usuario registrado correctamente. Revisa tu correo para más detalles.',
          timer: 3000, // Mostrar la alerta por 3 segundos
          timerProgressBar: true
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
      // Imprime el error en la consola
      console.error("Error:", error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al registrar usuario',
      });
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  }

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="fullname">Nombre completo</label>
        <input type="text" className="form-control" id="fullname" />
      </div>
      <div className="mb-3">
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" className="form-control" id="email" />
      </div>
      <div className="mb-3">
        <label htmlFor="phone_number">Número de teléfono</label>
        <input type="text" className="form-control" id="phone_number" />
      </div>
      <div className="mb-3">
        <label htmlFor="age">Edad</label>
        <input type="number" className="form-control" id="age" />
      </div>
      <div className="mb-3">
        <label htmlFor="gender">Género</label>
        <select className="form-control" id="gender">
          <option value="">Selecciona...</option>
          <option value="Male">Masculino</option>
          <option value="Female">Femenino</option>
          <option value="Other">Otro</option>
        </select>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={styles.button}
        onClick={(e) => {
          e.preventDefault();
          register();
        }}
        disabled={loading} // Deshabilitar el botón si loading es true
      >
        {loading ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> // Indicador de carga
        ) : (
          "Registrarse"
        )}
      </button>
      <div className="text-center mt-2">
        <a href="/login">Iniciar sesión</a>
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
}

