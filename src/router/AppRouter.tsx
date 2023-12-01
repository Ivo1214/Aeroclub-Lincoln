import { Route, Routes } from "react-router-dom";
import Inicio from "../pages/inicio/Inicio";
import { Layout } from "../components/layout/Layout";
import PanelAdministradores from "../pages/panel-administradores/PanelAdministradores";
import AdminAdministrarUsuarios from "../pages/admin-administrar-usuarios/AdminAdministrarUsuarios";
import AdminEditarUsuarios from "../pages/admin-editar-usuarios/AdminEditarUsuarios";
import AdminDetallesAsociados from "../pages/admin-detalles-asociados/AdminDetallesAsociados";
import PanelAsociados from "../pages/panel-asociados/PanelAsociados";
import FormEditUsuario from "../components/form-edit-usuario/FormEditUsuario";
import CargarUsuario from "../components/cargar-usuario/CargarUsuario";
import AdminVerRecibos from "../pages/admin-ver-recibos-vuelos/AdminVerRecibos";
import Prueba from "../Prueba";
import AdminCargarRecibo from "../pages/admin-cargar-recibo/AdminCargarRecibo";
import AdminRegistrarPago from "../pages/admin-registrar-pago/AdminRegistrarPago";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />}></Route>
          <Route
            path="panel-administrador"
            element={<PanelAdministradores />}
          />
          <Route
            path="admin-administrar-usuarios"
            element={<AdminAdministrarUsuarios />}
          />
          <Route
            path="admin-editar-usuarios"
            element={<AdminEditarUsuarios />}
          />
          <Route path="panel-asociado" element={<PanelAsociados />} />
          <Route
            path="/admin-ver-recibos-vuelos"
            element={<AdminVerRecibos />}
          ></Route>
          <Route
            path="/admin-cargar-recibos"
            element={<AdminCargarRecibo />}
          ></Route>
          <Route
            path="/admin-registrar-pago"
            element={<AdminRegistrarPago />}
          ></Route>
          <Route path="/cargar-usuario" element={<CargarUsuario />}></Route>
          <Route path="/prueba" element={<Prueba />}></Route>
        </Route>
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </>
  );
};

//<Route path="sign-in" element={<SignIn />} />
