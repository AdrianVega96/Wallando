import { store } from 'react-notifications-component';

const CestaProducto = (props) => {
    return (
        <div className="CestaProducto bg-white h-100">
            <div className="cart">
                <div className="cart-header p-3 "><b>Cesta <span className="badge bg-primary">{props.cesta.length}</span></b></div>
                <div className="cart-body">
                    {
                        props.cesta.map(producto => {
                            return (
                                <ItemProducto key={producto.id} producto={producto} eliminarProducto={props.eliminarProducto} masProducto={props.masProducto} menosProducto={props.menosProducto} />
                            )
                        })
                    }
                </div>
            </div>
            {
                (props.cesta.length > 0) ? <ResumenPedido cesta={props.cesta} /> : null
            }

        </div>
    )
}

const ItemProducto = (props) => {
    const producto = props.producto;
    const onMenos = (e) => {
        props.menosProducto(producto);
    }
    const onMas = (e) => props.masProducto(producto);
    const onEliminar = (e) => {
        props.eliminarProducto(producto);
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
    }
    return (
        <div key={producto.id} className="cest-item">
            <img src={producto.foto} alt={producto.nombre} className="img-fluid w-100" />
            <div className="producto-nombre">{producto.nombre}</div>
            <div className="precio">{producto.precioEuros} &euro;</div>
            <div className="producto-control">
                <div className="input-group">
                    <button onClick={e => onMenos(e)} className="producto-mas btn btn-outline-secondary " type="button" id="button-addon1"><i class="fas fa-minus"></i></button>
                    <input value={producto.cantidad} type="text" name="producto-cantidad" id="producto-cantidad" disabled />
                    <button onClick={e => onMas(e)} className="producto-menos btn btn-outline-secondary " type="button" id="button-addon1"><i class="fas fa-plus"></i></button>
                </div>
                <button onClick={e => onEliminar(e)} type="button" className="btn-close" aria-label="Close"></button>
            </div>
        </div>
    )
}

const ResumenPedido = (props) => {
    let suma = 0;
    return (
        <div className="ResumenPedido">
            {
                props.cesta.map(producto => {
                    suma += producto.precioEuros * producto.cantidad;
                    return (
                        <div className="precio-cantidad">{producto.cantidad} x {producto.precioEuros}&euro;</div>
                    )
                })
            }
            <div className="precio-total"><span className="texto">Total</span> <span className="total">{suma}&euro;</span></div>
            <button type="button" className="btn btn-primary">Realizar Pedido</button>
        </div>
    )
}

export default CestaProducto;
