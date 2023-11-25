import "./PanelAsociados.css";
import TablaTurnosPanelAsociados from "../../components/tablaTurnosPanelAsociados/TablaTurnosPanelAsociados";
import { CardClima } from "../../components/card-clima/CardClima";
import CondicionPista from "../../components/condicion-pista/CondicionPista";
import TarifaActual from "../../components/card-tarifa-actual/TarifaActual";
import SaldoActual from "../../components/card-saldo-actual/SaldoActual";
import VencimientoCMA from "../../components/card-vencimiento-cma/VencimientoCMA";
import VencimientoCuota from "../../components/card-vencimiento-cuota/VencimientoCuota";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resolverToken } from "../../api/apiCalls";

function PanelAsociados() {
  const navigate = useNavigate();

  async function checkTokenAndRol() {
    const getTokenLocal = await localStorage.getItem("token");

    if (getTokenLocal == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sin autorización, no tenes iniciada sesión",
      });
      navigate("/", { replace: true });
    }

    try {
      const resResolverToken = await resolverToken();

      if (resResolverToken.success) {
        const roles = resResolverToken.dataToken.roles;

        if (!roles.includes("Asociado")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario no posee el rol de Asociado para acceder",
          });

          navigate("/", { replace: true });
        } else {
          console.log(resResolverToken.dataToken);
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Un error inesperado",
      });
    }
  }

  useEffect(() => {
    checkTokenAndRol().then(() => {
      console.log("se cumplio");
    });
  }, []);

  return (
    <div className="panelAsociadoContainer">
      <div className="panelAsociadoColorClima">
        <div className="panelAsociadoContainerClima">
          <div className="panelAdminContainerCardClima">
            <CardClima></CardClima>
          </div>
          <CondicionPista />
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
