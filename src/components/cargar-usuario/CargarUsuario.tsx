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
import "./cargarUsuario.css";
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { resolverToken } from '../../api/apiCalls';
import { apiRoles } from '../../services/apiRoles';

export default function CargarUsuario() {
  // No encontre forma de añadir la variable id en la fecha, encontre esta solucion para manejar en submit.


  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  // Opcion para controlar ingreso de datos. Esta mal implementado, es solo de muestra
  const [error, setError] = useState('');
  const handleValidation = (inputValue:any) => {
    if (inputValue.length === 0) {
      setError('Este campo es obligatorio.');
    } else {
      setError('');
    }
  };


//   ------------------------------ Validacion------------------------------------
    const navigate = useNavigate();
  
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
  //   ------------------------------ Validacion------------------------------------


  function handleSubmit(e: any) {
    e.preventDefault();
    const datos = {
      nombre: e.target.nombre.value,
      apellido: e.target.apellido.value,
      dni: e.target.dni.value,
      email: e.target.email.value,
      fecha_nacimiento: value,
    }
    console.log(datos);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <FormGroup
        className='formulario-cargar-usuario'
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        >
        <Typography className="titulo-cargar-usuario" variant="h4">
            Cargar Asociado
        </Typography>
        <Box className="fila-formulario-editar-usuario">
            <TextField
            id="nombre"
            label="Nombre"
            variant="filled"
            defaultValue=""
            helperText={error}
            error={Boolean(error)}
            onBlur={(e) => handleValidation(e.target.value)}
            />
            <TextField
            id="apellido"
            label="Apellido"
            variant="filled"
            defaultValue=""
            helperText={error}
            error={Boolean(error)}
            onBlur={(e) => handleValidation(e.target.value)}
            />
        </Box>
        <Box className="fila-formulario-editar-usuario">
            <TextField
            id="dni"
            label="DNI"
            variant="filled"
            defaultValue=""
            helperText={error}
            error={Boolean(error)}
            onBlur={(e) => handleValidation(e.target.value)}
            />
            <TextField
            id="email"
            label="E-mail"
            variant="filled"
            defaultValue=""
            helperText={error}
            error={Boolean(error)}
            onBlur={(e) => handleValidation(e.target.value)}
            />
        </Box>
        <Box className="fila-formulario-editar-usuario">
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
        <Box className="fila-formulario-editar-usuario">
            <TextField
            id="cantidadAterrizajes"
            label="Cantidad de aterrizajes"
            variant="filled"
            defaultValue=""
            helperText={error}
            error={Boolean(error)}
            onBlur={(e) => handleValidation(e.target.value)}
            />
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
        <Box className="fila-formulario-editar-usuario">
            {/* Fecha ultima cuota paga */}
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                format="MM - DD - YYYY"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                label="Fecha de ultima cuota paga" 
                slotProps={{
                textField: {
                helperText: 'MM/DD/YYYY',
                },
                }}
                />
            </DemoContainer>
            {/* Fecha de inscripcion */}
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                format="MM - DD - YYYY"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                label="Fecha de inscripcion" 
                slotProps={{
                textField: {
                helperText: 'MM/DD/YYYY',
                },
                }}
                />
            </DemoContainer>
        </Box>
        
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Cargar
        </Button>
        </FormGroup>
      </form>
    </LocalizationProvider>
  );
}

