import React from 'react';
import {Footer} from '../../components/footer/Footer';
import NavBar from '../../components/landing-page-components/navbar/NavBar';
import Banner from '../../components/landing-page-components/banner/Banner';
import Informacion from '../../components/landing-page-components/informacion/Informacion';
import Contacto from '../../components/landing-page-components/contacto/Contacto';
import './inicio.css'

const Inicio = () => {
  return (
  <div className="home-page">
    <NavBar></NavBar>
    <Banner></Banner>
    <Informacion></Informacion>
    <Contacto></Contacto>
    <Footer></Footer>
  </div>
  )
};

export default Inicio;