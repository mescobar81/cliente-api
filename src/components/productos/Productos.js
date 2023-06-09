import React, { Fragment, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Producto from './Producto';
import Spinner from '../layouts/Spinner';


//componente
function Productos() {

    const [productos, guardarProductos] = useState([]);

    const listarProductos = async () =>{
        const productos = await clienteAxios.get(`/productos`);
        guardarProductos(productos.data.productos);
    }


    //se ejecuta cuando se carga el componente
    useEffect(() => {
        listarProductos();
    }, [productos]);


    //agregamos el spinner
    if(!productos.length){
        return  <Spinner/>;
    }

    return (
        <Fragment>
            <h2>Productos</h2>
            <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>
            {productos.map(p =>(
                <Producto
                    key={p._id}
                    producto={p}
                />
            ))}
        </Fragment>
    )
}

export default Productos;