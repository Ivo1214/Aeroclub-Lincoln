import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
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
import { Select, SelectChangeEvent } from '@mui/material';
import { apiReciboVuelos } from '../../services/apiReciboVuelos';
import { DateTimePicker } from '@mui/x-date-pickers';

interface FormValues {
  horaSalida: string;
  codAeroSalida: string;
  horaLlegada: string;
  codAeroLlegada: string;
  cantAterrizajes: string;
  tipoItinerario: string;
}

export default function FormRecibos() {
  // No encontre forma de añadir la variable id en la fecha, encontre esta solucion para manejar en submit.
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  // Manejo de itinerarios
  const [cantidadItinerarios, setCantidadItinerarios] = React.useState("1");
  const handleChange = (event: SelectChangeEvent) => {
    setCantidadItinerarios(event.target.value);
  };

  const [dateValuesSalida, setDateValuesSalida] = React.useState<(Dayjs | null)[]>(new Array(parseInt(cantidadItinerarios)).fill(dayjs('2022-04-17')));
const [dateValuesLlegada, setDateValuesLlegada] = React.useState<(Dayjs | null)[]>(new Array(parseInt(cantidadItinerarios)).fill(dayjs('2022-04-17')));

  const [formValues, setFormValues] = useState<FormValues[]>(
    new Array(parseInt(cantidadItinerarios)).fill({
      horaSalida: "",
      codAeroSalida: "",
      horaLlegada: "",
      codAeroLlegada: "",
      cantAterrizajes: "",
      tipoItinerario: ""
    })
  );
  useEffect(() => {
    setFormValues(new Array(parseInt(cantidadItinerarios)).fill({
      horaSalida: "",
      codAeroSalida: "",
      horaLlegada: "",
      codAeroLlegada: "",
      cantAterrizajes: "",
      tipoItinerario: ""
    }));
    setDateValuesSalida(new Array(parseInt(cantidadItinerarios)).fill(dayjs('2022-04-17')));
    setDateValuesLlegada(new Array(parseInt(cantidadItinerarios)).fill(dayjs('2022-04-17')));
  }, [cantidadItinerarios]);
  

  const handleDateChangeSalida = (itineraryIndex: number, newValue: Dayjs | null) => {
    const newDateValues = [...dateValuesSalida];
    newDateValues[itineraryIndex] = newValue;
    setDateValuesSalida(newDateValues);
  };
  const handleDateChangeLlegada = (itineraryIndex: number, newValue: Dayjs | null) => {
    const newDateValues = [...dateValuesLlegada];
    newDateValues[itineraryIndex] = newValue;
    setDateValuesLlegada(newDateValues);
  };

  const handleInputChange = (
    formIndex: number,
    fieldName: keyof FormValues,
    value: string
  ) => {
    const newFormValues = [...formValues];
    newFormValues[formIndex] = {
      ...newFormValues[formIndex],
      [fieldName]: value,
      horaSalida: dateValuesSalida[formIndex]?.format('YYYY-MM-DD HH:mm:ss') || '',
      horaLlegada: dateValuesLlegada[formIndex]?.format('YYYY-MM-DD HH:mm:ss') || '',
    };
    setFormValues(newFormValues);
  };

  const generateForms = () => {
    const forms = [];
    for (let i = 0; i < parseInt(cantidadItinerarios); i++) {
      forms.push(
        <LocalizationProvider key={i} dateAdapter={AdapterDayjs}>
        <Box key={i} className="fila-formulario-recibo-observaciones">
          <h2>Itinerario {i + 1}</h2>
          {/* Hora de salida */}
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              value={dateValuesSalida[i]}
              onChange={(newValue) => handleDateChangeSalida(i, newValue)}
              label="Hora de salida"
              slotProps={{
                textField: {
                  helperText: 'YYYY-MM-DD HH:mm:ss',
                },
              }}
            />
          </DemoContainer>
          {/* Aeropuerto de salida */}
          <TextField
            id={`codAeroSalida-${i}`}
            label={`Aeropuerto de salida`}
            variant="filled"
            defaultValue=""
            onBlur={(e) => handleValidation(e.target.value)}
            onChange={(e) => handleInputChange(i, 'codAeroSalida', e.target.value)}
          />
          {/* Hora de llegada */}
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              value={dateValuesLlegada[i]}
              onChange={(newValue) => handleDateChangeLlegada(i, newValue)}
              label="Hora de llegada"
              slotProps={{
                textField: {
                  helperText: 'YYYY-MM-DD HH:mm:ss',
                },
              }}
            />
          </DemoContainer>
          {/* Aeropuerto de llegada */}
          <TextField
            id={`codAeroLlegada-${i}`}
            label={`Aeropuerto de llegada`}
            variant="filled"
            defaultValue=""
            onBlur={(e) => handleValidation(e.target.value)}
            onChange={(e) => handleInputChange(i, 'codAeroLlegada', e.target.value)}
          />
          {/* Cantidad de aterrizajes */}
          <TextField
            id={`cantAterrizajes-${i}`}
            label={`Cantidad de aterrizajes`}
            variant="filled"
            defaultValue=""
            onBlur={(e) => handleValidation(e.target.value)}
            onChange={(e) => handleInputChange(i, 'cantAterrizajes', e.target.value)}
          />
          {/* Tipo de itinerario */}
          <TextField
            id={`tipoItinerario-${i}`}
            label={`Tipo de itinerario`}
            variant="filled"
            defaultValue=""
            onBlur={(e) => handleValidation(e.target.value)}
            onChange={(e) => handleInputChange(i, 'tipoItinerario', e.target.value)}
          />
        </Box>
        </LocalizationProvider>
      );
    }
    return forms;
  };
  

  // Opcion para controlar ingreso de datos. Esta mal implementado, es solo de muestra
  const [error, setError] = useState('');
  const handleValidation = (inputValue:any) => {
    if (inputValue.length === 0) {
      setError('Este campo es obligatorio.');
    } else {
      setError('');
    }
  };


  // Funcion OnSubmit
  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const datos = {
      emailAsociado: e.target.emailAsociado.value,
      emailInstructor: e.target.emailInstructor.value, 
      emailGestor: e.target.emailGestor.value,
      observaciones: e.target.observaciones.value,
      matricula: e.target.matricula.value,
      itinerarios: formValues
    }
    console.log("Valores de los formularios:", formValues);
    try {
      await apiReciboVuelos.post(datos);
      } catch (error:any) {
        console.log(error.message);
      }
  };

  return (
    <form onSubmit={enviar}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <FormGroup
      className='formulario-editar-usuario'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      <Box className="fila-formulario-editar-usuario">
      <TextField
          id="emailAsociado"
          label="E-mail Asociado"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
        <TextField
          id="emailInstructor"
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
          id="emailGestor"
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
          id="observaciones"
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
      </Box>

      <Box className="fila-formulario-recibo-observaciones">
      <h1>Itinerarios</h1>
      </Box>
      
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Cantidad</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cantidadItinerarios}
          label="Cantidad"
          onChange={handleChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
    </Box>

      {/* Generar dinámicamente los formularios según la cantidad seleccionada */}
      {generateForms()}
      {/* <Box className="fila-formulario-recibo-observaciones">
        <TextField
          id="horasVuelo"
          label="Cantidad de horas de vuelo"
          variant="filled"
          defaultValue=""
          helperText={error}
          error={Boolean(error)}
          onBlur={(e) => handleValidation(e.target.value)}
        />
        </Box> */}
      
      <Button type="submit" variant="contained" endIcon={<SendIcon />}>
        Enviar
      </Button>
    </FormGroup>
    </LocalizationProvider>
    </form>
  );
}
