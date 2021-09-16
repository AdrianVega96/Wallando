import { useParams /*, useRouteMatch */ } from "react-router-dom";
import { store } from 'react-notifications-component';

const ProductoID = (props) => {
  let { pid } = useParams();
  const producto = props.productos.find((pItem) => {
    return pItem._id === pid;
  });

  const handleAddProducto = (e) => {
    props.masProducto(producto);
    store.addNotification({
      title: "Carrito",
      message: "Has añadido " + producto.nombre + "al carrito",
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
  }
  return (
    <div className="ProductoID" key={producto._id}>
      <img
        src={producto.foto}
        alt={producto.nombre}
        className="img-fluid w-100"
      />
      <div className="producto-detalles">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <h4 className="text-primary">{producto.precioEuros} &euro;</h4>
        <button onClick={e => handleAddProducto(e)} type="button" className="btn btn-primary add-producto">
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductoID;
