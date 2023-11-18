import "./AdminEditarUsuarios.css";
import FormEditUsuario from "../../components/form-edit-usuario/FormEditUsuario";
import { useLocation } from "react-router-dom";

function AdminEditarUsuarios(props:any) {
  // Recibo los datos del asociado y los asigno a una variable
  const location = useLocation();
  const datosAsociado = location.state?.asociado;

  // La forma de enviar datos a este componente es:
  // El prop es "asociado" y datosAsociado los datos a enviar
  // navigate("/admin-editar-usuarios", { state: { asociado: datosAsociado }, replace: true });
 
  return (
    <div className="panelAdminContainer">
      <h1 className="panelAdminTitle">Editar Usuario</h1>
      <FormEditUsuario datosAsociado={datosAsociado}></FormEditUsuario>
    </div>
  );
}

export default AdminEditarUsuarios;
