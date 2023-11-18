import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import "./formEditUsuario.css";


function formatearFecha (fechaRecibida:any) {
  if (fechaRecibida == null) return '';
  let fecha =new Date(fechaRecibida);
  // Obtén los componentes de la fecha (año, mes, día)
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0, así que sumamos 1
  const day = String(fecha.getDate()).padStart(2, '0');


  return `${year}-${month}-${day}`.toString();
}
export default function FormEditUsuario(props:any) {
  const datosAsociado = props.datosAsociado;


  // No encontre forma de añadir la variable id en la fecha, encontre esta solucion para manejar en submit.
  const [fecha_alta, setFecha_alta] = React.useState<Dayjs | null>(dayjs(formatearFecha(datosAsociado.fecha_alta)));


  // Opcion para controlar ingreso de datos. Esta mal implementado, es solo de muestra
  const [error, setError] = useState('');
  const handleValidation = (inputValue:any) => {
    if (inputValue.length === 0) {
      setError('Este campo es obligatorio.');
    } else {
      setError('');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <FormGroup
      className='formulario-editar-usuario'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      {/* Nombre y apellido */}
      <Box className="fila-formulario-editar-usuario">
        <TextField
          id="nombre"
          value={datosAsociado.nombre}
          label="Nombre"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
        <TextField
          id="apellido"
          value={datosAsociado.apellido}
          label="Apellido"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
      </Box>
      {/* DNI y E-Mail */}
      <Box className="fila-formulario-editar-usuario">
        <TextField
          id="dni"
          value={datosAsociado.dni}
          label="DNI"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
        <TextField
          id="email"
          value={datosAsociado.email}
          label="E-mail"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
      </Box>
      {/* Direccion y Telefono */}
      <Box className="fila-formulario-editar-usuario">
        <TextField
          id="direccion"
          value={datosAsociado.direccion}
          label="Dirección"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
        <TextField
          id="telefono"
          value={datosAsociado.telefono}
          label="Telefono"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
      </Box>
      {/* Fecha alta y fecha de baja */}
      <Box className="fila-formulario-editar-usuario">
        {/* Fecha de alta */}
        <DemoContainer components={['DatePicker']}>
            <DatePicker
            format="MM - DD - YYYY"
            value={fecha_alta}
            onChange={(newValue) => setFecha_alta(newValue)}
            label="Fecha de alta" 
            slotProps={{
              textField: {
              helperText: 'MM/DD/YYYY',
              },
            }}
            />
        </DemoContainer>
      </Box>
      {/* Saldo */}
      <Box className="fila-formulario-editar-usuario">
        <FormControl sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Saldo</InputLabel>
          <FilledInput
            id="saldo"
            error={Boolean(error)}
            onBlur={(e) => handleValidation(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </Box>
      
      <Button variant="contained" endIcon={<SendIcon />}>
        Enviar
      </Button>
    </FormGroup>
    </LocalizationProvider>
  );
}
