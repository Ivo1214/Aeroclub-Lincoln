import React, { useEffect } from 'react';

const CardClima: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://metar-taf.com/es/embed-js/AR-0253?u=46051&qnh=hPa&rh=rh&target=EIRSfDfS';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';

    const container = document.getElementById('metartaf-container');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="metartaf-container">
    <a
      href="https://metar-taf.com/es/AR-0253"
      target="_blank"
      id="metartaf-EIRSfDfS"
      style={{
        fontSize: '18px',
        fontWeight: 500,
        color: '#000',
        width: '300px',
        height: '435px',
        display: 'block',
        padding: '1rem',
      }}
    >
      METAR Lincoln Airport
    </a>
  </div>
  
  );
};

export { CardClima };
