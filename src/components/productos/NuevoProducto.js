import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import clienteAxios from "../../config/axios";

function NuevoProducto() {

    const navigate = useNavigate();
    //producto = state, guardarProducto = setState

    const [producto, guardarProducto] = useState({
        nombre:'',
        precio:''
    });

    //archivo = state, guardarArchivo = setState()
    const [archivo, guardarArchivo] = useState('');


    //almacena el nuevo producto en la base de datos de datos
    const agregarProducto = async e => {
        e.preventDefault();
        //crear formdata
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        //almacena en la BD
        try {
            const res = await clienteAxios.post('/productos', formData, {
                headers: { 'Content-Type': 'multipart/form-data'}
            });
            
            //lanzar una alerta
            if(res.status == 200){
                Swal.fire({
                    icon: 'success',
                    title:'Nuevo Producto',
                    text: res.data.mensaje
                })
            }
            navigate('/productos');
        } catch (error) {
            console.log(error);
            
        }
    }

    //leer los datos del formulario
    const leerInformacionProducto = (e) =>{
        guardarProducto({
            //obtiene una copia del state y agrega uno nuevo
            ...producto,
            [e.target.name] : e.target.value
        });
    }

    //coloca la imagen en el state
    const lerrArchivo = (e) =>{
        guardarArchivo(e.target.files[0]);
    }


    return (
        <Fragment>
            <h2>Nuevo Producto</h2>

            <form
                onSubmit={agregarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="nombre"
                        onChange={leerInformacionProducto} 
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        name="precio" 
                        min="0.00" 
                        step="1" 
                        placeholder="Precio"
                        onChange={leerInformacionProducto} 
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input 
                        type="file" 
                        name="imagen"
                        onChange={lerrArchivo} 
                    />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto" />
                </div>
            </form>
        </Fragment>
    )
}

export default NuevoProducto;