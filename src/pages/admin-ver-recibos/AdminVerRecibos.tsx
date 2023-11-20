import "./AdminVerRecibos.css";
import TablaVerRecibos from "../../components/tabla-ver-recibos/TablaVerRecibos";
import FormRecibos from "../../components/form-cargar-recibo/FormRecibos";

function AdminVerRecibos() {

  return (
    <div className="panelAdminContainer">
      <h1 className="panelAdminTitle">Recibos</h1>
      {/* <TablaVerRecibos></TablaVerRecibos> */}
      <FormRecibos></FormRecibos>
    </div>
  );
}

export default AdminVerRecibos;
