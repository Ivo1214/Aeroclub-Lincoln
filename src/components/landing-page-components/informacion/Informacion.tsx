import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './informacion.css';
import AdjustIcon from '@mui/icons-material/Adjust';
import Divider from '@mui/material/Divider';

const Informacion = () => {
    return (
        <Container maxWidth="md" className="informacion">
            <Box maxWidth="md" className="container-informacion">
                <p className="texto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
                    Curabitur nec turpis commodo, malesuada odio ut, lobortis enim. 
                    Aenean eu turpis at justo ultricies fringilla. 
                    Phasellus sit amet orci aliquet libero posuere finibus.</p>
                <img className="image" src="../assets/images/banner2.png" alt="example"/>
            </Box>
            <Divider><AdjustIcon/></Divider>
            <Box maxWidth="md" className="container-informacion">
                <p className="texto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
                    Curabitur nec turpis commodo, malesuada odio ut, lobortis enim. 
                    Aenean eu turpis at justo ultricies fringilla. 
                    Phasellus sit amet orci aliquet libero posuere finibus.</p>
                <img className="image" src="../assets/images/example.png" alt="example"/>
            </Box>
            <Divider><AdjustIcon/></Divider>
            <Box maxWidth="md" className="container-informacion">
                <p className="texto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
                    Curabitur nec turpis commodo, malesuada odio ut, lobortis enim. 
                    Aenean eu turpis at justo ultricies fringilla. 
                    Phasellus sit amet orci aliquet libero posuere finibus.</p>
                <img className="image" src="../assets/images/example.png" alt="example"/>
            </Box>
            <Divider><AdjustIcon/></Divider>
            <Box maxWidth="md" className="container-informacion">
                <p className="texto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
                    Curabitur nec turpis commodo, malesuada odio ut, lobortis enim. 
                    Aenean eu turpis at justo ultricies fringilla. 
                    Phasellus sit amet orci aliquet libero posuere finibus.</p>
                <img className="image" src="../assets/images/example.png" alt="example"/>
            </Box>
        </Container>
    );
};

export default Informacion;