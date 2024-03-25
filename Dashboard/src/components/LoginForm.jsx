import React, { useState } from "react";
import "./LoginForm.css";
function LoginForm({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState("");

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      if (email === "" || password === "") {
        setError(true);
        setMsgError("Todos los campos son obligatorios");
        return;
      } else {
        setError(false);
      }
      const response = await fetch("http://localhost:3010/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log("data", data);
      if (data.user === "Not Found") {
        setError(true);
        setMsgError("No tienes permisos");
        setUser([]);
      } else if (data.user === "Not password") {
        setError(true);
        setMsgError("La contraseña es incorrecta");
        setUser([]);
      } else {
        setUser([data.first_name, data.image]);
        window.sessionStorage.setItem(
          "userLogged",
          JSON.stringify([data.first_name, data.image])
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <form className='mainForm d-flex justify-content-center align-items-center' action="" onSubmit={handleSubmit1}>
          <h1>Login</h1>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id=""
            placeholder="nombre@hotmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="loginButton">
            Iniciar Sesión
          </button>
        </form>
        {error && (
        <div className="containerAlert d-flex justify-content-center align-items-center mt-3">
          <div className="alert alert-danger mt-3" role="alert">
            {msgError}
          </div>
        </div>)}
      </div>
    </>
  );
}
export default LoginForm;