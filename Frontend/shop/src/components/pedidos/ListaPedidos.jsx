import React from 'react'
import "./ListaPedidos.css";
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

const ListaPedidos = (props) => {
    const history = useHistory();
    const userData = props.userData;
    const userToken = props.userToken;

    const getUserOrders = async () => {
        axios.get(`http://localhost:5000/shop/orders/user/${userData.userId}`);
    }

    useEffect(() => {
        if (userData===""){
            history.push("/");
        }
    }, []);
    return (
        <div className="ListaPedidos">
            
        </div>
    )
}

export default ListaPedidos
