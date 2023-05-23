import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


/* layouts */
import Header from "./components/layouts/Header";
import Navegacion from "./components/layouts/Navegacion";
import Clientes from "./components/clientes/Clientes";
import Productos from "./components/productos/Productos";
import Pedidos from "./components/pedidos/Pedidos";
import NuevoCliente from "./components/clientes/NuevoCliente";
import EditarCliente from './components/clientes/EditarCliente';
import EditarProducto from './components/productos/EditarProducto';
import NuevoProducto from './components/productos/NuevoProducto';
import NuevoPedido from './components/pedidos/NuevoPedido';

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
          <div className="grid contenedor contenido-principal">
            <Navegacion/>
              <main className="caja-contenido col-9">
                <Routes>{/** Routes reemplaza a switch en la V 6.0 de react, ver: ya no se usa Switch*/}
                  <Route exact path="/clientes" Component={Clientes} />
                  <Route exact path="/productos" Component={Productos} />
                  <Route exact path="/clientes/nuevo" Component={NuevoCliente} />
                  <Route exact path="/clientes/editar/:id" Component={EditarCliente} />
                  <Route exact path="/productos/editar/:id" Component={EditarProducto} />
                  <Route exact path="/productos" Component={Productos} />
                  <Route exact path="/productos/nuevo" Component={NuevoProducto} />
                  <Route exact path="/pedidos" Component={Pedidos} />
                  <Route exact path="/pedidos/nuevo/:id" Component={NuevoPedido} />
                </Routes>
              </main>
          </div>
      </Fragment>
    </Router>
  )
}

export default App;
