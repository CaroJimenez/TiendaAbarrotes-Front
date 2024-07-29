import React from "react";
import {doPost} from "../../config/Axios";


export default function RegisterForm(){

  const login = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const response = await doPost('/auth/login', {email, password});
    console.log(response);
  }

    return (
      <form>
        <div className="mb-3">
          <label for="fullname">Nombre completo</label>
          <input type="text" className="form-control" id="fullname" />
        </div>
        <div className="mb-3">
          <label for="user">Nombre de usuario</label>
          <input type="text" className="form-control" id="user" />
        </div>
        <div className="mb-3">
          <label for="password">Contraseña</label>
          <input type="password" className="form-control" id="password"/>
        </div>
        <button type="submit" className="btn btn-primary" style={styles.buttton} onClick={
          (e) => {
            e.preventDefault();
            login();
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
  buttton: {
    width: "100%",
    backgroundColor: "#fd6250",
    borderColor: "#fd6250",
  }
}