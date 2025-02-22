// URL da API
const apiUrl = 'http://localhost:3000/api/projeto';
const pageUrl = 'http://localhost:3000/projeto'

// Função para buscar e exibir os projetos
async function carregarProjetos() {
    try {
        const resposta = await fetch(apiUrl);
        const projetos = await resposta.json();
        
        const listaDeProjetos = document.getElementById('listaDeProjetos');
        listaDeProjetos.innerHTML = '';

        // Itera sobre os projetos e cria cartões para cada um
        projetos.forEach(projeto => {
            const card = document.createElement('div');
            card.classList.add('projeto-card');

            card.innerHTML = `
                <div class="projeto-titulo"><a href="${pageUrl}/${projeto.idProjeto}">${projeto.tituloProjeto}</a></div>
                <div class="projeto-descricao">${projeto.descricaoDoProjeto}</div>
                <div class="projeto-data">Data: ${new Date(projeto.dataDoProjeto + 'T00:00:00').toLocaleDateString('pt-BR')}</div>
                <div class="projeto-links">
                    <a href="${projeto.linkDoModeloConceitual}" target="_blank">Modelo Conceitual</a> | 
                    <a href="${projeto.linkDoModeloLogico}" target="_blank">Modelo Lógico</a> | 
                    <a href="${projeto.linkDoGithub}" target="_blank">Github</a>
                </div>
            `;
            listaDeProjetos.appendChild(card);
        });

    } catch (error) {
        console.error('Erro ao carregar os projetos:', error);
    }
}

// Função para redirecionar para a página de cadastro
function irParaCadastro() {
    window.location.href = "http://localhost:3000/cadastroDeProjeto";
}

// Carrega os projetos ao iniciar a página
carregarProjetos();
