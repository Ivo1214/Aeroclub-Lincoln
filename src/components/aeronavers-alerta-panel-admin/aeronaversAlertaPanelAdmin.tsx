import "./aeronaversAlertaPanelAdmin.css";
import { apiAeronaves } from "../../services/apiAeronaves";
import { useEffect, useState } from "react";
import imagen from "../../assets/images/banner.png";

export function AeronaversAlertaPanelAdmin() {
  const [aeronavesElements, setAeronavesElements] = useState<JSX.Element[]>([]);

  async function fetchAeronaves() {
    const aeronaves = await apiAeronaves.get();
    const elements = 
      <div className="mostrarAeronavesContainer">
        {aeronaves.map((aeronave: any) => (
          <article key={aeronave.id_aeronaves} id="tarjetaAeronave">
              <div className="nombreAeronave" >
                <img src={imagen} alt="" />
                <div>
                    <h2>{aeronave.modelo}</h2>
                    <p>{aeronave.matricula}</p>
                </div>
                <div className="estado">
                  <h4 style={{ backgroundColor: backgroundColor(aeronave.estados_aeronaves_id) }}>{estado(aeronave.estados_aeronaves_id)}</h4>
                </div>
              </div>
            </article>
          
          ))}
    </div>
    

    setAeronavesElements(elements);
  }

  function estado(estadoId: number) {
    switch (estadoId) {
      case 1:
        return "Habilitado";
      case 2:
        return "Deshabilitado";
      case 3:
        return "En mantenimiento";
      case 4:
        return "Fuera de servicio";
      default:
        return "Desconocido";
    }
  }

  function backgroundColor(estadoId: number) {
    switch (estadoId) {
      case 1:
        return "var(--verdeSemaforo)"; // Verde para "Habilitado"
      case 2:
        return "var(--rojoSemaforo)"; // Rojo para "Deshabilitado"
      case 3:
        return "var(--amarilloSemaforo)"; // Amarillo para "En mantenimiento"
      case 4:
        return "var(--gris)"; // Gris para "Fuera de servicio"
      default:
        return "var(--gris)"; // Gris para "Desconocido"
    }
  }

  useEffect(() => {
    fetchAeronaves();
  }, []);

  return (
    <div className="alertaAeronavesContainer">
      {aeronavesElements}
    </div>
  );
}
