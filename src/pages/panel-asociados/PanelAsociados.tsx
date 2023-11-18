import "./PanelAsociados.css";
import TablaTurnosPanelAsociados from "../../components/tablaTurnosPanelAsociados/TablaTurnosPanelAsociados";
import { CardClima } from "../../components/card-clima/CardClima";
import CondicionPista from "../../components/condicion-pista/CondicionPista";
import TarifaActual from "../../components/card-tarifa-actual/TarifaActual";
import SaldoActual from "../../components/card-saldo-actual/SaldoActual";
import VencimientoCMA from "../../components/card-vencimiento-cma/VencimientoCMA";
import VencimientoCuota from "../../components/card-vencimiento-cuota/VencimientoCuota";

function PanelAsociados() {

  return (
    <div className="panelAsociadoContainer">
      <div className="panelAsociadoColorClima">
        <div className="panelAsociadoContainerClima">
          <div className="panelAdminContainerCardClima">
            <CardClima></CardClima>
          </div>
          <CondicionPista/>
        </div>
      </div>
      
      <div className="filaPanelAsociado"> 
        <VencimientoCuota></VencimientoCuota>
        <VencimientoCMA></VencimientoCMA>
      </div>
      <div className="colorFilaPanelAsociado">
        <div className="filaPanelAsociado">
          <VencimientoCuota></VencimientoCuota>
          <VencimientoCMA></VencimientoCMA>
        </div>
      </div>
      
      <div className="colorTablaPanelAsociado">
        <div className="TablaTurnos">
          <TablaTurnosPanelAsociados />
        </div>
      </div>

      <div className="colorFilaPanelAsociado">
        <div className="filaPanelAsociado">
          <TarifaActual></TarifaActual>
          <SaldoActual></SaldoActual>
        </div>
      </div>
    </div>
  );
}

export default PanelAsociados;
