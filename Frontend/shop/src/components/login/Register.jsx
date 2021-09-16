import React from "react";
import "./Register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";

const Register = (props) => {
  const history = useHistory();
  const handleUser = props.handleUser;
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRepeatedPassword, setNewRepeatedPassword] = useState("");
  const [checkConditions, setCheckConditions] = useState(false);

  const [showPass, setShowPass] = useState("password");
  const [showRepeatedPass, setShowRepeatedPass] = useState("password");

  const [emailExists, setEmailExists] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [checkError, setCheckError] = useState(false);

  const showPassword = function () {
    if (showPass === "text") {
      setShowPass("password");
    } else {
      setShowPass("text");
    }
  };

  const showRepeatedPassword = function () {
    if (showRepeatedPass === "text") {
      setShowRepeatedPass("password");
    } else {
      setShowRepeatedPass("text");
    }
  };

  const manageNewName = function (event) {
    setNewName(event.target.value);
  };

  const manageNewEmail = function (event) {
    setNewEmail(event.target.value);
  };

  const manageNewPassword = function (event) {
    setNewPassword(event.target.value);
  };

  const manageNewRepeatedPassword = function (event) {
    setNewRepeatedPassword(event.target.value);
  };

  const manageConditions = function (event) {
    setCheckConditions(event.target.checked);
  };

  const addClient = function (event) {
    event.preventDefault();
    setEmailExists(false);
    setPasswordError(false);
    setEmptyFields(false);
    setCheckError(false);
    if (newPassword === "" || newEmail === "" || newName === "") {
      setEmptyFields(true);
      return null;
    }
    if (newPassword !== newRepeatedPassword) {
      setPasswordError(true);
      return null;
    }
    if (checkConditions === false) {
      setCheckError(true);
      return null;
    }
    const newClient = {
      password: newPassword,
      email: newEmail,
      nombre: newName,
    };
    manageRegister(newClient);
    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewRepeatedPassword("");
    setPasswordError(false);
    setEmailExists(false);
    setCheckConditions(false);
    history.push("/");
  };

  const manageRegister = async (newUser) => {
    await axios
      .post("http://localhost:5000/shop/users/register", newUser)
      .then((datos) => {
        handleUser(datos.data.token, {
          email: datos.data.email,
          userId: datos.data.userId,
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="Register container">
      <form className="bg-light container rounded my-3" onSubmit={addClient}>
        <h1>Registrarse</h1>
        <div>
          <button className="btn btn-outline-primary col-12 my-3">
            <i className="fab fa-google"></i> Entrar con Google
          </button>
        </div>
        <div className="divider d-flex align-items-center my-2">
          <p className="text-center fw-bold mx-3 mb-0">O</p>
        </div>
        <div className="form-group col-12 mb-2">
          <input
            type="text"
            name="register-name"
            id="register-name"
            placeholder="Nombre"
            className="form-control form-control-medium"
            value={newName}
            onChange={manageNewName}
          />
        </div>
        <div className="form-group col-12 mb-2">
          <input
            type="email"
            name="register-email"
            id="register-email"
            placeholder="E-mail"
            className="form-control form-control-medium"
            value={newEmail}
            onChange={manageNewEmail}
          />
          {emailExists ? (
            <p className="text-error">El e-mail introducido ya está en uso</p>
          ) : null}
        </div>
        <div className="input-group col-12 mb-2">
          <input
            type={showPass}
            name="register-pass"
            id="register-pass"
            placeholder="Contraseña"
            className="form-control form-control-medium"
            value={newPassword}
            onChange={manageNewPassword}
          />
          <div className="input-group-prepend">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={showPassword}
            >
              <i className="far fa-eye"></i>
            </button>
          </div>
        </div>
        <div className="input-group col-12 mb-2">
          <input
            type={showRepeatedPass}
            name="register-pass-repeat"
            id="register-pass-repeat"
            placeholder="Repetir contraseña"
            className="form-control form-control-medium"
            value={newRepeatedPassword}
            onChange={manageNewRepeatedPassword}
          />
          <div className="input-group-prepend">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={showRepeatedPassword}
            >
              <i className="far fa-eye"></i>
            </button>
          </div>
          {passwordError ? (
            <p className="text-error">
              Las contraseñas introducidas no coinciden
            </p>
          ) : null}
        </div>
        {emptyFields ? (
          <p className="text-error">No puede dejar campos en blanco</p>
        ) : null}
        <div className="form-group col-12 mb-3">
          <input
            type="checkbox"
            name="conditions"
            id="conditions"
            className="form-check-input"
            onChange={manageConditions}
          />
          <label htmlFor="conditions" className="mx-2">
            He leido y acepto la política de privacidad
          </label>
        </div>
        {checkError ? (
          <p className="text-error">
            Debe aceptar los términos y condiciones para poder registrarse
          </p>
        ) : null}
        <div>
          <button className="btn btn-primary col-12 my-2">Crear cuenta</button>
        </div>
        <div className="divider d-flex align-items-center">
          <p className="text-center fw-bold mx-3 mb-0">Ya tengo una cuenta</p>
        </div>
        <div>
          <Link to="/login">
            <button className="btn btn-outline-warning col-12 my-2">
              Iniciar sesión
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
