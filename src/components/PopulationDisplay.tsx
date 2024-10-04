import React from 'react';
import classes from './PopulationDisplay.module.css';
import { Besouro } from '../models/Besouro';
import besouro from '../assets/besouro.png';

interface PopulationDisplayProps {
    populacao: Besouro[];
}

const PopulationDisplay: React.FC<PopulationDisplayProps> = ({ populacao }) => {
    return (
        <div className={classes.population_display}>
            {populacao.map((individuo, index) => {
                // Criação da string de cor RGB a partir dos valores individuais
                const rgbColor = `rgb(${individuo.r}, ${individuo.g}, ${individuo.b})`;

                return (
                    <div>
                        <div key={index} style={{ backgroundColor: rgbColor }}>
                            <img src={besouro} alt="Besouro" />
                        </div>
                        
                        <small>
                            RGB({individuo.r},{individuo.g},{individuo.b})
                            Aptidão: {individuo.aptidao.toFixed(3).replace('.', ',')}
                        </small>
                    </div>
                );                
            })}
        </div>
    );
};

export default PopulationDisplay;