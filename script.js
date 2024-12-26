class Grafo {
    constructor() {
        this.grafo = {};
    }

    adicionar_aresta(u, v) {
        if (!this.grafo[u]) this.grafo[u] = [];
        if (!this.grafo[v]) this.grafo[v] = [];
        this.grafo[u].push(v);
        this.grafo[v].push(u);
    }

    numero_de_vertices() {
        return Object.keys(this.grafo).length;
    }

    numero_de_arestas() {
        let arestas = 0;
        for (const v in this.grafo) {
            arestas += this.grafo[v].length;
        }
        return arestas / 2; // Dividir por 2 pois cada aresta é contada duas vezes
    }

    ordem_do_grafo() {
        return this.numero_de_vertices();
    }

    vizinhanca_fechada(v) {
        if (!this.grafo[v]) return [];
        const vizinhos = new Set(this.grafo[v]);
        vizinhos.add(v);
        return [...vizinhos];
    }

    e_regular() {
        const graus = Object.values(this.grafo).map(v => v.length);
        return graus.every(grau => grau === graus[0]);
    }

    grau_maximo_e_minimo() {
        const graus = Object.fromEntries(Object.entries(this.grafo).map(([v, adj]) => [v, adj.length]));
        const grau_maximo = Math.max(...Object.values(graus));
        const grau_minimo = Math.min(...Object.values(graus));
        const vertices_grau_maximo = Object.keys(graus).filter(v => graus[v] === grau_maximo);
        const vertices_grau_minimo = Object.keys(graus).filter(v => graus[v] === grau_minimo);
        return { grau_maximo, vertices_grau_maximo, grau_minimo, vertices_grau_minimo };
    }
}

// Criando o grafo 
const grafo = new Grafo();
const arestas = [
    [0, 1], [1, 2], [1, 3], [2, 4], [3, 4], 
    [2, 6], [6, 5], [5, 7], [6, 7], [7, 8], [8, 9]
];
arestas.forEach(([u, v]) => grafo.adicionar_aresta(u, v));

// Atualizando o HTML com as informações do grafo
document.getElementById('numero-vertices').textContent = grafo.numero_de_vertices();
document.getElementById('numero-arestas').textContent = grafo.numero_de_arestas();
document.getElementById('ordem-grafo').textContent = grafo.ordem_do_grafo();
document.getElementById('vizinhanca-7').textContent = grafo.vizinhanca_fechada(7).join(', ');
document.getElementById('grafo-regular').textContent = grafo.e_regular() ? 'Sim' : 'Não';

const { grau_maximo, vertices_grau_maximo, grau_minimo, vertices_grau_minimo } = grafo.grau_maximo_e_minimo();
document.getElementById('grau-maximo').textContent = grau_maximo;
document.getElementById('vertices-grau-maximo').textContent = vertices_grau_maximo.join(', ');
document.getElementById('grau-minimo').textContent = grau_minimo;
document.getElementById('vertices-grau-minimo').textContent = vertices_grau_minimo.join(', ');
