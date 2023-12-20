import "./aeronaversAlertaPanelAdmin.css";
import { apiAeronaves } from "../../services/apiAeronaves";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export function AeronaversAlertaPanelAdmin() {
  const [aeronavesElements, setAeronavesElements] = useState<JSX.Element[]>([]);

  async function fetchAeronaves() {
    const aeronaves = await apiAeronaves.get();
    const elements = aeronaves.map((aeronave: any) => (
      <Card
        key={aeronave.id_aeronaves}
        sx={{
          display: "flex",
          backgroundColor: backgroundColor(aeronave.estados_aeronaves_id),
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {aeronave.modelo}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {aeronave.matricula}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Estado: {estado(aeronave.estados_aeronaves_id)}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={aeronave.path_imagen_aeronave}
          alt="Imagen de la aeronave"
        />
      </Card>
    ));

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
      <h3 className="alrtaAeronavesTitle">Aeronaves</h3>

      <div className="alertsContainer">{aeronavesElements}</div>
    </div>
  );
}
