import React, { useState, useEffect } from 'react';
import { AlgoritmoGenetico } from './models/AlgoritmoGenetico';
import PopulationControls from './components/PopulationControls';
import PopulationDisplay from './components/PopulationDisplay';
import { convertToRgb } from './helpers/helpers';
import { Besouro } from './models/Besouro';
import classes from './App.module.css';

function App() {
  const [meta, setMeta] = useState('#ff0000');
  const [tamanho, setTamanho] = useState('');
  const [geracoes, setGeracoes] = useState('');
  const [taxa, setTaxa] = useState('');
  const [populacoes, setPopulacoes] = useState<Besouro[][]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => window.scrollTo(0, document.body.scrollHeight), [populacoes]);

  const handleGeneration = async () => {
    setPopulacoes([]); await new Promise(resolve => setTimeout(resolve, 1000)); setIsGenerating(true);

    const META = convertToRgb(meta), TAMANHO = +tamanho < 5 ? 5 : +tamanho, 
          GERACOES = +geracoes || 10, TAXA = (+taxa || 0) / 100;

    const ag = new AlgoritmoGenetico(TAMANHO, META);
    ag.avaliacao(); setPopulacoes([ag.ultimaPopulacao]);

    for (let i = 1; i <= GERACOES; i++) {
      const elite = Math.ceil(ag.ultimaPopulacao.length / 3);
      const filhos = Array.from({ length: ag.ultimaPopulacao.length - elite }, () => {
        const [pai1, pai2] = ag.selecao();
        return [
          ag.mutacao(ag.crossover(pai1, pai2)[0], TAXA),
          ag.mutacao(ag.crossover(pai1, pai2)[1], TAXA)
        ];
      }).flat().slice(0, ag.ultimaPopulacao.length - elite);

      ag.gerarNovaPopulacao(filhos); ag.avaliacao();
      setPopulacoes(prev => [...prev, ag.ultimaPopulacao]);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    setIsGenerating(false);
  }

  return (
    <div className={classes.app}>
      <PopulationControls {...{ meta, setMeta, tamanho, setTamanho, geracoes, setGeracoes, taxa, setTaxa, handleGeneration, isGenerating }} />
      {populacoes.map((populacao, index) => (
        <React.Fragment key={index}>
          <h1>{index ? `Geração ${index}` : 'População Inicial'}</h1>
          <PopulationDisplay populacao={populacao.sort((a, b) => b.aptidao - a.aptidao)} />
        </React.Fragment>
      ))}
    </div>
  )
}

export default App;