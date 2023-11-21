import Swal from 'sweetalert2';
import {client} from './api-backend.ts';

export const apiReciboVuelos = {
    // Ver recibos
    get: async function (email: string) {
        const response = await client.request({
            url: `/recibo-vuelos/${email}`,
            method: 'GET',
            headers: {
                Authorization:
                  "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDA1MTI4NTIsImV4cCI6MTcwMDU0Mjg1MiwiZW1haWwiOiJpdm8xMjE0QGxpdmUuY29tIiwicm9sZXMiOlsiQWRtaW5pc3RyYXRvciIsIkVkaXRvciJdfQ.dKIuQ36ZRxyef5C6Aros7gsXQge4oJDKvOM24nmrRO8",
                "content-type": "application/json",
              }
        })
        
        if (Array.isArray(response.data.respuesta)) {
            // console.log(response.data);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Recibos cargados con exito.',
                text: ``,
                showConfirmButton: false,
                timer: 2500
                })
            return response.data;
        }else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error al cargar recibos.',
                text: ``,
                showConfirmButton: false,
                timer: 2500
                })
        }
    },

    // Cargar un recibo
    post: async function (datos:any) {
        console.log(datos);
        const response = await client.request({
            url: `/recibo-vuelos/`,
            method: 'POST',
            headers: {
                Authorization:
                  "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDA1MTI4NTIsImV4cCI6MTcwMDU0Mjg1MiwiZW1haWwiOiJpdm8xMjE0QGxpdmUuY29tIiwicm9sZXMiOlsiQWRtaW5pc3RyYXRvciIsIkVkaXRvciJdfQ.dKIuQ36ZRxyef5C6Aros7gsXQge4oJDKvOM24nmrRO8",
                "content-type": "application/json",
              },
            data: {
                emailAsociado: datos.emailAsociado,
                emailInstructor: datos.emailInstructor, 
                emailGestor: datos.emailGestor,
                observaciones: datos.observaciones,
                matricula: datos.matricula,
                itinerarios: datos.itinerarios
            }
        })
        
        if (response) {
            // console.log(response.data);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Recibo cargado con exito.',
                text: ``,
                showConfirmButton: false,
                timer: 2500
                })
            return response.data;
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error al cargar recibo.',
                text: ``,
                showConfirmButton: false,
                timer: 2500
                })
        }
    }
}

// Estructura que debe tener la variable "itinerarios" (Es un array)
// En caso de tener varios itinearios estos se ponen despues de la coma siguiendo
// la estructura de objeto de ejemplo

// "itinerarios": [       
//     {"horaSalida":"2021-04-20 18:00:00",
//      "codAeroSalida":"LIN", 
//      "horaLlegada":"2021-04-20 19:15:00",
//      "codAeroLlegada":"LIN",
//      "cantAterrizajes":"3",
//      "tipoItinerario":"Doble comando"
//      },
//       ]