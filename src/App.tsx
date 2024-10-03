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
      console.log(GERACOES);
      const filhos: Besouro[] = [];

      // Determina que a quantidade de filhos criados deve ser 2/3 da população
      const filhosQuantidade = Math.floor((ag.tamanhoPopulacao * 2) / 3);

      // Gera filhos até atingir a quantidade desejada
      for (let j = 0; j < filhosQuantidade; j++) {
          // Seleciona dois pais usando o método de seleção
          const [pai1, pai2] = ag.selecao();

          // Realiza o crossover para criar um novo filho
          let filho = ag.crossover(pai1, pai2);

          // Aplica a mutação ao filho gerado
          filho = ag.mutacao(filho, TAXA || 0.1);

          // Adiciona o filho à lista de filhos
          filhos.push(filho);
      }

      // Avalia a nova população com os filhos
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
          <PopulationDisplay populacao={populacao} />
        </React.Fragment>
      ))}
    </div>
  )
}

export default App
