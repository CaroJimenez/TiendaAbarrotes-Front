import React, { useState } from "react";
import { doPost } from "../../config/Axios";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ChangePassword() {
  const navigate = useNavigate();

  const [temporaryPassword, setTemporaryPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const [requirements, setRequirements] = useState({
    length: false,
    number: false,
    uppercase: false,
    lowercase: false,
    specialChar: false
  });

  const specialCharPattern = /[^\w\s]|[_]/;

  const validatePassword = (password) => {
    setRequirements({
      length: password.length >= 8,
      number: /\d/.test(password),
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      specialChar: specialCharPattern.test(password)
    });
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);
    validatePassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const email = localStorage.getItem('email'); // Obtener el email de localStorage
    const temporaryPassword = document.getElementById('temporaryPassword').value;
    const newPassword = document.getElementById('newPassword').value;
  
    if (!email || !temporaryPassword || !newPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    try {
      const requestBody = JSON.stringify({
        username: email,
        temporary_password: temporaryPassword,
        new_password: newPassword
      });
  
      const response = await doPost(
        'https://1zzmagp341.execute-api.us-east-1.amazonaws.com/Prod/set-password',
        requestBody,
        { 'Content-Type': 'application/json' }
      );
  
      console.log('Respuesta del servidor:', response.data);
  
      Swal.fire({
        title: 'Éxito',
        text: 'Contraseña cambiada exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al cambiar la contraseña. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };
  
  return (
    <div className="change-password-container">
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit} className="change-password-form">
        <div className="form-group">
          <label htmlFor="temporaryPassword">Contraseña Temporal</label>
          <input
            type="password"
            className="form-control"
            id="temporaryPassword"
            value={temporaryPassword}
            onChange={(e) => setTemporaryPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Nueva Contraseña</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="newPassword"
              value={newPassword}
              onChange={handlePasswordChange}
              onFocus={() => setShowRequirements(true)}
              onBlur={() => setShowRequirements(false)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
          {showRequirements && (
            <ul className="password-requirements">
              <li className={requirements.length ? 'valid' : 'invalid'}>
                Longitud mínima de 8 caracteres
              </li>
              <li className={requirements.number ? 'valid' : 'invalid'}>
                Contiene al menos 1 número
              </li>
              <li className={requirements.uppercase ? 'valid' : 'invalid'}>
                Contiene al menos 1 letra mayúscula
              </li>
              <li className={requirements.lowercase ? 'valid' : 'invalid'}>
                Contiene al menos 1 letra minúscula
              </li>
              <li className={requirements.specialChar ? 'valid' : 'invalid'}>
                Contiene al menos 1 carácter especial
              </li>
            </ul>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="btn-submit"
        >
          Cambiar Contraseña
        </button>
      </form>

      <style jsx>{`
        .change-password-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h2 {
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }

        .change-password-form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          font-weight: 500;
          margin-bottom: 5px;
          color: #555;
        }

        .password-container {
          position: relative;
        }

        .form-control {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
          color: #333;
        }

        .form-control:focus {
          border-color: #fd6250;
          outline: none;
          box-shadow: 0 0 0 0.2rem rgba(253, 98, 80, 0.25);
        }

        .toggle-password {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          cursor: pointer;
          font-size: 18px;
        }

        .password-requirements {
          margin-top: 10px;
          padding: 0;
          list-style: none;
        }

        .password-requirements li {
          font-size: 14px;
          margin: 5px 0;
          display: flex;
          align-items: center;
        }

        .password-requirements li.valid {
          color: green;
        }

        .password-requirements li.invalid {
          color: red;
        }

        .btn-submit {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 4px;
          background-color: #fd6250;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .btn-submit:hover {
          background-color: #e55e4f;
        }
      `}</style>
    </div>
  );
}