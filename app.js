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
// ----------------------------------------------------------------
function atualizarListaLivros() {
    const container = document.getElementById('lista-livros');
    
    if (biblioteca.livros.length === 0) {
        container.innerHTML = `<p class="vazio">📭 Nenhum livro na biblioteca!</p>`;
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
                    <th>Genero</th>
                    <th>Estoque</th>
                    <th>Status</th>
                    <th>Aluguéis</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for (let i = 0; i < biblioteca.livros.length; i++) {
        const livro = biblioteca.livros[i];

        const status = livro.estoque > 0 ? '✅ Disponível' : '❌ Alugado';
        const statusClass = livro.estoque > 0 ? 'disponivel' : 'alugado';
        
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
    
    html += `
            </tbody>
        </table>
        <p class="total">Total: ${biblioteca.livros.length} livros</p>
    </div>`;
    
    container.innerHTML = html;
}

// ----------------------------------------------------------------
// mostrarMensagem(mensagem, tipo)
// Mostra uma mensagem temporária no topo da página.
// ----------------------------------------------------------------
function mostrarMensagem(mensagem, tipo = 'info') {
    const container = document.getElementById('mensagem');
    container.innerHTML = `<div class="mensagem ${tipo}">${mensagem}</div>`;
    
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// ====================================================================
// FUNÇÕES DOS BOTÕES
// ====================================================================

// ----------------------------------------------------------------
// 1. adicionarLivro(event)
// ----------------------------------------------------------------
function adicionarLivro(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const autor = document.getElementById('autor').value;
    const genero = document.getElementById('Genero').value;
    const estoque = parseInt(document.getElementById('estoque').value);
    
    if (!nome || !autor || !genero || isNaN(estoque)) {
        mostrarMensagem('❌ Preencha todos os campos!', 'erro');
        return;
    }
    
    biblioteca.adicionarLivros(nome, autor, genero, estoque);
    mostrarMensagem(`✅ Livro "${nome}" adicionado com sucesso!`, 'sucesso');
    atualizarListaLivros();
    document.getElementById('form-livro').reset();
}

// ----------------------------------------------------------------
// 2. mostrarTodos()
// ----------------------------------------------------------------
function mostrarTodos() {
    atualizarListaLivros();
}

// ----------------------------------------------------------------
// 3. mostrarDisponiveis()
// ----------------------------------------------------------------
function mostrarDisponiveis() {
    // 1. Chamar biblioteca.livros e filtrar os que possuem estoque > 0
    const disponiveis = biblioteca.livros.filter(livro => livro.estoque > 0);
    const container = document.getElementById('lista-livros');
    
    // 2. Verificar se tem livros disponíveis
    if (disponiveis.length === 0) {
        container.innerHTML = `<p class="vazio">📭 Nenhum livro disponível no momento!</p>`;
        return;
    }
    
    // 3. Mostrar na tela usando o container
    let html = '<div class="tabela-livros"><h3>Livros Disponíveis</h3><table><thead><tr><th>#</th><th>Nome</th><th>Autor</th><th>Genero</th><th>Estoque</th></tr></thead><tbody>';
    
    for (let i = 0; i < disponiveis.length; i++) {
        const livro = disponiveis[i];
        html += `
            <tr>
                <td>${i + 1}</td>
                <td><strong>${livro.nome}</strong></td>
                <td>${livro.autor}</td>
                <td>${livro.genero}</td>
                <td>${livro.estoque}/${livro.estoqueTotal}</td>
            </tr>
        `;
    }
    
    html += '</tbody></table></div>';
    container.innerHTML = html;
}

// ----------------------------------------------------------------
// 4. alugarLivro()
// ----------------------------------------------------------------
function alugarLivro() {
    // 1. Pegar o valor do input 'alugar-nome'
    const input = document.getElementById('alugar-nome');
    const nome = input.value;
    
    if (!nome) {
        mostrarMensagem('❌ Digite o nome do livro para alugar!', 'erro');
        return;
    }
    
    // 2. Chamar biblioteca.alugar(nome)
    const sucesso = biblioteca.alugar(nome);
    
    // 3. Mostrar mensagem de sucesso ou erro
    if (sucesso) {
        mostrarMensagem(`✅ Livro "${nome}" alugado com sucesso!`, 'sucesso');
        // 4. Atualizar a lista de livros
        atualizarListaLivros();
    } else {
        mostrarMensagem(`❌ Não foi possível alugar o livro "${nome}". Verifique o estoque ou o nome.`, 'erro');
    }
    
    // 5. Limpar o input
    input.value = '';
}

// ----------------------------------------------------------------
// 5. devolverLivro()
// ----------------------------------------------------------------
function devolverLivro() {
    // 1. Pegar o valor do input 'devolver-nome'
    const input = document.getElementById('devolver-nome');
    const nome = input.value;
    
    if (!nome) {
        mostrarMensagem('❌ Digite o nome do livro para devolver!', 'erro');
        return;
    }
    
    // 2. Chamar biblioteca.devolver(nome)
    const sucesso = biblioteca.devolver(nome);
    
    // 3. Mostrar mensagem de sucesso ou erro
    if (sucesso) {
        mostrarMensagem(`✅ Livro "${nome}" devolvido com sucesso!`, 'sucesso');
        // 4. Atualizar a lista de livros
        atualizarListaLivros();
    } else {
        mostrarMensagem(`❌ Não foi possível devolver o livro "${nome}".`, 'erro');
    }
    
    // 5. Limpar o input
    input.value = '';
}

// ----------------------------------------------------------------
// 6. buscarLivro()
// ----------------------------------------------------------------
function buscarLivro() {
    const container = document.getElementById('lista-livros');
    // 1. Pegar o valor do input 'buscar-nome'
    const nome = document.getElementById('buscar-nome').value;
    
    if (!nome) {
        mostrarMensagem('❌ Digite um nome para buscar!', 'erro');
        return;
    }
    
    // 2. Chamar biblioteca.buscar(nome) [Ajustado para bater com seu biblioteca.js]
    const livro = biblioteca.buscar(nome);
    
    // 3. Se encontrar, mostrar detalhes do livro na tela
    if (livro) {
        container.innerHTML = `
            <div class="busca-resultado">
                <h3>🔍 Livro Encontrado</h3>
                <p><strong>Nome:</strong> ${livro.nome}</p>
                <p><strong>Autor:</strong> ${livro.autor}</p>
                <p><strong>Gênero:</strong> ${livro.genero}</p>
                <p><strong>Estoque Atual:</strong> ${livro.estoque} de ${livro.estoqueTotal}</p>
                <p><strong>Vezes Alugado:</strong> ${livro.vezesAlugado}</p>
                <button onclick="mostrarTodos()" style="margin-top: 10px;">Voltar para a Lista Completa</button>
            </div>
        `;
    } else {
        // 4. Se não encontrar, mostrar mensagem de erro
        mostrarMensagem(`❌ O livro "${nome}" não foi encontrado.`, 'erro');
    }
}

// ----------------------------------------------------------------
// 7. mostrarEstatisticas()
// ----------------------------------------------------------------
function mostrarEstatisticas() {
    const container = document.getElementById('lista-livros');
    
    if (biblioteca.livros.length === 0) {
        container.innerHTML = `<p class="vazio">📭 Sem dados disponíveis. Adicione livros primeiro!</p>`;
        return;
    }
    
    // Como você não criou o método estatisticas() no biblioteca.js, calculamos aqui diretamente:
    let totalLivrosDiferentes = biblioteca.livros.length;
    let estoqueTotalGeral = 0;
    let totalAlugadosAgora = 0;
    
    for (let livro of biblioteca.livros) {
        estoqueTotalGeral += livro.estoqueTotal;
        totalAlugadosAgora += livro.alugados;
    }
    
    // 2. Mostrar todos os dados formatados na tela
    container.innerHTML = `
        <div class="estatisticas-box">
            <h3>📊 Estatísticas Globais da Biblioteca</h3>
            <p>📚 <strong>Títulos Diferentes Cadastrados:</strong> ${totalLivrosDiferentes}</p>
            <p>📦 <strong>Total de Exemplares em Estoque Físico:</strong> ${estoqueTotalGeral}</p>
            <p>🤝 <strong>Livros Alugados no Momento:</strong> ${totalAlugadosAgora}</p>
            <button onclick="mostrarTodos()" style="margin-top: 15px;">Voltar para a Lista Completa</button>
        </div>
    `;
}

// ----------------------------------------------------------------
// 8. removerLivro()
// ----------------------------------------------------------------
function removerLivro() {
    // 1. Pegar o valor do input 'remover-nome'
    const input = document.getElementById('remover-nome');
    const nome = input.value;
    
    if (!nome) {
        mostrarMensagem('❌ Digite o nome do livro para remover!', 'erro');
        return;
    }
    
    // Salva o tamanho da lista antes de tentar remover
    const totalAntes = biblioteca.livros.length;
    
    // 2. Chamar biblioteca.removerLivro(nome)
    biblioteca.removerLivro(nome);
    
    // 3. Mostrar mensagem de sucesso ou erro testando se a lista diminuiu
    if (biblioteca.livros.length < totalAntes) {
        mostrarMensagem(`🗑️ Livro "${nome}" removido com sucesso!`, 'sucesso');
        // 4. Atualizar a lista de livros
        atualizarListaLivros();
    } else {
        mostrarMensagem(`❌ Livro "${nome}" não encontrado para remoção.`, 'erro');
    }
    
    // 5. Limpar o input
    input.value = '';
}

// ====================================================================
// EXPORTANDO FUNÇÕES PARA O HTML
window.mostrarTodos = mostrarTodos;
window.mostrarDisponiveis = mostrarDisponiveis;
window.mostrarEstatisticas = mostrarEstatisticas;
window.alugarLivro = alugarLivro;
window.devolverLivro = devolverLivro;
window.buscarLivro = buscarLivro;
window.removerLivro = removerLivro;