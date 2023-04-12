import { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {useNavigate, useParams} from 'react-router-dom';

import clienteAxios from "../../config/axios";


//funcion editarCliente = componente en react
function EditarCliente() {

    //obtenemos el id con ayuda del useParams();
    const {id} = useParams();

    //creamos el routing para navegar a otra pagina "useNavigate()"
    //ver: debe estar declarado dentro del componente NuevoCliente(), fuera de las demas declaracines "actualizarState, nuevoCliente etc"
    const navigate = useNavigate();

    //cliente = state, guardarCliente = funcion para guardar el state
    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    const consultarApi = async () => {
        const consultaCliente = await clienteAxios.get(`/clientes/${id}`);
        datosCliente(consultaCliente.data.cliente);
    }

    //se ejecuta cuando se carga el componente ver: EditarCliente()
    useEffect( () => {
        consultarApi();
    }, []);


    //funcion para leer los datos del formulario
    const actualizarState = (e) => {
        //almacenar lo que el usuario escribe en el state
        datosCliente({
            //obtener una copia del state actual
            //ver: ...cliente
            ...cliente,
            [e.target.name]: e.target.value
        })
    }
    

    const actualizarCliente = (e) => {
        e.preventDefault();

        clienteAxios.put(`/clientes/${cliente._id}`, cliente).then(res => {
            if (res.data.code == 11000) {
                Swal.fire({
                    title: 'Sevidor Remoto',
                    text: 'Error actualizando Cliente',
                    icon: 'error'
                });
            } else {
                Swal.fire({
                    title: 'Sevidor Remoto',
                    text: 'Cliente actualizado correctamente',
                    icon: 'success'
                });
            }

            //redireccionar
            navigate('/clientes', {replace:true})
        });
    }

    const validarCliente = () => {
        const { nombre, apellido, empresa, email, telefono } = cliente;

        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        return valido;
    }

    return (
        <Fragment>
            <h2>Editar Cliente</h2>
            <form
                onSubmit={actualizarCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        onChange={actualizarState}
                        value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"
                        onChange={actualizarState}
                        value={cliente.apellido}
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text"
                        placeholder="Empresa Cliente"
                        name="empresa"
                        onChange={actualizarState}
                        value={cliente.empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                        placeholder="Email Cliente"
                        name="email"
                        onChange={actualizarState}
                        value={cliente.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel"
                        placeholder="Teléfono Cliente"
                        name="telefono"
                        onChange={actualizarState}
                        value={cliente.telefono}
                    />
                </div>

                <div className="enviar">
                    <input type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={validarCliente()}
                    />
                </div>

            </form>
        </Fragment>
    )
}

//HOC, es una funcion que toma un componente y retorna un nuevo componente
export default EditarCliente;