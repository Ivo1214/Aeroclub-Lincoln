import FormRecibos from "../../components/form-cargar-recibo/FormRecibos";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resolverToken } from "../../api/apiCalls";
import { apiRoles } from "../../services/apiRoles";
import "./adminCargaRecibos.css";

function AdminCargarRecibos() {
  const navigate = useNavigate();

  async function checkTokenAndRol() {
    const getTokenLocal = await localStorage.getItem("token");
    const [roles, setRoles] = useState<string[]>([]);
    setRoles(await apiRoles.get(localStorage.getItem("email")));
    

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
      // console.log("se cumplio");
      console.log("se cumplio");
    });
  }, []);

  return (
    <div className="panelAdminContainer">
      <div className="admin-carga-recibos">
        <h1 className="panelAdminTitle">Cargar Recibo de vuelo</h1>
        <FormRecibos></FormRecibos>
      </div>
    </div>
  );
}

export default AdminCargarRecibos;
