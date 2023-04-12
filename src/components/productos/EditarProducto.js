import { useParams } from "react-router-dom";


function EditarProducto(){

    const {id} = useParams();
    return (
        <h1>Editando Producto con ID: {id}</h1>
    )
}

export default EditarProducto;