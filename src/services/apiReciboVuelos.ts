import {client} from './api-backend.ts';

export const apiReciboVuelos = {
    // Cargar un recibo
    post: async function (datos:any) {
        const response = await client.request({
            url: `/recibo-vuelos`,
            method: 'POST',
            headers: {
                Authorization:
                  "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDAyNTIyMTUsImV4cCI6MTcwMDI4MjIxNSwiZW1haWwiOiJpdm8xMjE0QGxpdmUuY29tIiwicm9sZXMiOlsiQWRtaW5pc3RyYXRvciIsIkVkaXRvciJdfQ.EGAsXLP-VngG_mc2zEgegphkABZgdB504XmNLxqusCQ",
                "content-type": "application/json",
              },
            data: {
                emailAsociado: datos.emailAsociado,
                emailInstructor: datos.emailInstructor, 
                emailGestor: datos.emailGestor,
                observaciones: datos.observaciones,
                matricula: datos.matricula,
                fecha: datos.fecha,
                itinerarios: datos.itinerarios
            }
        })
        
        if (response){
            // console.log(response.data);
            return response.data;
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