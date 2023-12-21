import "./AdminDetallesAsociados.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { apiUsuarios } from "../../services/apiUsuarios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import formatearFecha from "../../functions/formatearFecha/formatearFecha";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';

function AdminDetallesAsociados (props:any) {
  const datosAsociado = props.datos[0];
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleEditarClick = () => {
    navigate("/admin-editar-usuarios", { state: { asociado: datosAsociado }, replace: true });
  };

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };
  // Manejo del Dialog para confirmar borrado desde la tabla
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleConfirmDialog = async () => {
    try {
    await apiUsuarios.deleteUserByEmail(datosAsociado.email);
    } catch (error:any) {
      console.log(error.message);
    }
    setOpenDialog(false);
  };

  function listaRoles () {
    let roles = datosAsociado.roles;
    try {
      // Si no es un array (Solo tiene 1 rol cargado) devuelvo 1 solo Typography
    if (!Array.isArray(roles)) {
      return (
        <Typography key={roles} className="datos-asociados" variant="body2" color="textSecondary">
            {roles.tipo}
        </Typography>
      );
    }

    // Sino realizo un mapeo
    return (
      <div>
        {roles.map((rol: any) => (
          <Typography key={rol} className="datos-asociados roles-asociado" variant="body2" color="textSecondary">
            - {rol.tipo} -
          </Typography>
        ))}
      </div>
    );
    }
    catch (error) {
      return (
        <Typography className="datos-asociados" variant="body2" color="textSecondary">
            Este asociado no posee un rol...
        </Typography>
      );
    }
  };


  return (
    <div className="detallesAsociadosContainer">
      <Card className="cardVerAsociado" sx={{ maxWidth: 345 }}>
        <CardContent>
          <Box >
            <div className="class-avatar">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />          
            <Typography className="asociado-nombreCompleto" gutterBottom variant="h5" component="div">
              {datosAsociado.nombreCompleto}
            </Typography>
            </div>
          </Box>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Nombre: {datosAsociado.nombre}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Apellido: {datosAsociado.apellido}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Saldo: {datosAsociado.saldo}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            E-Mail: {datosAsociado.email}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Telefono: {datosAsociado.telefono}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            DNI: {datosAsociado.dni}
          </Typography>
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Fecha Alta: {formatearFecha(datosAsociado.fecha_alta)}  
          </Typography>
          {/* <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Fecha Baja: {asociado.fecha_baja}
          </Typography> */}
          <Typography className="datos-asociados" variant="body2" color="text.secondary">
            Dirección: {datosAsociado.direccion}
          </Typography>
          <Typography className="titulo-roles" variant="body2" color="text.secondary">
            Roles
          </Typography>
          <Box>
            {listaRoles()}
          </Box>
        </CardContent>
      </Card>
      <div className="detallesAsociadosContainerButtons">
      <Button onClick={handleEditarClick} className="detallesUsuarioBoton" sx={{color: "white"}} size="small"><EditIcon/></Button>
      <Button onClick={handleDeleteClick} className="detallesUsuarioBoton" sx={{color: "white"}} size="small"><DeleteIcon/></Button>
      </div>
      {/* Dialogo para confirmar borrado */}
      <>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>¿Estas seguro de borrar el asociado?</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleConfirmDialog}>Confirmar</Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}

export default AdminDetallesAsociados;
