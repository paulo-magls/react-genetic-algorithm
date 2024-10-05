import React from 'react';
import classes from './PopulationDisplay.module.css';
import { Besouro } from '../models/Besouro';
import besouro from '../assets/besouro.png';

interface PopulationDisplayProps {
    populacao: Besouro[];
}

const PopulationDisplay: React.FC<PopulationDisplayProps> = ({ populacao }) => (
    <div className={classes.population_display}>
        {populacao.map(({ r, g, b, aptidao }, index) => (
            <div key={index}>
                <div style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}>
                    <img src={besouro} alt="Besouro" />
                </div>
                <small>
                    RGB({r}, {g}, {b})<br />
                    Aptidão: {aptidao.toFixed(5).replace('.', ',')}
                </small>
            </div>
        ))}
    </div>
);

export default PopulationDisplay;