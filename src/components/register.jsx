import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import * as auth from "../utils/auth";
import api from "../utils/api";

export default function Signup({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return console.log(password);
    }

    try {
      const data = await auth.register(password, email);

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

  const tokenCheck = async () => {
    const jwt = localStorage.getItem("jwt") || localStorage.getItem("token");

    if (jwt) {
      try {
        const res = await auth.getContent(jwt);
        await api.addCart(jwt);
        if (res) {
          console.log(res);
          await onLogin();
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);
  return (
    <>
      <form className="formulario__register">
        <h2>Regístrarse</h2>
        <input type="text" placeholder="Nombre Completo" />
        <input type="email" id="email" className="ControlInput ControlInput--email" placeholder="Correo Electrónico" />
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button>Regístrarse</button>
      </form>
    </>
  );
}
