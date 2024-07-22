import React from "react";
import {doPost} from "../../config/Axios";


export default function LoginForm(){

  const login = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const response = await doPost('/auth/login', {email, password});
    console.log(response);
  }

    return (
      <form>
        <div className="mb-3">
          <label for="email">Correo</label>
          <input type="email" className="form-control" id="email" />
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
          Iniciar sesión
        </button>
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
