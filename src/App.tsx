import React, { useState, useEffect } from 'react';
import { AlgoritmoGenetico } from './models/AlgoritmoGenetico';
import PopulationControls from './components/PopulationControls';
import PopulationDisplay from './components/PopulationDisplay';
import { Besouro } from './models/Besouro';
import classes from './App.module.css';

function App() {
  const [tamanho, setTamanho] = useState('');
  const [geracoes, setGeracoes] = useState('');
  const [taxa, setTaxa] = useState('');
  const [populacoes, setPopulacoes] = useState<Besouro[][]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [populacoes]);

  const handleGeneration = async () => {
    setPopulacoes([]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsGenerating(true);

    const TAMANHO = +tamanho < 5 ? 0 : +tamanho;
    const GERACOES = +geracoes < 1 ? 10 : +geracoes;
    const TAXA = +taxa < 0 ? 0 : +taxa/100;

    const ag = new AlgoritmoGenetico(TAMANHO || 5);
    ag.avaliacao();

    setPopulacoes([ag.ultimaPopulacao]);

    for (let i = 1; i <= GERACOES; i++) {

      const elite = Math.ceil(ag.ultimaPopulacao.length / 3);
      const filhosNecessarios = ag.ultimaPopulacao.length - elite;

      const filhos: Besouro[] = [];

      for (let j = 0; filhos.length < filhosNecessarios; j++) {
          const [pai1, pai2] = ag.selecao();
          let [filho1, filho2] = ag.crossover(pai1, pai2);
          filho1 = ag.mutacao(filho1, TAXA || 0.1);
          filho2 = ag.mutacao(filho2, TAXA || 0.1);

          // Adiciona os filhos até atingir a quantidade necessária
          if (filhos.length < filhosNecessarios) filhos.push(filho1);
          if (filhos.length < filhosNecessarios) filhos.push(filho2);
      }

      // Gera nova população com a elite e os filhos
      ag.gerarNovaPopulacao(filhos);
      ag.avaliacao();

      setPopulacoes((prevPopulacoes) => [
        ...prevPopulacoes,
        ag.ultimaPopulacao
      ]);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    setIsGenerating(false);
  }

  return (
    <div className={classes.app}>
      <PopulationControls
        tamanho={tamanho}
        setTamanho={setTamanho}
        geracoes={geracoes}
        setGeracoes={setGeracoes}
        taxa={taxa}
        setTaxa={setTaxa}
        handleGeneration={handleGeneration}
        isGenerating={isGenerating}
      />

      {populacoes.map((populacao, index) => (
        <React.Fragment key={index}>
          <h1>{ index != 0 ? `Geração ${index}` : 'População Inicial' }</h1>
          <PopulationDisplay 
            populacao={populacao.sort((a, b) => b.aptidao - a.aptidao)}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

export default App