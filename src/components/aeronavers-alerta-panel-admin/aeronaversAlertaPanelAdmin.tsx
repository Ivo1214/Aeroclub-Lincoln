import "./aeronaversAlertaPanelAdmin.css";
import { Aeronaves } from "../../types";

interface Prop1 {
  aeronaves: Aeronaves[];
}

interface Prop2 {
  aeronave: Aeronaves;
}

function AlertaPorAeronave({ aeronave }: Prop2) {
  return (
    <div
      className="alertPorAeronaveContainer"
      style={
        aeronave.alerta == "ok"
          ? { backgroundColor: "var(--verdeSemaforo)" }
          : aeronave.alerta == "advertencia"
          ? { backgroundColor: "var(--amarilloSemaforo)" }
          : { backgroundColor: "var(--rojoSemaforo)" }
      }
    >
      <p className="alertPorAeronaveModelo">{aeronave.modelo}</p>
      <p className="alertPorAeronavePatente">{aeronave.patente}</p>
    </div>
  );
}

function AeronaversAlertaPanelAdmin({ aeronaves }: Prop1) {
  return (
    <div className="alertaAeronavesContainer">
      <h3 className="alrtaAeronavesTitle">Aeronaves</h3>

      <div className="alertsContainer">
        {aeronaves ? (
          aeronaves.map((aeronave) => {
            return (
              <AlertaPorAeronave
                key={aeronave.patente}
                aeronave={aeronave}
              ></AlertaPorAeronave>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export { AeronaversAlertaPanelAdmin };
