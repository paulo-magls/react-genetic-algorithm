import React from 'react';
import classes from './PopulationControls.module.css';
import { convertToRgb } from '../helpers/helpers';

interface PopulationControlsProps {
    meta: string;
    setMeta: (value: string) => void;
    tamanho: string;
    setTamanho: (value: string) => void;
    geracoes: string;
    setGeracoes: (value: string) => void;
    taxa: string;
    setTaxa: (value: string) => void;
    handleGeneration: () => void;
    isGenerating: boolean;
}

const PopulationControls: React.FC<PopulationControlsProps> = ({
    meta,
    setMeta,
    tamanho,
    setTamanho,
    geracoes,
    setGeracoes,
    taxa,
    setTaxa,
    handleGeneration,
    isGenerating
}) => {
    const rgbMeta = convertToRgb(meta); // Converte a cor hex para RGB

    return (
        <div className={classes.population_controls}>
            <h1>Genetic Algorithm Visualizer</h1>

            <p>
                <label htmlFor='meta'>Meta: RGB({rgbMeta.r}, {rgbMeta.g}, {rgbMeta.b}) </label>
                <input
                    id='meta'
                    type='color'
                    value={meta}
                    onChange={(e) => setMeta(e.target.value)}
                />
            </p>

            <p>
                <label htmlFor='tamanho'>Tamanho da População: </label>
                <input
                    id='tamanho'
                    type='number'
                    value={tamanho}
                    min='5'
                    placeholder='Mínimo: 5 (Padrão: 5)'
                    onChange={(e) => setTamanho(e.target.value)}
                    disabled={isGenerating}
                />
            </p>

            <p>
                <label htmlFor='geracoes'>Número de Gerações: </label>
                <input
                    id='geracoes'
                    type='number'
                    value={geracoes}
                    min='1'
                    placeholder='Mínimo: 1 (Padrão: 10)'
                    onChange={(e) => setGeracoes(e.target.value)}
                    disabled={isGenerating}
                />
            </p>

            <p>
                <label htmlFor='taxa'>Taxa de Mutação: </label>
                <input
                    id='taxa'
                    type='number'
                    value={taxa}
                    min='0.1'
                    placeholder='Padrão: 10 (10%)'
                    onChange={(e) => setTaxa(e.target.value)}
                    disabled={isGenerating}
                />
            </p>

            <p>
                <button onClick={handleGeneration} disabled={isGenerating}>
                    {isGenerating ? 'Gerando...' : 'Gerar Populações'}
                </button>
            </p>
        </div>
    );
};

export default PopulationControls;