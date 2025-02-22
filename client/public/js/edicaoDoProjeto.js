const apiUrl = 'http://localhost:3000/api/projeto'

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const projetoId = window.location.pathname.split('/').pop(); // Obtém o ID do projeto da URL

        const apiUrlCompleta = apiUrl + '/' + projetoId
        
        const resposta = await fetch(apiUrlCompleta);

        const projetos = await resposta.json();

        // Carregar os dados do projeto para edição
        fetch(`/api/projeto/${projetoId}`)
            .then(response => response.json())
            .then(projeto => {
                document.getElementById('tituloProjeto').value = projeto.tituloProjeto;
                document.getElementById('descricaoProjeto').value = projeto.descricaoDoProjeto;
                document.getElementById('data').value = projeto.dataDoProjeto;
                document.getElementById('modeloConceitual').value = projeto.linkDoModeloConceitual;
                document.getElementById('modeloLogico').value = projeto.linkDoModeloLogico;
                document.getElementById('linkGithub').value = projeto.linkDoGithub;
            })
            .catch(error => {
                console.error('Erro ao carregar dados do projeto:', error);
            });

        // Enviar os dados atualizados
        document.getElementById('formEditarProjeto').addEventListener('submit', (e) => {
            e.preventDefault();

            const projetoAtualizado = {
                tituloProjeto: document.getElementById('tituloProjeto').value,
                descricaoDoProjeto: document.getElementById('descricaoProjeto').value,
                dataDoProjeto: document.getElementById('data').value,
                linkDoModeloConceitual: document.getElementById('modeloConceitual').value,
                linkDoModeloLogico: document.getElementById('modeloLogico').value,
                linkDoGithub: document.getElementById('linkGithub').value
            };

            fetch(`/api/projeto/${projetoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projetoAtualizado)
            })
            .then(response => {
                console.log('Resposta HTTP do servidor:', response);
                console.log('Resposta HTTP do servidor json:', response.json());
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
                return response;
            })
            .then(updatedProjeto => {
                console.log('Projeto atualizado:', updatedProjeto); 
                alert('Projeto atualizado com sucesso!');
                window.location.href = `/projeto/${projetoId}`; // Redireciona para a página do projeto
            })
            .catch(error => {
                console.error('Erro ao atualizar o projeto:', error);
                alert('Ocorreu um erro ao atualizar o projeto. Detalhes: ' + error.message);
            });
            
        });
    } catch (err) {
        console.log("Erro na pagina de edição: ", err)
    }
    
});
