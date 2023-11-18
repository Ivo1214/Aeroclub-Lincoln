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
import "./formRecibos.css";
import MenuItem from '@mui/material/MenuItem';


const currencies = [
    {
      value: 'A',
      label: 'a',
    },
    {
      value: 'B',
      label: 'b',
    },
    {
      value: 'C',
      label: 'c',
    },
    {
      value: 'D',
      label: 'd',
    },
  ];


export default function FormRecibos() {
  // No encontre forma de añadir la variable id en la fecha, encontre esta solucion para manejar en submit.
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  // Opcion para controlar ingreso de datos. Esta mal implementado, es solo de muestra
  const [error, setError] = useState('');
  const handleValidation = (inputValue) => {
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
      <Box className="fila-formulario-editar-usuario">
      <TextField
          id="email-Asociado"
          label="E-mail Asociado"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
        <TextField
          id="email-Instructor"
          label="E-mail Instructor"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
      </Box>
      <Box className="fila-formulario-editar-usuario">
      <TextField
          id="email-Gestor"
          label="E-mail Gestor"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
      </Box>

      <Box className="fila-formulario-recibo-observaciones">        
      <TextField
          id="observacion"
          label="Observaciones"
          placeholder="Placeholder"
          multiline
        />
        </Box>

        <Box className="fila-formulario-editar-usuario">
        <TextField
          id="matricula"
          label="Matricula"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
        {/* Fecha de nacimiento */}
        <DemoContainer components={['DatePicker']}>
            <DatePicker
            format="MM - DD - YYYY"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            label="Fecha de nacimiento" 
            slotProps={{
              textField: {
              helperText: 'MM/DD/YYYY',
              },
            }}
            />
        </DemoContainer>
      </Box>

      <Box className="fila-formulario-recibo-observaciones">
      <h1>Itinerarios</h1>
        </Box>

        <Box className="fila-formulario-recibo-observaciones">
        <TextField
          id="horasVuelo"
          label="Cantidad de horas de vuelo"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
        </Box>
      
      <Button variant="contained" endIcon={<SendIcon />}>
        Enviar
      </Button>
    </FormGroup>
    </LocalizationProvider>
  );
}
