import React from "react";
import "./Profile.css";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = (props) => {
  const handleLogout = props.handleLogout;
  const userData = props.userData;
  const userToken = props.userToken;
  const history = useHistory();
  const logout = () => {
    handleLogout();
    history.push("/");
  };

  useEffect(() => {
    const recoverData = JSON.parse(localStorage.getItem("userData"));
    if (!recoverData) {
      history.push("/");
    }
  }, []);
  return (
    <div className="Profile">
      <Link to="/pedidos">
        <button className="btn btn-primary btn-lg btn-block">
          Lista de pedidos
        </button>
      </Link>
      <button className="btn btn-danger" onClick={logout}>
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
  );
};

export default Profile;
