import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import clienteAxios from "../../config/axios";

function Cliente(props){
    const  { _id, nombre, apellido, empresa, email, telefono } = props.cliente;

    const eliminarCliente = (id) => {
        Swal.fire({
            title: 'Estas seguro de eliminar el registro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/clientes/${id}`).then(res => {
                    if(res.data.ok){
                        Swal.fire(
                            'Eliminado!',
                            res.data.mensaje,
                            'success'
                          )
                    }else{
                        console.log(res.data.error);
                    }
                });
              
            }
          })
    }

    return(
        <li className="cliente">
                    <div className="info-cliente">
                        <p className="nombre">{nombre} {apellido}</p>
                        <p className="empresa">{empresa}</p>
                        <p>{email}</p>
                        <p>Tel: {telefono}</p>
                    </div>
                    <div className="acciones">
                        <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Cliente
                        </Link>
                        <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
                            <i className="fas fa-plus"></i>
                            Nuevo Pedido
                        </Link>
                        <button type="button" 
                                className="btn btn-rojo btn-eliminar"
                        /* Se coloca el () => para pasar el id sin tener que ejecutarse inmediatamente la funcion eliminarCliente() */
                                onClick={() => eliminarCliente(_id)}
                        >
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
        </li>
    )
}

export default Cliente;