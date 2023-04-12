import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Cliente from '../clientes/Cliente';

//importar clienteAxios

import clienteAxios from '../../config/axios';

function Clientes() {

    //trabajar con el state
    //clientes = state, guardarClientes = funcion para guardar en el state
    const [clientes, guardarClientes] = useState([]);

    const consultarApi = async () => {
        const consultaClientes = await clienteAxios.get('/clientes');
        guardarClientes(consultaClientes.data.clientes);
    }

    useEffect(() => {
        consultarApi();
    }, [clientes]);

    return (
        <Fragment>
            <h2>Clientes</h2>
            <Link to="/clientes/nuevo" className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>
            <ul className="listado-clientes">
                {clientes.map(cliente => ( /* se itera cada cliente con el map */
                    <Cliente
                        key={cliente._id}
                        cliente={cliente}
                    />
                ))}
            </ul>
        </Fragment>

    )
}

export default Clientes;