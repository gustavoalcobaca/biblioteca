export const biblioteca = {
    livros: [],

    adicionarLivros(nome, autor, genero, estoque) {
        const livro = {
            nome,
            autor,
            genero,
            estoque,
            estoqueTotal: estoque,
            alugados: 0,
            vezesAlugado: 0
        };

        this.livros.push(livro);
        return true;
    },

    mostrarLivros() {
        console.log("=== LISTA DE LIVROS ===");

        for (let i = 0; i < this.livros.length; i++) {
            const livro = this.livros[i];

            console.log(
                `${i + 1}. ${livro.nome} - ${livro.autor} | ${livro.genero} | Alugado ${livro.vezesAlugado}x | Estoque: ${livro.estoque}/${livro.estoqueTotal}`
            );
        }
    },

    mostrarTabela() {
        console.table(this.livros);
    },

    alugar(nome) {
        for (let i = 0; i < this.livros.length; i++) {
            const l = this.livros[i];

            if (l.nome.toLowerCase() === nome.toLowerCase()) {

                if (l.estoque > 0) {
                    l.estoque--;
                    l.alugados++;
                    l.vezesAlugado++;

                    console.log(nome + " alugado com sucesso!");
                    return true;
                }

                console.log("O livro " + nome + " está sem estoque.");
                return false;
            }
        }

        console.log("Livro não encontrado.");
        return false;
    },

    devolver(nome) {
        for (let i = 0; i < this.livros.length; i++) {
            const l = this.livros[i];

            if (l.nome.toLowerCase() === nome.toLowerCase()) {

                if (l.alugados > 0) {
                    l.alugados--;
                    l.estoque++;

                    console.log(nome + " devolvido com sucesso!");
                    return true;
                }

                console.log("Nenhum exemplar de " + nome + " está alugado.");
                return false;
            }
        }

        console.log("Livro não encontrado.");
        return false;
    },
    removerLivro(nome){
        for(let i = 0; i < this.livros.length; i++){
            if(this.livros[i].nome.toLowerCase() === nome.toLowerCase()){
                const removido = this.livros[i]
                this.livros.splice(i,1);
                console.log("Livro removido", removido.nome);
                return;
}} console.log("Livro não encontrado");
},
buscar(nome){
    for(let i = 0; i<this.livros.length; i++){
        const l = this.livros[i]
        if(l.nome.toLowerCase() === nome.toLowerCase()){
            console.log("Livro encontrado:");
                console.log(l);
            return l;
        }
    }
    console.log("Livro não encontrado")
    return null
}

};

// Adicionando livros
biblioteca.adicionarLivros(
    "Attack on Titan",
    "Hajime Isayama",
    "Ação",
    3
);

biblioteca.adicionarLivros(
    "One Piece",
    "Eiichiro Oda",
    "Aventura",
    3
);

biblioteca.adicionarLivros(
    "Naruto",
    "Masashi Kishimoto",
    "Ação",
    3
);

biblioteca.adicionarLivros(
    "Jujutsu Kaisen",
    "Gege Akutami",
    "Fantasia Sombria",
    3
);

biblioteca.adicionarLivros(
    "Demon Slayer",
    "Koyoharu Gotouge",
    "Ação",
    3
);

// Mostrar livros
biblioteca.mostrarLivros();

// Alugar
biblioteca.alugar("Attack on Titan");
biblioteca.alugar("Attack on Titan");
biblioteca.alugar("Attack on Titan");

// Devolver
biblioteca.devolver("Attack on Titan");
biblioteca.devolver("Attack on Titan");
biblioteca.devolver("Attack on Titan");


// Mostrar novamente
biblioteca.mostrarLivros();

//remover
biblioteca.removerLivro("Jujutsu Kaisen");

//buscar
biblioteca.buscar("Demon Slayer");

biblioteca.mostrarTabela();
biblioteca.mostrarLivros();