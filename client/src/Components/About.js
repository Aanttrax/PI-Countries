import React from "react";
import './About.css';
import ariel from '../img/Ariel.jpeg'

function About() {
    return(
        <div>
            <img src = {ariel} alt = 'Ariel'/>
            <h2>Ariel Rodriguez Ticona</h2>
            <p>Estudiante de Henry</p>
        </div>
    )
};

export default About;