const biblioteca = {
    livros: [],

    adicionarLivros(nome, autor, ano, genero, estoque) {
        const livro = {
            nome,
            autor,
            ano,
            genero,
            estoque,
            disponivel: true,
            alugado: false,
            vezesAlugado: 0
        };

        this.livros.push(livro);
    },

    mostrarLivros() {
        for (let i = 0; i < this.livros.length; i++) {
            const L = this.livros[i];
            console.log(L.nome);
            console.log(L.autor);
            console.log(L.ano);
            console.log(L.genero);
            console.log(L.disponivel);
            console.log(L.alugado);
            console.log(L.vezesAlugado);
            console.log(L.estoque);
        }
    },
    alugar(nome) {

    
        for (let i = 0; i < this.livros.length; i++) {
            const l = this.livros[i];
    
            if (l.nome === nome) {
    
                if (l.disponivel && l.estoque > 0) {
                    l.disponivel = false;
                    l.alugado = true;
                    l.estoque--;
                    l.vezesAlugado++;
    
                    console.log(nome + " alugado com sucesso");
                    return;
                }
    
                if (l.estoque <= 0) {
                    console.log("O " + nome + " está sem estoque");
                    return;
                }
    
                console.log("O " + nome + " não está disponível");
                return;
            }
        }
    
        console.log("Livro não encontrado");
    },
    devolver(nome){
        for(let i = 0; i < this.livros.length; i++){
            const l = this.livros[i];

            if(l.nome === nome){
                if(l.disponivel === false){
                    l.disponivel = true;
                    l.alugado = false;
                    l.estoque +=1;

                    

                    console.log(nome + " devolvido com sucesso");
                    return;
                }
                else{
                    console.log("O " + nome + " não está alugado");
                    return;
                }
            }
        }
        console.log("Livro não encontrado");
    } 
};

biblioteca.adicionarLivros(
    "Attack on Titan",
    "Hajime Isayama",
    2009,
    "Ação",
    3
);

biblioteca.adicionarLivros(
    "One Piece",
    "Eiichiro Oda",
    1997,
    "Aventura",
    3
);

biblioteca.adicionarLivros(
    "Naruto",
    "Masashi Kishimoto",
    1999,
    "Ação",
    3
);

biblioteca.adicionarLivros(
    "Jujutsu Kaisen",
    "Gege Akutami",
    2018,
    "Fantasia Sombria",
    3
);

biblioteca.adicionarLivros(
    "Demon Slayer",
    "Koyoharu Gotouge",
    2016,
    "Ação",
    3
);

console.log(biblioteca.livros);

// Exibe apenas os nomes dos mangás
biblioteca.mostrarLivros();

biblioteca.alugar("Attack on Titan")

