import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import { Divider } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import formatearFecha from '../../functions/formatearFecha/formatearFecha';



function CardVerRecibo(datos_recibo: any) {

  const recibo = datos_recibo.datos[0];
  
  //   const datosRecibo = recibo.datos[0];
  // function listaItinerarios () {
  //   let itinerarios = datosRecibo.itinerarios;

  //     // Si no es un array (Solo tiene 1 itinerario cargado) devuelvo 1 solo Typography
  //   if (!Array.isArray(itinerarios)) {
  //     return (
  //           <Box  key={itinerarios}>
  //               <Divider><FiberManualRecordIcon></FiberManualRecordIcon></Divider>
  //               <Typography className="datos-asociados" variant="body2" color="textSecondary">
  //                   Salida: {itinerarios.codAeroSalida}
  //               </Typography>
  //               <Typography className="datos-asociados" variant="body2" color="textSecondary">
  //                   Llegada: {itinerarios.codAeroLlegada}
  //               </Typography>
  //               <Typography className="datos-asociados" variant="body2" color="textSecondary">
  //                   Hora Salida: {formatearFecha(itinerarios.horaSalida)}
  //               </Typography>
  //               <Typography className="datos-asociados" variant="body2" color="textSecondary">
  //                   Hora Llegada: {formatearFecha(itinerarios.horaLlegada)}
  //               </Typography>
  //               <Typography className="datos-asociados" variant="body2" color="textSecondary">
  //                   Aterrizajes: {itinerarios.cantAterrizajes}
  //               </Typography>
  //               <Typography className="datos-asociados" variant="body2" color="textSecondary">
  //                   Tipo itinerario: {itinerarios.tipoItinerario}
  //               </Typography>
  //           </Box>
  //     );
  //   }

  //   // Sino realizo un mapeo
  //   return (
  //     <div>
  //       {itinerarios.map((itinerario: any) => (
  //           <Box  key={itinerario}>
  //               <Divider><FiberManualRecordIcon></FiberManualRecordIcon></Divider>
  //               <Typography className="datos-asociados" variant="body2" color="textSecondary">
  //                   Salida: {itinerario.codAeroSalida}
  //               </Typography>
  //               <Typography className="datos-asociados" variant="body2" color="textSecondary">
  //                   Llegada: {itinerario.codAeroLlegada}
  //               </Typography>
  //               <Typography className="datos-asociados" variant="body2" color="textSecondary">
  //                   Hora Salida: {formatearFecha(itinerario.horaSalida)}
  //               </Typography>
  //               <Typography className="datos-asociados" variant="body2" color="textSecondary">
  //                   Hora Llegada: {formatearFecha(itinerario.horaLlegada)}
  //               </Typography>
  //               <Typography className="datos-asociados" variant="body2" color="textSecondary">
  //                   Aterrizajes: {itinerario.cantAterrizajes}
  //               </Typography>
  //               <Typography className="datos-asociados" variant="body2" color="textSecondary">
  //                   Tipo itinerario{itinerario.tipoItinerario}
  //               </Typography>
                
  //           </Box>
  //       ))}
  //     </div>
  //   );
  // };

  // Si el vuelo fue sin instructor entonces no se muestra en la card.
  // function mostrarInstructor () {
  //   if (datosRecibo.instructor !== "") {
  //     return (
  //       <Typography className="datos-asociados" variant="body2" color="text.secondary">
  //             Instructor: {datosRecibo.instructor}
  //       </Typography>
  //     );
  //   }
  //   else {
  //     return (null);
  //   }
  // }

  return (
  <div className="card">
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Asociado: {recibo.asociado}
          </Typography>
          
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Fecha: {formatearFecha(recibo.fecha)}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Monto: ${recibo.monto}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Motivo: {recibo.motivo}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Tipo de pago: {recibo.tipo_pago_id}  
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export { CardVerRecibo };
