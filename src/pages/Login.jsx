import React from "react";
import LoginForm from "../components/auth/LoginForm";
import GroseryStore from "../assets/grocery-store.jpg";

export default function Login() {
  return (
    <div className="container" style={{ width: "90rem", marginTop: "5rem" }}>
      <div className="card">
        <div className="row">
          <div className="col-8">
              <img src={GroseryStore} alt="grocery-store" style={styles.image}/>
              <div style={styles.overlay}></div>
              <h1 style={styles.name}>Abarrotes "Don Cheto"</h1>
          </div>
          <div className="col-4 d-flex justify-content-center align-items-center flex-column">
            <h2 className="mb-3" style={styles.title}>Inicio de sesión</h2>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "66%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Ajusta la opacidad para la sombra
  },
  name: {
    position: "absolute",
    top: "50%",
    left: "41%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "3rem",
  },
}
