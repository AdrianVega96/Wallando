import { useParams /*, useRouteMatch */ } from "react-router-dom";

const ProductoID = (props) => {
  let { pid } = useParams();
  const producto = props.productos.find((pItem) => {
    return pItem._id === pid;
  });
  // console.log(producto, pid, props.productos);

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
        <button type="button" className="btn btn-primary">
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductoID;
