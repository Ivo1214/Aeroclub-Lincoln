import "./AdminVerRecibos.css";
import TablaVerRecibos from "../../components/tabla-ver-recibos/TablaVerRecibos";

function AdminVerRecibos() {

  return (
    <div className="panelAdminContainer">
      <h1 className="panelAdminTitle">Recibos</h1>
      <TablaVerRecibos></TablaVerRecibos>
    </div>
  );
}

export default AdminVerRecibos;
