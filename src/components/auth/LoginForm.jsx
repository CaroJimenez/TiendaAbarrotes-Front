import React from "react";

export default class LoginForm extends React.Component {
  render() {
    return (
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
            <form>
                <div className="mb-3">
                    <label for='email'>Correo</label>
                    <input type="email" className="form-control" id="email"/>
                </div>
                <div className="mb-3">
                    <label for='password'>Contraseña</label>
                    <input type="password" className="form-control" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            </form>
        </div>
      </div>
    );
  }
}
