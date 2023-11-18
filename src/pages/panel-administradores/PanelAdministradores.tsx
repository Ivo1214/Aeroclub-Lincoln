import "./PanelAdministradores.css";
import TablaAsociadosPanelAdmin from "../../components/tablaAsociadosPaneAdmin/TablaAsociadosPaneAdmin";
import { useTablaAsociadosPanelAdmin } from "../../hooks/useTablaAsociadosPanelAdmin";
import { AeronaversAlertaPanelAdmin } from "../../components/aeronavers-alerta-panel-admin/aeronaversAlertaPanelAdmin";
import { aeronaves } from "../../mock/aeronaves";
import { CardClima } from "../../components/card-clima/CardClima";
import CondicionPista from "../../components/condicion-pista/CondicionPista";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function PanelAdministradores() {
  const navigate = useNavigate();

  return (
    <div className="panelAdminContainer">
      <div className="panelAdminColorClima">
        <div className="panelAdminContainerClima">
          <div className="panelAdminContainerCardClima">
            <CardClima></CardClima>
          </div>
          <CondicionPista/>
        </div>
      </div>

      <div className="panelAdminColorTablaAsociados">
        <h1 className="panelAdminTitle">Asociados</h1>
        <div className="tablaAdmin">
          <TablaAsociadosPanelAdmin/>
        </div>
        <Button onClick={() => {
              navigate("/cargar-usuario", { replace: true });
            }} size="large">Cargar asociado</Button>
      </div>

      <div className="panelAdminColorAeronaves">
        <AeronaversAlertaPanelAdmin
          aeronaves={aeronaves}
        ></AeronaversAlertaPanelAdmin>
      </div>
    </div>
  );
}

export default PanelAdministradores;
