import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Header.css";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { LoginGoogle } from "../login-google/Login-google";
import { LogoutGoogle } from "../logout-google/Logout-google";
import { resolverToken } from "../../api/apiCalls";
import { useRecoilState } from "recoil";
import { usuarioEnSesion } from "../../atomos/atoms";
import { useAuthToken } from "../../hooks/useAuthToken";

export default function Header() {
  const [userSesion, setUserSesion] = useRecoilState(usuarioEnSesion);
  const [changeSesion, setChangeSesion] = useState(false);
  const [changeRol, setChangeRol] = useState(false);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  const { decodificarToken } = useAuthToken();

  async function buscarUsuario() {
    await decodificarToken();
  }

  // Efecto para decodificar el token cuando el componente se monta

  useEffect(() => {
    if (userSesion.email != "") {
      setChangeSesion(true);
    } else {
      setChangeSesion(false);
    }
  }, [userSesion]);

  console.log("el mail del usuario en sesion: ", userSesion.email);

  const handleRoleSelection = (role: any) => {
    if (userSesion.roles.includes(role)) {
      setSelectedRole(role);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El usuario no posee el rol que quiere seleccionar",
      });
      if (selectedRole) {
        setSelectedRole(selectedRole);
      } else {
        setSelectedRole("Usuario");
      }
    }
  };

  useEffect(() => {
    // Actualizar el estado con el rol almacenado en el local storage al cargar el componente
    buscarUsuario();
  }, []);

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">
          {" "}
          <img
            src="https://drive.google.com/uc?export=view&id=19U8BFR2N0VfapOWtSvoiRSsXvOc6iVdH"
            alt=""
          />
          Aeroclub Lincoln
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <Avatar
              className="avatar"
              alt="Remy Sharp"
              src="https://cdn.discordapp.com/attachments/623709532555575296/1173703466930151525/image.png?ex=6564eb88&is=65527688&hm=e56f9236b040b402deb80122197c9897d21b420dd5ed599b11174791f1807ba7&"
            ></Avatar>
            <h3>{`${userSesion.email}`}</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {/*Aca agrego los botones de login y logout segun si esta loggeado o no */}
              <li className="nav-item">
                {changeSesion ? <LogoutGoogle /> : <LoginGoogle />}
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link no-underline">Inicio</a>
                </NavLink>
              </li>
              <li className="nav-item">
                <a
                  onClick={() => {
                    switch (selectedRole) {
                      case "Gestor":
                        navigate("/panel-administrador", { replace: true });
                        break;
                      case "Asociado":
                        navigate("/panel-asociado", { replace: true });
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  {" "}
                  <a className="nav-link">Panel de control</a>
                </a>
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Contactos</a>
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                {/* <div className="dropdown rol">
                  Seleccionar rol: 
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="roleDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedRole}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="roleDropdown">
                    <li><a className="dropdown-item" href="#" onClick={() => handleRoleSelection('Usuario')}>Usuario</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => handleRoleSelection('Asociado')}>Asociado</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => handleRoleSelection('Instructor')}>Instructor</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => handleRoleSelection('Gestor')}>Gestor</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => handleRoleSelection('Mecanico')}>Mecanico</a></li>
                  </ul>
                </div>                 */}
                <div className="dropdown rol">
                  Seleccionar rol:
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="roleDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedRole}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="roleDropdown">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleRoleSelection("Usuario")}
                      >
                        Usuario
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleRoleSelection("Asociado")}
                      >
                        Asociado
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleRoleSelection("Instructor")}
                      >
                        Instructor
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleRoleSelection("Gestor")}
                      >
                        Gestor
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleRoleSelection("Mecanico")}
                      >
                        Mecanico
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <Divider className="divider" variant="middle" />

            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <div className="dropdown">
                <a
                  className="btn btn-secondary dropdown-toggle mi-info"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mi Informacion
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
              <li className="nav-item turnos">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Turnos</a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Ver certificado CMA</a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Ver licencias</a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Registro historicos de vuelos</a>
                </NavLink>
              </li>
            </ul>
            <Divider className="divider" variant="middle" />

            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Cargar Certificado CMA</a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Cargar Licencias</a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  {" "}
                  <a className="nav-link">Editar mis datos</a>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
