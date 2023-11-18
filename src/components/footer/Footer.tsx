import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footerContainer">
      <p className="footerDerechos">
        © 2023 Aero Club Lincoln.
        <br></br>
        Todos los derechos reservados.
      </p>
      <img
        className="footerLogo"
        src="https://drive.google.com/uc?export=view&id=19U8BFR2N0VfapOWtSvoiRSsXvOc6iVdH"
        alt="Logo Aero club Lincoln"
      />
      <div className="footerRedesContainer">
        <a className="footerRedesLink">
          <img
            className="footerRedesLinkLogo"
            src="http://drive.google.com/uc?export=view&id=1fATqxbF6ywa3v1EW2kNWDebAuT36PW0h"
            alt="Facebook"
          />
        </a>

        <a className="footerRedesLink">
          <img
            className="footerRedesLinkLogo"
            src="http://drive.google.com/uc?export=view&id=1cvcesgKz1OaSPfBP8-Z37W69_CXIBSZG"
            alt="Instagram"
          />
        </a>

        <a className="footerRedesLink">
          <img
            className="footerRedesLinkLogo"
            src="http://drive.google.com/uc?export=view&id=1I-Sc4hgFwdWGI9BZcC_7DtclYXGFKJW9"
            alt="Whatsapp"
          />
        </a>
      </div>
    </div>
  );
}

export { Footer };
