import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Spinner from  '../layouts/Spinner';
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";


function EditarProducto() {

    //obtener el id
    const { id } = useParams();

    //guardar en el state
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    });

    const navigate = useNavigate();

    //archivo = state, guardarArchivo = setState()
    const [archivo, guardarArchivo] = useState('');

    //consultar a la api para traer el producto a editar
    const consultarApi = async () => {
        const productoConsulta = await clienteAxios.get(`/productos/${id}`);
    
        guardarProducto(productoConsulta.data.producto);
    }

    //cuando el componente carga
    useEffect(() => {
        consultarApi();
    }, []);

    const editarProducto = async e => {
        e.preventDefault();
        //crear formdata
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        //almacena en la BD
        try {
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data'}
            });
            
            //lanzar una alerta
            if(res.status == 200){
                Swal.fire({
                    icon: 'success',
                    title:'Producto Editado',
                    text: res.data.mensaje
                })
            }
            navigate('/productos');
        } catch (error) {
            console.log(error);
            
        }

    }

    //leer los datos del formulario
    const leerInformacionProducto = (e) => {
        guardarProducto({
            //obtiene una copia del state y agrega uno nuevo
            ...producto,
            [e.target.name]: e.target.value
        });
    }

    //coloca la imagen en el state
    const lerrArchivo = (e) => {
        guardarArchivo(e.target.files[0]);
    }

    //extrae los valores del state
    const {nombre, precio, imagen} = producto;

    if(!producto.nombre){
        return <Spinner/>
    }

    return (

        <Fragment>
            <h2>Editar Producto</h2>

            <form
                onSubmit={editarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Producto"
                        name="nombre"
                        onChange={leerInformacionProducto}
                        defaultValue={nombre}
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
                        defaultValue={precio}
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    {imagen ? (
                        <img src={`http://localhost:5000/${imagen}`} width="300"/>
                    ):null}
                    <input
                        type="file"
                        name="imagen"
                        onChange={lerrArchivo}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Editar Producto" />
                </div>
            </form>
        </Fragment>
    )
}

export default EditarProducto;