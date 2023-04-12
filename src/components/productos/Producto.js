import { Fragment } from "react";
import { Link } from "react-router-dom";


function Producto(props){
    
    const {_id, nombre, precio, imagen} = props.producto;
    return (
        <Fragment>
            <ul className="listado-productos">
                <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">{nombre}</p>
                        <p className="precio">{precio} </p>
                        <img src={`img/${imagen}`}/>
                    </div>
                    <div className="acciones">
                        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </Link>

                        <button type="button" className="btn btn-rojo btn-eliminar">
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
            </ul>
        </Fragment>
    )
}

export default Producto;