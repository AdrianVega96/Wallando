import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
// import Main from "./components/layout/Main";
import SideNav from "./components/layout/SideNav";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import FiltroProducto from "./components/producto/FiltroProducto";
import ListaProducto from "./components/producto/ListaProducto";
import ProductoID from "./components/producto/ProductoID";
import CestaProducto from "./components/producto/CestaProducto";
import Profile from "./components/usuario/Profile";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import ListaPedidos from "./components/pedidos/ListaPedidos";

function App() {
  // Productos
  const [listaProductos, setlistaProductos] = useState([]);
  // Filtros productos
  const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);
  const [categoria, setCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [ordenar, setOrdenar] = useState("");
  // Cesta
  const walandoStorage = window.localStorage;
  const [cesta, setCesta] = useState((walandoStorage.productos) ? JSON.parse(walandoStorage.productos) : []);
  const [cestaTotal, setCestaTotal] = useState(0);
  // Usuarios
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState("");
  const [userToken, setUserToken] = useState("");

  const handleUser = (token, user) => {
    setUserToken(token);
    setUserData(user);
    setIsLogged(true);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userData: user, token: token })
    );
  };

  const handleLogout = () => {
    setUserToken("");
    setUserData("");
    setIsLogged(false);
    localStorage.removeItem("userData");
  };

  const filtrarProductos = (buscar) => {
    buscar = buscar.toLowerCase();
    let productoFiltrado = listaProductos.filter((item) => {
      return (
        item.nombre.toLowerCase().startsWith(buscar) &&
        item.categoria.includes(categoria)
      );
    });
    if (productoFiltrado.length > 0) {
      ordenarProductos(ordenar, [...productoFiltrado]);
    } else {
      setProductosFiltrados([...productoFiltrado]);
    }
    setBusqueda(buscar);
  };
  const ordenarProductos = (orden, listaP) => {
    let productoOrdenado = listaP.length === 0 ? [...listaProductos] : listaP;
    switch (orden) {
      case "ascendente":
        productoOrdenado = productoOrdenado.sort(
          (primerP, segundoP) => primerP.precioEuros - segundoP.precioEuros
        );
        break;
      case "descendente":
        productoOrdenado = productoOrdenado.sort(
          (primerP, segundoP) => segundoP.precioEuros - primerP.precioEuros
        );
        break;
      default:
        break;
    }
    setProductosFiltrados([...productoOrdenado]);
  };

  const getAllProducts = async () => {
    await axios
      .get("http://localhost:5000/shop/products/all")
      .then((datos) => {
        setlistaProductos(datos.data.products);
        setProductosFiltrados(datos.data.products);
      })
      .catch((error) => console.log(error));
  };
  // controladores de cesta
  const guardarCesta = () => {
    let actualizarCesta = [...cesta]
    walandoStorage.setItem("productos", JSON.stringify(actualizarCesta));
  }

  const eliminarProducto = (producto) => {
    const existe = cesta.find((p) => p._id === producto._id);
    if (existe) {
      setCesta(cesta.filter((p) => p._id !== producto._id));
    } else {
      console.error("Producto no exite");
    }
  };

  const menosProducto = (producto) => {
    const existe = cesta.find((p) => p._id === producto._id);
    if (existe.cantidad === 1) {
      setCesta(cesta.filter((p) => p._id !== producto._id));
      store.addNotification({
        title: "Carrito",
        message: "Has eliminado " + producto.nombre + "del carrito",
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
    } else {
      setCesta(cesta.map((p) => {
        return p._id === producto._id ? { ...existe, cantidad: existe.cantidad - 1 } : p
      }));
    }
  };

  const masProducto = (producto) => {
    const existe = cesta.find((p) => p._id === producto._id);
    if (existe) {
      setCesta(cesta.map((p) => {
        return (p._id === producto._id) ? { ...existe, cantidad: existe.cantidad + 1 } : p
      }));
    } else {
      setCesta([...cesta, { ...producto, cantidad: 1 }]);
    }
  };

  useEffect(() => getAllProducts(), []);
  useEffect(() => filtrarProductos(busqueda), [categoria, busqueda]);
  useEffect(() => {
    guardarCesta();
    setCestaTotal(cesta.length);
  }, [masProducto, eliminarProducto, menosProducto])
  useEffect(() => {
    const recoverData = JSON.parse(localStorage.getItem("userData"));
    if (recoverData && recoverData.token) {
      setUserToken(recoverData.token);
      setUserData(recoverData.userData);
      setIsLogged(true);
    }
  }, [])  
  return (
    <div className="App">
      <Router>
        <Header isLogged={isLogged} userData={userData} cestaTotal={cestaTotal} />
        <ReactNotification />
        <SideNav setCategoria={setCategoria} categoria={categoria} />
        <Switch>
          <Route path="/home" exact>
            <div className="filtro-producto h-100">
              <FiltroProducto
                filtrarProductos={filtrarProductos}
                ordenarProductos={ordenarProductos}
                setOrdenar={setOrdenar}
                ordenar={ordenar}
              />
              <ListaProducto productos={productosFiltrados} />
            </div>
          </Route>
          <Route path="/producto/:pid">
            <ProductoID productos={listaProductos} masProducto={masProducto} />
          </Route>
          <Route path="/login">
            <Login handleUser={handleUser} />
          </Route>
          <Route path="/register">
            <Register handleUser={handleUser} />
          </Route>
          <Route path='/cesta' >
            <CestaProducto cesta={cesta} eliminarProducto={eliminarProducto} masProducto={masProducto} menosProducto={menosProducto} />
          </Route>
          <Route path="/profile">
            <Profile handleLogout={handleLogout} userData={userData} userToken={userToken} />
          </Route>
          <Route path="/pedidos">
            <ListaPedidos />
          </Route>
          <Redirect to="/home"></Redirect>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
