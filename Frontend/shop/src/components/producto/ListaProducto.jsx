import "./Producto.css";
import { Link } from "react-router-dom";

const ListaProducto = (props) => {
  return (
    <div className="ListaProducto">
      {props.productos.length > 0 ? (
        props.productos.map((pItem) => {
          return (
            <Link
              className="card deck"
              key={pItem._id}
              to={"/producto/" + pItem._id}
            >
              <img
                src={pItem.foto}
                className="d-block user-select-none"
                alt={pItem.nombre}
              />
              <div className="card-body">
                <h6 className="card-title">{pItem.nombre}</h6>
              </div>
              <div className="card-footer ">
                <h5 className="card-subtitle">{pItem.precioEuros}&euro;</h5>
              </div>
            </Link>
          );
        })
      ) : (
        <h6 className="producto-not-found">
          No ha encontrado el producto de la busqueda
        </h6>
      )}
    </div>
  );
};

export default ListaProducto;
