import { Fragment, useState } from "react";
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom';

import clienteAxios from "../../config/axios";


//funcion nuevoCliente = componente en react
function NuevoCliente() {

    //creamos el routing para navegar a otra pagina "useNavigate()"
    //ver: debe estar declarado dentro del componente NuevoCliente(), fuera de las demas declaracines "actualizarState, nuevoCliente etc"
    const navigate = useNavigate();


    //cliente = state, guardarCliente = funcion para guardar el state
    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    //funcion para leer los datos del formulario
    const actualizarState = (e) => {
        //almacenar lo que el usuario escribe en el state
        guardarCliente({
            //obtener una copia del state actual
            //ver: ...cliente
            ...cliente,
            [e.target.name]: e.target.value
        })
    }
    
    //añade un nuevo cliente al servidor Rest Api
    const nuevoCliente = (e) => {
        e.preventDefault();

        clienteAxios.post('/clientes', cliente).then(res => {
            if (res.data.code == 11000) {
                Swal.fire({
                    title: 'Sevidor Remoto',
                    text: 'Cliente ya está registrado',
                    icon: 'error'
                });
            } else {
                Swal.fire({
                    title: 'Sevidor Remoto',
                    text: res.data.mensaje,
                    icon: 'success'
                });

            }
            //redireccionar
            navigate('/clientes', {replace: true});
        });
    }


    const validarCliente = () => {
        const { nombre, apellido, empresa, email, telefono } = cliente;

        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        return valido;
    }

    return (
        <Fragment>
            <h2>Nuevo Cliente</h2>
            <form
                onSubmit={nuevoCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text"
                        placeholder="Empresa Cliente"
                        name="empresa"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                        placeholder="Email Cliente"
                        name="email"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel"
                        placeholder="Teléfono Cliente"
                        name="telefono"
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input type="submit"
                        className="btn btn-azul"
                        value="Agregar Cliente"
                        disabled={validarCliente()}
                    />
                </div>

            </form>
        </Fragment>
    )
}

//HOC, es una funcion que toma un componente y retorna un nuevo componente
export default NuevoCliente;