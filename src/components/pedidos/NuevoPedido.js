import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";


function NuevoPedido() {

    const { id } = useParams();

    //colocar el cliente en el state
    const [cliente, guardarCliente] = useState({});
    const consultarApi = async () =>{

        const resultado = await clienteAxios.get(`/clientes/${id}`);
        console.log(resultado);
        guardarCliente(resultado.data.cliente);
    }

    useEffect( () => {
        consultarApi();
    }, []);
    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div class="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Telefono: {cliente.telefono}</p>
            </div>


            <form action="/productos" method="POST">
                <legend>Busca un Producto y agrega una cantidad</legend>

                <div class="campo">
                    <label>Productos:</label>
                    <input type="text" placeholder="Nombre Productos" name="productos" />
                </div>

                <ul class="resumen">
                    <li>
                        <div class="texto-producto">
                            <p class="nombre">Macbook Pro</p>
                            <p class="precio">$250</p>
                        </div>
                        <div class="acciones">
                            <div class="contenedor-cantidad">
                                <i class="fas fa-minus"></i>
                                <input type="text" name="cantidad" />
                                <i class="fas fa-plus"></i>
                            </div>
                            <button type="button" class="btn btn-rojo">
                                <i class="fas fa-minus-circle"></i>
                        Eliminar Producto
                </button>
                        </div>
                    </li>
                    <li>
                        <div class="texto-producto">
                            <p class="nombre">Macbook Pro</p>
                            <p class="precio">$250</p>
                        </div>
                        <div class="acciones">
                            <div class="contenedor-cantidad">
                                <i class="fas fa-minus"></i>
                                <input type="text" name="cantidad" />
                                <i class="fas fa-plus"></i>
                            </div>
                            <button type="button" class="btn btn-rojo">
                                <i class="fas fa-minus-circle"></i>
                        Eliminar Producto
                </button>
                        </div>
                    </li>
                    <li>
                        <div class="texto-producto">
                            <p class="nombre">Macbook Pro</p>
                            <p class="precio">$250</p>
                        </div>
                        <div class="acciones">
                            <div class="contenedor-cantidad">
                                <i class="fas fa-minus"></i>
                                <input type="text" name="cantidad" />
                                <i class="fas fa-plus"></i>
                            </div>
                            <button type="button" class="btn btn-rojo">
                                <i class="fas fa-minus-circle"></i>
                        Eliminar Producto
                </button>
                        </div>
                    </li>
                </ul>
                <div class="campo">
                    <label>Total:</label>
                    <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
                </div>
                <div class="enviar">
                    <input type="submit" class="btn btn-azul" value="Agregar Pedido" />
                </div>
            </form>
        </Fragment>
    )
}

export default NuevoPedido;