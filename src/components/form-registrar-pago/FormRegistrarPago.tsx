import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Autocomplete, FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { apiUsuarios } from "../../services/apiUsuarios";


import { usuarioEnSesion } from "../../atomos/atoms";
import { useRecoilState } from "recoil";




export default function FormRegistrarPago() {
  // Cargo el input de gestor con el usuario de la sesion
  const [userSesion, setUserSesion] = useRecoilState(usuarioEnSesion);
  // ************************************************************************************
  //                            Carga del selector de usuarios
  // ************************************************************************************

  const [asociados, setAsociados] = useState([]);
  const fetchDataAsociados = async () => {
    try {
      const response = await apiUsuarios.getUsuarios();
      // Mapeo la respuesta de la api y la convierto a un array de objetos que se usara para cargar el selector de asociados
      const resultado = response.map((user: any)=>{
        const usuarioFormateado = { 
          id: user.id_usuarios,
          nombre: user.nombre + " " + user.apellido,
          email: user.email
        };
        return usuarioFormateado;
      });
      setAsociados (resultado);
    } catch (error:any) {
      console.log(error.message);
    }
  };

  const [value, setValue] = React.useState<string | null>(asociados[0]);
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    fetchDataAsociados();
  }, []);



  // ************************************************************************************
  //                                  Funcion OnSubmit
  // ************************************************************************************
  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();

    const datos = {
      emailAsociado: value.email,
      emailGestor: e.target.emailGestor.value,
      observaciones: e.target.observaciones.value,
      monto : e.target.monto.value
    };
    // console.log("Valores de los formularios:", rows);
    console.log(datos);
    // try {
    //   await apiReciboVuelos.post(datos);
    // } catch (error: any) {
    //   console.log(error.message);
    // }
  };

  return (
    <form onSubmit={enviar}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormGroup
        //   className="formulario-editar-usuario"
        //   sx={{
        //     "& .MuiTextField-root": { m: 1, width: "25ch" },
        //   }}
        >
            <Box className="fila-formulario-editar-usuario">
                <Autocomplete
                    disablePortal
                    id="emailAsociado"
                    options={asociados}
                    getOptionLabel={(asociados) => asociados.nombre}
                    value={value}
                    onChange={(event: any, newValue: string | null) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Asociado *" />}
                />
            </Box>

            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Monto *</InputLabel>
                <OutlinedInput
                    id="monto"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Monto"
                    type="number"
                />
            </FormControl>
            <Box className="fila-formulario-editar-usuario">
                <TextField
                    id="emailGestor"
                    value={userSesion.email}
                    label="E-mail Gestor *"
                    variant="filled"
                    defaultValue=""
                />
            </Box>

            <Box className="fila-formulario-recibo-observaciones">
                <TextField
                    id="observaciones"
                    label="Observaciones"
                    placeholder=""
                    multiline
                />
            </Box>

          
        </FormGroup>
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Cargar
        </Button>
    </LocalizationProvider>
    </form>
  );
}
