import React from 'react';
import "./CargaUsuariosNuevos.css"
import CargarUsuarioNuevo from '../../components/cargar-usuario-nuevo/CargarUsuarioNuevo';

function CargaUsuariosNuevos() {
    return (
        <div className='cargar-usuarios'>
            <CargarUsuarioNuevo></CargarUsuarioNuevo>
        </div>
    );
};

export default CargaUsuariosNuevos;