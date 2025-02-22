document.getElementById('formCadastroProjeto').addEventListener('submit', function(event) {
    event.preventDefault();

    const projeto = {
        tituloProjeto: document.getElementById('tituloProjeto').value,
        linkDoModeloConceitual: document.getElementById('linkDoModeloConceitual').value,
        linkDoModeloLogico: document.getElementById('linkDoModeloLogico').value,
        dataDoProjeto: getDataAtual(),
        linkDoGithub: document.getElementById('linkDoGithub').value,
        descricaoDoProjeto: document.getElementById('descricaoDoProjeto').value
    };

    fetch('http://localhost:3000/api/projeto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projeto)
    })
    .then(response => response.json())
    .then(data => {
        alert('Projeto cadastrado com sucesso!');
        document.getElementById('formCadastroProjeto').reset();
    })
    .catch(error => {
        console.error('Erro ao cadastrar projeto:', error);
        alert('Ocorreu um erro ao cadastrar o projeto.');
    });
});

function getDataAtual() {
    const today = new Date()
    return today.toISOString().split('T')[0]
}