import { Besouro } from "./Besouro";

export class AlgoritmoGenetico {
    #populacoes: Besouro[][] = [];

    constructor(tamanhoPopulacao: number = 5) {
        this.#populacoes.push(this.iniciaPopulacao(tamanhoPopulacao));
    }

    get populacoes() {
        return this.#populacoes;
    }

    get ultimaPopulacao(): Besouro[] {
        return this.#populacoes[this.#populacoes.length - 1];
    }

    get tamanhoPopulacao(): number {
        return this.ultimaPopulacao.length;
    }

    private iniciaPopulacao(tamanhoPopulacao: number): Besouro[] {
        return Array.from({ length: tamanhoPopulacao }, () => ({
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256),
            aptidao: 0,
        }));
    }

    avaliacao() {
        const populacao = this.ultimaPopulacao.map(individuo => ({
            ...individuo,
            aptidao: (individuo.r + individuo.g + individuo.b) / 765,
        }));
        this.#populacoes[this.#populacoes.length - 1] = populacao;
    }

    selecao(): [Besouro, Besouro] {
        const populacao = this.ultimaPopulacao;
        const somaAptidao = populacao.reduce((acc, { aptidao }) => acc + aptidao, 0);

        const selecionarIndividuo = () => {
            let somaParcial = 0;
            const valorRoleta = Math.random() * somaAptidao;
            return populacao.find(({ aptidao }) => (somaParcial += aptidao) >= valorRoleta) || populacao[populacao.length - 1];
        };

        const pai1 = selecionarIndividuo();
        let pai2;
        do {
            pai2 = selecionarIndividuo();
        } while (pai1 === pai2);

        return [pai1, pai2];
    }

    crossover(pai1: Besouro, pai2: Besouro): [Besouro, Besouro] {
        return [
            { r: pai1.r, g: pai2.g, b: pai2.b, aptidao: 0 },
            { r: pai2.r, g: pai1.g, b: pai1.b, aptidao: 0 }
        ];
    }

    mutacao(individuo: Besouro, taxaMutacao: number): Besouro {
        const valorAleatorio = Math.random();
    
        if (valorAleatorio <= taxaMutacao) {
            const numeroGeneAleatorio = Math.random() * 3;
            let numeroGene;
    
            if (numeroGeneAleatorio < 1) {
                numeroGene = 0;
            } else if (numeroGeneAleatorio < 2) {
                numeroGene = 1;
            } else {
                numeroGene = 2;
            }
    
            // Mutação do gene r, g ou b com verificação de limites
            if (numeroGene === 0) {
                const novoR = Math.floor(individuo.r + (Math.random() * 101 - 50));
                if (novoR < 0) {
                    individuo.r = 0;
                } else if (novoR > 255) {
                    individuo.r = 255;
                } else {
                    individuo.r = novoR;
                }
            } else if (numeroGene === 1) {
                const novoG = Math.floor(individuo.g + (Math.random() * 101 - 50));
                if (novoG < 0) {
                    individuo.g = 0;
                } else if (novoG > 255) {
                    individuo.g = 255;
                } else {
                    individuo.g = novoG;
                }
            } else {
                const novoB = Math.floor(individuo.b + (Math.random() * 101 - 50));
                if (novoB < 0) {
                    individuo.b = 0;
                } else if (novoB > 255) {
                    individuo.b = 255;
                } else {
                    individuo.b = novoB;
                }
            }
        }
    
        return individuo;
    }        

    private selecionarElite(): Besouro[] {
        return this.ultimaPopulacao
            .sort((a, b) => b.aptidao - a.aptidao)
            .slice(0, Math.ceil(this.tamanhoPopulacao / 3));
    }

    gerarNovaPopulacao(filhos: Besouro[]) {
        const novaPopulacao = [...this.selecionarElite(), ...filhos];
        this.#populacoes.push(novaPopulacao);
    }
}