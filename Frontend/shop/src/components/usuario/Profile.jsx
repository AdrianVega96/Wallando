import React from 'react'
import "./Profile.css";
import { useHistory } from 'react-router';
import { useEffect } from 'react';

const Profile = (props) => {
    const handleLogout = props.handleLogout;
    const userData = props.userData;
    const userToken = props.userToken;
    const history = useHistory();
    const logout = () => {
        handleLogout();
        history.push("/");
    }

    useEffect(() => {
        const recoverData = JSON.parse(localStorage.getItem("userData"));
        if (!recoverData) {
            history.push("/");
        }
    }, []);
    return (
        <div className="Profile">
            <button onClick={logout}>Desconectarse</button>
        </div>
    )
}

export default Profile
