import React from 'react';
import classes from './PopulationControls.module.css';

interface PopulationControlsProps {
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
    tamanho,
    setTamanho,
    geracoes,
    setGeracoes,
    taxa,
    setTaxa,
    handleGeneration,
    isGenerating
}) => (
    <div className={classes.population_controls}>
        <h1>Genetic Algorithm Visualizer</h1>

        <p>
            <label htmlFor='tamanho'>Tamanho da População: </label>
            <input
                id='tamanho'
                type='number'
                value={tamanho}
                min='5'
                placeholder='Valor mínimo: 5'
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
                placeholder='Valor mínimo: 1'
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
)

export default PopulationControls;