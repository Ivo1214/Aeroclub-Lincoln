import React from 'react';
import './banner.css';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Banner = () => {
    
    return (
        <div className="banner">
            <div className="redes">
                <TwitterIcon className="bi bi-twitter-x"/>
                <FacebookIcon className="bi bi-facebook"/>
                <InstagramIcon className="bi bi-instagram"/>
                <WhatsAppIcon className="bi bi-whatsapp"/>
            </div>
        </div>
    );
};

export default Banner;