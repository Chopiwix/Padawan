import { useEffect, useState } from "react";
import * as auth from "../utils/auth";

export default function Login(props) {
  const { onLogin } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeLogin = async (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return console.log(password);
    }

    try {
      const data = await auth.login(password, email);

      console.log(data);

      if (data.token) {
        onLogin();

        setEmail("");
        setPassword("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error durante la autenticación:", error.message);
    }
  };

  return (
    <>
      <div className="contenedor__todo">
        <div className="caja__trasera">
          <div className="caja__trasera_login">
            <h3>¿Ya tienes una cuenta?</h3>
            <p>Iniciar sesión para entrar en la página</p>
            <button id="btn__iniciar-sesion">Iniciar sesión</button>
          </div>
          <div className="caja__trasera_register">
            <h3>¿Aún no tienes una cuenta?</h3>
            <p>Regístrate para iniciar sesión</p>
            <button id="btn__registrarse">Registrarse</button>
          </div>
        </div>

        <div className="contenedor__login-register">
          <form onSubmit={handleSubmitLogin} className="formulario__login">
            <h2>Iniciar sesión</h2>
            <input
              type="email"
              name="email"
              className="ControlInput ControlInput--email"
              placeholder="Correo Electrónico"
              spellCheck="false"
              value={email}
              onChange={handleChangeLogin}
            />
            <i className="uil uil-envelope email-icon"></i>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={handleChangeLogin}
            />
            <button type="submit">Entrar</button>
          </form>

          <form action="" className="formulario__register">
            <h2>Registrarse</h2>
            <input type="text" placeholder="Nombre Completo" />
            <input
              type="email"
              name="email"
              className="ControlInput ControlInput--email"
              placeholder="Correo Electrónico"
            />
            <input type="text" placeholder="Usuario" />
            <input type="password" placeholder="Contraseña" />
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </>
  );
}
