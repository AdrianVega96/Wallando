import { useState } from "react";

const FiltroProducto = (props) => {
  const [name, setName] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
    props.filtrarProductos(e.target.value);
  };
  const handleOrdenar = async (e) => {
    props.setOrdenar(e.target.value);
    props.ordenarProductos(e.target.value, []);
  };
  return (
    <div className="FiltroProducto">
      <form action="">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Producto
          </label>
          <input
            value={name}
            onChange={(e) => handleName(e)}
            type="search"
            name="name"
            id="name"
            placeholder="Buscar"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="orden" className="form-label mt-4">
            Ordenar
          </label>
          <select
            value={props.ordenar}
            onChange={(e) => handleOrdenar(e)}
            className="form-select"
            id="orden"
          >
            <option value="">Seleccionar</option>
            <option value="ascendente">Precio ascendente</option>
            <option value="descendente">Precio descendente</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default FiltroProducto;
