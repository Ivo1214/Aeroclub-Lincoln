import "./PanelAdministradores.css";
import TablaAsociadosPanelAdmin from "../../components/tablaAsociadosPaneAdmin/TablaAsociadosPaneAdmin";
import { useTablaAsociadosPanelAdmin } from "../../hooks/useTablaAsociadosPanelAdmin";
import { AeronaversAlertaPanelAdmin } from "../../components/aeronavers-alerta-panel-admin/aeronaversAlertaPanelAdmin";
import { aeronaves } from "../../mock/aeronaves";
import { CardClima } from "../../components/card-clima/CardClima";
import CondicionPista from "../../components/condicion-pista/CondicionPista";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resolverToken } from "../../api/apiCalls";
import { apiRoles } from "../../services/apiRoles";

function PanelAdministradores() {
  const navigate = useNavigate();
  
  // Se revisa si tiene los permisos de gestor
  async function checkTokenAndRol() {
    const getTokenLocal = await localStorage.getItem("token");
    const [roles, setRoles] = useState<string[]>([]);
    setRoles(await apiRoles.get(sessionStorage.getItem("email")));
    
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
        if (!roles.includes("Gestor")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario no posee el rol de gestor para acceder",
          });

          navigate("/", { replace: true });
        } else {
          // console.log(resResolverToken.dataToken);
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
      // console.log("se cumplio");
    });
  }, []);
// Fin chequeo del rol gestor


  return (
    <div className="panelAdminContainer">
      <div className="panelAdminColorClima">
        <div className="panelAdminContainerClima">
          <div className="panelAdminContainerCardClima">
            <CardClima></CardClima>
          </div>
        </div>
      </div>

      <div className="panelAdminColorTablaAsociados">
        <h1 className="panelAdminTitle">Asociados</h1>
        <div className="tablaAdmin">
          <TablaAsociadosPanelAdmin />
        </div>
        <Button
          onClick={() => {
            navigate("/cargar-usuario", { replace: true });
          }}
          size="large"
        >
          Cargar asociado
        </Button>
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
