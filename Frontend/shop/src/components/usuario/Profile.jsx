import React from 'react'
import "./Profile.css";
import { useHistory } from 'react-router';

const Profile = (props) => {
    const handleLogout = props.handleLogout;
    const history = useHistory();
    const logout = () => {
        handleLogout();
        history.push("/");
    }
    return (
        <div className="Profile">
            <button onClick={logout}>Desconectarse</button>
        </div>
    )
}

export default Profile
