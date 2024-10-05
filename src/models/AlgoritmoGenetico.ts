import { Besouro } from "./Besouro";

export interface CorAlvo {
    r: number;
    g: number;
    b: number;
}

export class AlgoritmoGenetico {
    #populacoes: Besouro[][] = [];
    #corAlvo: CorAlvo;

    constructor(tamanhoPopulacao: number = 5, corAlvo: CorAlvo) {
        this.#corAlvo = corAlvo;
        this.#populacoes.push(this.iniciaPopulacao(tamanhoPopulacao));
    }

    get ultimaPopulacao(): Besouro[] {
        return this.#populacoes[this.#populacoes.length - 1];
    }

    iniciaPopulacao(tamanhoPopulacao: number): Besouro[] {
        return Array.from({ length: tamanhoPopulacao }, (): Besouro => ({
        r: Math.random() * 256 | 0,
        g: Math.random() * 256 | 0,
        b: Math.random() * 256 | 0,
        aptidao: 0
        }));
    }

    avaliacao() {
        const populacao = this.ultimaPopulacao.map(individuo => {
            const distancia = Math.sqrt(
                Math.pow(individuo.r - this.#corAlvo.r, 2) +
                Math.pow(individuo.g - this.#corAlvo.g, 2) +
                Math.pow(individuo.b - this.#corAlvo.b, 2)
            );
            return {
                ...individuo,
                aptidao: 1 - distancia / (Math.sqrt(3 * Math.pow(255, 2)))
            };
        });
    
        this.#populacoes[this.#populacoes.length - 1] = populacao;
    }

    selecao(): [Besouro, Besouro] {
        const torneio: Besouro[] = this.ultimaPopulacao
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.ceil(this.ultimaPopulacao.length / 3));

        return torneio
        .sort((a, b) => b.aptidao - a.aptidao)
        .slice(0, 2) as [Besouro, Besouro];
    }

    crossover(pai1: Besouro, pai2: Besouro): [Besouro, Besouro] {
        return [
        { r: pai1.r, g: pai2.g, b: pai2.b, aptidao: 0 },
        { r: pai2.r, g: pai1.g, b: pai1.b, aptidao: 0 }
        ];
    }

    mutacao(individuo: Besouro, taxa: number): Besouro {
        if (Math.random() <= taxa) {
            const gene = ['r', 'g', 'b'][Math.random() * 3 | 0] as keyof Besouro;
            let novoValor = individuo[gene] + (Math.random() * 101 - 50 | 0);

            if (novoValor < 0) {
                novoValor = 0;
            } else if (novoValor > 255) {
                novoValor = 255;
            }
    
            individuo[gene] = novoValor;
        }
        return individuo;
    }
    

    gerarNovaPopulacao(filhos: Besouro[]): void {
        const elite: Besouro[] = this.ultimaPopulacao.slice(0, Math.ceil(this.ultimaPopulacao.length / 3));
        this.#populacoes.push([...elite, ...filhos]);
    }
}