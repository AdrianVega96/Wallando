import { store } from 'react-notifications-component';
import axios from "axios";

const CestaProducto = (props) => {
    const userData = props.userData;
    const userToken = props.userToken;
    // Esto lo he puesto buscando una manera de poder tener el precio total que muestras en resumen de pedido
    // puesto que se necesita para hacer el post del pedido.
    // let total;
    // const getTotal = (suma) => {
    //     total = suma;
    // }
    const prepararPedido = () => {
        let suma = 0;
        const productos = props.cesta.map(producto => {
            suma += producto.precioEuros * producto.cantidad;
            return { producto: producto._id, cantidad: producto.cantidad };
        });
        return {
            productos: productos,
            usuario: userData.userId,
            precioTotal: suma
        };
    }

    const hacerPedido = async (pedido) => {
        if (userData.userId !== undefined) {
            await axios
                .post("http://localhost:5000/shop/orders/", pedido, {
                    headers: {
                        Authorization: "Bearer " + userToken,
                    },
                })
                .then((datos) => {
                    props.limpiarCesta();
                    notificarPedidoRealizado();
                })
                .catch((error) => "No se ha podido realizar el pedido");
        } else {
            notificarUsuarioNotLogged();
        }
    }
    const notificarPedidoRealizado = () => {
        store.addNotification({
            title: "Pedido",
            message: "Pedido realizado",
            type: "success",
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
    const notificarUsuarioNotLogged = () => {
        store.addNotification({
            title: "Usario no esta Logueado",
            message: "Por favor hacer login para poder realizar el pedido",
            type: "warning",
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
                (props.cesta.length > 0) ? <ResumenPedido cesta={props.cesta} prepararPedido={prepararPedido} hacerPedido={hacerPedido}/> : null
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
    const handleOrder = (e) => {
        e.preventDefault();
        const pedido = props.prepararPedido();
        props.hacerPedido(pedido);
    }
    return (
        <div className="ResumenPedido">
            {
                props.cesta.map(producto => {
                    suma += producto.precioEuros * producto.cantidad;
                    return (
                        <div key={producto._id} className="precio-cantidad">{producto.cantidad} x {producto.precioEuros}&euro;</div>
                    )
                })
            }
            <div className="precio-total"><span className="texto">Total</span> <span className="total">{suma}&euro;</span></div>
            <button onClick={e => handleOrder(e)} type="button" className="btn btn-primary">Realizar Pedido</button>
        </div>
    )
}

export default CestaProducto;
