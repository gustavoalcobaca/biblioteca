const biblioteca = {
    livros: [],

    adicionarLivros(nome, autor, ano, genero) {
        const livro = {
            nome,
            autor,
            ano,
            genero,
            disponivel: true,
            alugado: false,
            vezesAlugado: 0
        };

        this.livros.push(livro);
    },

    mostrarLivros(){
        for(let i=0; i<this.livros.length; i++){
            const L= this.livros[i];
            console.log(L.nome);
        }
    }
};

biblioteca.adicionarLivros(
    "The Call of Cthulhu",
    "H. P. Lovecraft",
    1928,
    "terror cosmico"
);

biblioteca.adicionarLivros(
    "The Alchemist",
    "Paulo Coelho",
    1988,
    "Fantasia"
);

console.log(biblioteca.livros);