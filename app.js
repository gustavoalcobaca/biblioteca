// ====================================================================
// APP.JS - CONEXÃO ENTRE HTML E BIBLIOTECA
// ====================================================================
// Este arquivo é a "ponte" entre o HTML (a página que você vê) e o
// arquivo biblioteca.js (onde estão as regras de negócio).
// 
// O que ele faz:
// - Escuta eventos do usuário (cliques, submits de formulário)
// - Chama funções da biblioteca para processar os dados
// - Atualiza a tela com os resultados
//
// ALUNOS: Complete as funções marcadas com TODO
// ====================================================================

// "import" traz o objeto "biblioteca" do arquivo biblioteca.js para cá.
// É como dizer: "Pegue tudo que está lá e me deixe usar aqui".
import { biblioteca } from "./biblioteca.js";

// ====================================================================
// CONFIGURAÇÃO INICIAL - O que roda quando a página carrega
// ====================================================================

// addEventListener é como instalar uma "espiã" que fica esperando algo acontecer.
// 'DOMContentLoaded' significa: "espere até que o HTML inteiro tenha sido carregado".
// Só então executamos nosso código, porque precisamos que os elementos HTML existam.
document.addEventListener('DOMContentLoaded', function() {
    // console.log() mostra mensagens no "Console" do navegador (F12 > Console).
    // Serve para debug, como se fosse um "prints" para programador ver.
    console.log('🚀 Biblioteca carregada!');
    
    // Adiciona livros de exemplo para a biblioteca não começar vazia
    adicionarLivrosExemplo();
    
    // Monta a tabela de livros na tela pela primeira vez
    atualizarListaLivros();
});

// ====================================================================
// FUNÇÕES AUXILIARES - Fazem tarefas pequenas de apoio
// ====================================================================

// ----------------------------------------------------------------
// adicionarLivrosExemplo()
// Serve para preencher a biblioteca com livros de exemplo.
// Assim, quando a página carrega, já aparecem livros na tela.
// ----------------------------------------------------------------
function adicionarLivrosExemplo() {
    const exemplos = [
        { nome: "As 48 Leis do Poder", autor: "Robert Greene", genero: "Negócios", estoque: 210 },
        { nome: "Pai Rico, Pai Pobre", autor: "Robert Kiyosaki", genero: "Finanças", estoque: 150 },
        { nome: "O Homem Mais Rico da Babilônia", autor: "George S. Clason", genero: "Finanças", estoque: 120 },
        { nome: "Hábitos Atômicos", autor: "James Clear", genero: "Desenvolvimento Pessoal", estoque: 180 },
        { nome: "O Poder do Hábito", autor: "Charles Duhigg", genero: "Desenvolvimento Pessoal", estoque: 160 },
        { nome: "A Arte da Guerra", autor: "Sun Tzu", genero: "Estratégia", estoque: 90 },
        { nome: "O Príncipe", autor: "Nicolau Maquiavel", genero: "Política", estoque: 80 },
        { nome: "Mais Esperto que o Diabo", autor: "Napoleon Hill", genero: "Desenvolvimento Pessoal", estoque: 140 },
        { nome: "Pense e Enriqueça", autor: "Napoleon Hill", genero: "Finanças", estoque: 170 },
        { nome: "O Milagre da Manhã", autor: "Hal Elrod", genero: "Desenvolvimento Pessoal", estoque: 130 },
        { nome: "Quem Pensa Enriquece", autor: "Napoleon Hill", genero: "Finanças", estoque: 110 }
    ];
    
    // "for (let livro of exemplos)" é um loop (repetição).
    // Ele pega CADA item da lista "exemplos", um por um,
    // e guarda dentro da variável "livro" para usarmos.
    // Funciona assim:
    //   1ª volta: livro = { nome: "As 48 Leis do Poder", autor: "Robert Greene", ... }
    //   2ª volta: livro = { nome: "Pai Rico, Pai Pobre", autor: "Robert Kiyosaki", ... }
    //   ...e assim por diante até o fim da lista.
    for (let livro of exemplos) {
        // Chama a função adicionarLivros() que está dentro do objeto "biblioteca"
        // (lá no arquivo biblioteca.js). Passamos os dados do livro para ela
        // criar um novo livro dentro do sistema.
        biblioteca.adicionarLivros(livro.nome, livro.autor, livro.genero, livro.estoque);
    }
}

// ====================================================================
// FUNÇÕES PARA MOSTRAR DADOS NA TELA
// ====================================================================

// ----------------------------------------------------------------
// atualizarListaLivros()
// 
// Esta função monta a tabela de livros que aparece no HTML.
// Ela cria o código HTML "na mão" usando JavaScript e joga dentro
// da <div id="lista-livros"> que está no arquivo index.html.
// 
// RESUMO: Ela pega os livros da biblioteca e desenha a tabela.
// ----------------------------------------------------------------
function atualizarListaLivros() {
    // document.getElementById('lista-livros') procura no HTML um
    // elemento que tenha id="lista-livros" e guarda na variável.
    // É assim que o JS encontra um pedaço da página para mexer.
    const container = document.getElementById('lista-livros');
    
    // ".length" diz quantos itens tem dentro de uma lista (array).
    // Se o tamanho for ZERO (=== 0), significa que não há livros.
    if (biblioteca.livros.length === 0) {
        // innerHTML é o conteúdo HTML dentro do elemento.
        // Aqui estamos colocando uma mensagem dentro da div.
        container.innerHTML = `<p class="vazio">📭 Nenhum livro na biblioteca!</p>`;
        return; // "return" encerra a função aqui, não executa o resto.
    }
    
    // Criamos uma variável "html" que vai acumulando o código HTML
    // aos poucos. Começamos abrindo uma div com uma tabela dentro.
    let html = '<div class="tabela-livros">';
    html += `
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Autor</th>
                    <th>Genero</th>
                    <th>Estoque</th>
                    <th>Status</th>
                    <th>Aluguéis</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Outro tipo de loop: "for (let i = 0; i < ...; i++)"
    // i começa em 0, e vai aumentando de 1 em 1 (i++).
    // O loop roda enquanto i for MENOR que a quantidade de livros.
    // Usamos i como ÍNDICE para acessar cada posição da lista.
    for (let i = 0; i < biblioteca.livros.length; i++) {
        // biblioteca.livros[i] pega o livro na posição "i" da lista.
        // Exemplo: se i = 0, pega o PRIMEIRO livro.
        const livro = biblioteca.livros[i];

        // Operador ternário: condição ? valorSeVerdadeiro : valorSeFalso
        // É um "if" resumido em uma linha.
        // Se livro.estoque for true, mostra "✅ Disponível", senão mostra "❌ Alugado"
        const status = livro.estoque > 0 
        ? '✅ Disponível' 
        : '❌ Alugado';
        const statusClass = livro.estoque > 0 
        ? 'disponivel' 
        : 'alugado';
        
        // += significa "adicione isso ao que já existe na variável"
        // Estamos montando uma linha da tabela para cada livro.
        // ${...} é a "template string" - permite colocar variáveis
        // dentro do texto HTML.
        html += `
            <tr>
                <td>${i + 1}</td>
                <td><strong>${livro.nome}</strong></td>
                <td>${livro.autor}</td>
                <td>${livro.genero}</td>
                <td>${livro.estoque}/${livro.estoqueTotal}</td>
                <td class="${statusClass}">${status}</td>
                <td>${livro.vezesAlugado}</td>
            </tr>
        `;
    }
    
    // Depois do loop, fechamos a tabela e mostramos o total de livros
    html += `
            </tbody>
        </table>
        <p class="total">Total: ${biblioteca.livros.length} livros</p>
    </div>`;
    
    // Finalmente, jogamos todo o HTML montado dentro do container na página
    container.innerHTML = html;
}

// ----------------------------------------------------------------
// mostrarMensagem(mensagem, tipo)
// 
// Mostra uma mensagem temporária no topo da página.
// - mensagem: o texto que será exibido
// - tipo: 'sucesso' (verde), 'erro' (vermelho) ou 'info' (azul)
// 
// A mensagem some sozinha depois de 5 segundos.
// ----------------------------------------------------------------
function mostrarMensagem(mensagem, tipo = 'info') {
    const container = document.getElementById('mensagem');
    // Monta um HTML com a classe CSS do tipo (para estilizar a cor)
    container.innerHTML = `<div class="mensagem ${tipo}">${mensagem}</div>`;
    
    // setTimeout() executa uma função DEPOIS de um tempo (em milissegundos).
    // 5000ms = 5 segundos. Depois de 5s, limpa a mensagem da tela.
    setTimeout(() => {
        container.innerHTML = ''; // string vazia = apaga o conteúdo
    }, 5000);
}

// ====================================================================
// FUNÇÕES DOS BOTÕES
// ====================================================================
// Cada função abaixo é chamada quando o usuário clica em um botão
// no HTML. O atributo "onclick" no botão chama a função pelo nome.
// Exemplo: <button onclick="adicionarLivro(event)">Adicionar</button>
// ====================================================================

// ----------------------------------------------------------------
// 1. adicionarLivro(event)
// 
// Chamada quando o usuário envia o formulário de novo livro.
// Pega os dados digitados nos inputs do HTML, cria o livro
// na biblioteca e atualiza a tabela na tela.
// 
// "event" é o evento do formulário. event.preventDefault()
// impede a página de recarregar (comportamento padrão do form).
// ----------------------------------------------------------------
function adicionarLivro(event) {
    event.preventDefault(); // Impede a página de dar refresh
    
    // .value pega o que o usuário digitou dentro do input do HTML
    const nome = document.getElementById('nome').value;
    const autor = document.getElementById('autor').value;
    const genero = document.getElementById('Genero').value;
    const estoque = parseInt(document.getElementById('estoque').value);
    // parseInt() transforma texto em número inteiro. Ex: "5" vira 5
    
    // "!" significa "NÃO" ou "negação".
    // !nome quer dizer "se nome está vazio" (se não tem valor).
    // Se QUALQUER um dos campos estiver vazio, mostramos erro.
    if (!nome || !autor || !genero || !estoque) {
        mostrarMensagem('❌ Preencha todos os campos!', 'erro');
        return; // Sai da função, não executa o que vem depois
    }
    
    // Chama a função da biblioteca para adicionar o livro no sistema
    biblioteca.adicionarLivros(nome, autor, genero, estoque);
    mostrarMensagem(`✅ Livro "${nome}" adicionado com sucesso!`, 'sucesso');
    atualizarListaLivros(); // Re-desenha a tabela com o novo livro
    document.getElementById('form-livro').reset(); // Limpa os campos do formulário
}

// ----------------------------------------------------------------
// 2. mostrarTodos()
// 
// Mostra TODOS os livros da biblioteca na tela.
// Simplesmente chama a função que já monta a tabela completa.
// ----------------------------------------------------------------
function mostrarTodos() {
    atualizarListaLivros();
}

// ----------------------------------------------------------------
// 3. mostrarDisponiveis()
// 
// Mostra APENAS os livros que NÃO estão alugados (disponíveis).
// Precisa ser implementada pelos alunos.
// ----------------------------------------------------------------
function mostrarDisponiveis() {

    const container = document.getElementById('lista-livros');
    const disponiveis = biblioteca.livrosDisponiveis();

    if (disponiveis.length === 0) {
        container.innerHTML = `<p class="vazio">📭 Nenhum livro disponível!</p>`;
        return;
    }

    let html = '<div class="tabela-livros">';

    html += `
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Autor</th>
                    <th>Gênero</th>
                    <th>Estoque</th>
                    <th>Status</th>
                    <th>Aluguéis</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < disponiveis.length; i++) {

        const livro = disponiveis[i];

        html += `
            <tr>
                <td>${i + 1}</td>
                <td><strong>${livro.nome}</strong></td>
                <td>${livro.autor}</td>
                <td>${livro.genero}</td>
                <td>${livro.estoque}/${livro.estoqueTotal}</td>
                <td class="disponivel">✅ Disponível</td>
                <td>${livro.vezesAlugado}</td>
            </tr>
        `;
    }

    html += `
            </tbody>
        </table>
        <p class="total">Total de livros disponíveis: ${disponiveis.length}</p>
    </div>
    `;

    container.innerHTML = html;
}    
    // 1. Chamar biblioteca.livrosDisponiveis() e guardar o resultado
    // 2. Verificar se tem livros disponíveis
    // 3. Mostrar na tela usando o container
    // 
    // DICA: O resultado de biblioteca.livrosDisponiveis() é um array (lista)
    // DICA: Use um loop for para percorrer o array
    // DICA: Se não tiver livros, mostrar mensagem "Nenhum livro disponível!"
    
    const container = document.getElementById('lista-livros');
    // Exemplo de como começar:
    // const disponiveis = biblioteca.livrosDisponiveis();
    // if (disponiveis.length === 0) { ... }


// ----------------------------------------------------------------
// 4. alugarLivro()
// 
// Pega o nome do livro que o usuário digitou e chama a função
// de alugar na biblioteca.
// ----------------------------------------------------------------
function alugarLivro() {

    const nome = document.getElementById('alugar-nome').value;

    if (!nome) {
        mostrarMensagem('❌ Digite o nome do livro!', 'erro');
        return;
    }

    const alugado = biblioteca.alugar(nome);

    if (alugado) {
        mostrarMensagem(`✅ "${nome}" alugado com sucesso!`, 'sucesso');
    } else {
        mostrarMensagem(`❌ Não foi possível alugar "${nome}".`, 'erro');
    }

    atualizarListaLivros();

    document.getElementById('alugar-nome').value = '';
}    // TODO: Implementar a função
    // 1. Pegar o valor do input 'alugar-nome'
    // 2. Chamar biblioteca.alugar(nome)
    // 3. Mostrar mensagem de sucesso ou erro
    // 4. Atualizar a lista de livros
    // 5. Limpar o input
    
    // DICA: Use document.getElementById('alugar-nome').value
    // DICA: Use mostrarMensagem() para mostrar resultados


// ----------------------------------------------------------------
// 5. devolverLivro()
// 
// Pega o nome do livro que o usuário digitou e chama a função
// de devolver na biblioteca.
// ----------------------------------------------------------------
function devolverLivro() {

    const nome = document.getElementById('devolver-nome').value;

    if (!nome) {
        mostrarMensagem('❌ Digite o nome do livro!', 'erro');
        return;
    }

    const devolvido = biblioteca.devolver(nome);

    if (devolvido) {
        mostrarMensagem(`✅ "${nome}" devolvido com sucesso!`, 'sucesso');
    } else {
        mostrarMensagem(`❌ Não foi possível devolver "${nome}".`, 'erro');
    }

    atualizarListaLivros();

    document.getElementById('devolver-nome').value = '';
}    // TODO: Implementar a função
    // 1. Pegar o valor do input 'devolver-nome'
    // 2. Chamar biblioteca.devolver(nome)
    // 3. Mostrar mensagem de sucesso ou erro
    // 4. Atualizar a lista de livros
    // 5. Limpar o input
    
    // Similar ao alugarLivro()


// ----------------------------------------------------------------
// 6. buscarLivro()
// 
// Procura um livro pelo nome e mostra os detalhes dele na tela.
// ----------------------------------------------------------------
function buscarLivro() {

    const nome = document.getElementById('buscar-nome').value;
    const container = document.getElementById('lista-livros');

    if (!nome) {
        mostrarMensagem('❌ Digite o nome do livro!', 'erro');
        return;
    }

    const livro = biblioteca.buscarLivro(nome);

    if (!livro) {
        mostrarMensagem('❌ Livro não encontrado!', 'erro');
        return;
    }

    container.innerHTML = `
        <div class="tabela-livros">
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Autor</th>
                        <th>Gênero</th>
                        <th>Estoque</th>
                        <th>Alugados</th>
                        <th>Vezes Alugado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>${livro.nome}</strong></td>
                        <td>${livro.autor}</td>
                        <td>${livro.genero}</td>
                        <td>${livro.estoque}/${livro.estoqueTotal}</td>
                        <td>${livro.alugados}</td>
                        <td>${livro.vezesAlugado}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    mostrarMensagem('✅ Livro encontrado!', 'sucesso');

    document.getElementById('buscar-nome').value = '';
}    // TODO: Implementar a função
    // 1. Pegar o valor do input 'buscar-nome'
    // 2. Chamar biblioteca.buscarLivro(nome)
    // 3. Se encontrar, mostrar detalhes do livro na tela
    // 4. Se não encontrar, mostrar mensagem de erro
    
    // DICA: Use document.getElementById('buscar-nome').value
    // Exemplo de como começar:
    // const nome = document.getElementById('buscar-nome').value;
    // const livro = biblioteca.buscarLivro(nome);
    // if (livro) { ... }


// ----------------------------------------------------------------
// 7. mostrarEstatisticas()
// 
// Mostra dados resumidos da biblioteca: total de livros,
// quantos estão disponíveis, quantos alugados, etc.
// ----------------------------------------------------------------
function mostrarEstatisticas() {

    const container = document.getElementById('lista-livros');

    const stats = biblioteca.estatisticas();

    if (stats.totalLivros === 0) {
        container.innerHTML = `<p class="vazio">📭 Nenhum livro cadastrado!</p>`;
        return;
    }

    container.innerHTML = `
        <div class="estatisticas">
            <h2>📊 Estatísticas da Biblioteca</h2>

            <p><strong>Total de livros:</strong> ${stats.totalLivros}</p>

            <p><strong>Total de exemplares:</strong> ${stats.totalExemplares}</p>

            <p><strong>Exemplares disponíveis:</strong> ${stats.disponiveis}</p>

            <p><strong>Exemplares alugados:</strong> ${stats.alugados}</p>

            <p><strong>Livro mais alugado:</strong> ${
                stats.maisAlugado
                    ? stats.maisAlugado.nome + " (" + stats.maisAlugado.vezesAlugado + " aluguel(is))"
                    : "Nenhum"
            }</p>
        </div>
    `;
}    // TODO: Implementar a função
    // 1. Chamar biblioteca.estatisticas() e guardar o resultado
    // 2. Mostrar todos os dados formatados na tela
    // 3. Se não houver livros, mostrar mensagem
    // Exemplo de como começar:
    // const stats = biblioteca.estatisticas();
    // if (stats) {
    //     Mostrar stats.total, stats.disponiveis, etc.
    // }


// ----------------------------------------------------------------
// 8. removerLivro()
// 
// Remove um livro da biblioteca pelo nome.
// ----------------------------------------------------------------
function removerLivro() {

    const nome = document.getElementById('remover-nome').value;

    if (!nome) {
        mostrarMensagem('❌ Digite o nome do livro!', 'erro');
        return;
    }

    const removido = biblioteca.removerLivro(nome);

    if (removido) {
        mostrarMensagem(`✅ Livro "${nome}" removido com sucesso!`, 'sucesso');
    } else {
        mostrarMensagem(`❌ Livro "${nome}" não encontrado!`, 'erro');
    }

    atualizarListaLivros();

    document.getElementById('remover-nome').value = '';
}    // TODO: Implementar a função
    // 1. Pegar o valor do input 'remover-nome'
    // 2. Chamar biblioteca.removerLivro(nome)
    // 3. Mostrar mensagem de sucesso ou erro
    // 4. Atualizar a lista de livros
    // 5. Limpar o input


// ====================================================================
// EXPORTANDO FUNÇÕES PARA O HTML
// ====================================================================
// 
// O HTML não consegue enxergar funções que estão dentro de arquivos .js
// a não ser que as coloquemos no objeto "window".
// 
// window é um objeto especial que representa a janela do navegador.
// Quando fazemos "window.nomeDaFuncao = nomeDaFuncao", estamos dizendo:
// "Disponibilize esta função globalmente para o HTML poder usá-la".
//
// No HTML, usamos: onclick="adicionarLivro(event)" ou onclick="mostrarTodos()"
// ====================================================================

// Já prontas - os botões destas funções já funcionam
window.adicionarLivro = adicionarLivro;
window.mostrarTodos = mostrarTodos;
window.mostrarDisponiveis = mostrarDisponiveis;

// TODO - Alunos completam (depois de implementar, estas linhas vão funcionar)
window.alugarLivro = alugarLivro;
window.devolverLivro = devolverLivro;
window.buscarLivro = buscarLivro;
window.mostrarEstatisticas = mostrarEstatisticas;
window.removerLivro = removerLivro;

// ----------------------------------------------------------------
// Evento do formulário de adicionar livro
// 
// Aqui usamos addEventListener em vez de onclick no HTML.
// Quando o formulário <form id="form-livro"> for enviado (submit),
// a função adicionarLivro() é chamada automaticamente.
// ----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-livro');
    if (form) { // Só adiciona o evento se o formulário existir na página
        form.addEventListener('submit', adicionarLivro);
    }
});