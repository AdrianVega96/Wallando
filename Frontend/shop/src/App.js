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
import Profile from "./components/usuario/Profile";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // Productos
  const [listaProductos, setlistaProductos] = useState([]);
  // Filtros productos
  const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);
  const [categoria, setCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [ordenar, setOrdenar] = useState("");
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

  useEffect(() => getAllProducts(), []);
  useEffect(() => filtrarProductos(busqueda), [categoria, busqueda]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.token) {
      setUserToken(userData.token);
      setUserData(userData.userData);
      setIsLogged(true);
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Header isLogged={isLogged} userData={userData} />
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
            <ProductoID productos={listaProductos} />
          </Route>
          <Route path="/login">
            <Login handleUser={handleUser} />
          </Route>
          <Route path="/register">
            <Register handleUser={handleUser} />
          </Route>
          <Route path="/profile">
            <Profile handleLogout={handleLogout} userData={userData} userToken={userToken} />
          </Route>
          <Redirect to="/home"></Redirect>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
