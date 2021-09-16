import React from "react";
import "./Login.css";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const handleUser = props.handleUser;
  const history = useHistory();

  const [showRememberPass, setShowRememberPass] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [emptyFields, setEmptyFields] = useState(false);

  const manageLoginEmail = (event) => {
    setLoginEmail(event.target.value);
  };

  const manageLoginPassword = (event) => {
    setLoginPassword(event.target.value);
  };

  const manageSubmit = (event) => {
    event.preventDefault();
    setEmptyFields(false);
    if (loginEmail === "" || loginPassword === "") {
      setEmptyFields(true);
      return null;
    }
    manageLogin({
      email: event.target[0].value,
      password: event.target[1].value,
    });
  };

  const manageLogin = async (loginData) => {
    await axios
      .post("http://localhost:5000/shop/users/login", loginData)
      .then((datos) => {
        handleUser(datos.data.token, {
          email: datos.data.email,
          userId: datos.data.userId,
        });
        setLoginEmail("");
        setLoginPassword("");
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="Login container">
      <form className="bg-light container rounded my-3" onSubmit={manageSubmit}>
        <h1>Iniciar sesión</h1>
        {/* <div>
          <button className="btn btn-outline-primary col-12 my-3">
            <i className="fab fa-google"></i> Entrar con Google
          </button>
        </div>
        <div className="divider d-flex align-items-center my-3">
          <p className="text-center fw-bold mx-3 mb-0">O</p>
        </div> */}
        {/* {showRememberPass ? (
          <div className="input-group col-12 mb-2">
            <input
              type="text"
              name="remember-email"
              id="remember-email"
              placeholder="E-mail"
              className="form-control form-control-medium"
            />
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={() => setShowRememberPass(false)}
              >
                Enviar
              </button>
            </div>
          </div>
        ) : null} */}
        {!showRememberPass ? (
          <div>
            <div className="form-group col-12">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="E-mail *"
                className="form-control form-control-lg mb-4"
                value={loginEmail}
                onChange={manageLoginEmail}
              />
            </div>
            <div className="form-group col-12 mb-3">
              <input
                type="password"
                name="pass"
                id="pass"
                placeholder="Contraseña *"
                className="form-control form-control-lg"
                value={loginPassword}
                onChange={manageLoginPassword}
              />
            </div>
            {/* <p className="btn" onClick={() => setShowRememberPass(true)}>
              ¿Ha olvidado su contraseña?
            </p> */}
            {emptyFields ? (
              <p className="text-error">No puede dejar campos en blanco</p>
            ) : null}
            <button className="btn btn-primary col-12 my-4">
              Iniciar sesión
            </button>
          </div>
        ) : null}
        <div className="divider d-flex align-items-center">
          <p className="text-center fw-bold mx-3 mb-0">
            ¿Eres un nuevo cliente?
          </p>
        </div>
        <div>
          <Link to="/register">
            <button className="btn btn-outline-warning col-12 my-4">
              Crear cuenta
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
