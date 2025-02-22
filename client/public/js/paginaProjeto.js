

document.addEventListener('DOMContentLoaded', () => {
    const projetoId = window.location.pathname.split('/').pop(); // Obter ID do projeto da URL

    // Carregar detalhes do projeto
    fetch(`/api/projeto/${projetoId}`)
        .then(response => response.json())
        .then(projeto => {
            document.getElementById('tituloProjeto').textContent = projeto.tituloProjeto;
            document.getElementById('descricaoProjeto').textContent = projeto.descricaoDoProjeto;
            document.getElementById('dataProjeto').textContent =  new Date(projeto.dataDoProjeto + 'T00:00:00').toLocaleDateString('pt-BR');
            document.getElementById('linkModeloConceitual').href = projeto.linkDoModeloConceitual;
            document.getElementById('linkModeloLogico').href = projeto.linkDoModeloLogico;
            document.getElementById('linkGithub').href = projeto.linkDoGithub;
        });


    getComentariosByProjeto()
    getTaskByProjeto()
});


function editar() {
    const projetoId = window.location.pathname.split('/').pop();
    window.location.href=`/editar-projeto/${projetoId}`
}

function deletar() {
    const projetoId = window.location.pathname.split('/').pop(); // Obter ID do projeto da URL
    if (window.confirm("Deseja continuar a deletar o projeto ?")) {
        fetch(`/api/projeto/${projetoId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())

        window.location.href=`/`
    }   
}


/*


Parte dos comentarios a baixo


*/


async function getComentariosByProjeto() {
    // Obter o ID do projeto da URL
    const projetoId = window.location.pathname.split('/').pop();
  
    try {
      const response = await fetch(`http://localhost:3000/api/comentario/projeto/${projetoId}`);
      // Aguarda a conversão da resposta para JSON
      const comentarios = await response.json();
  
      const listaDeComentarios = document.getElementById("comentariosLista");
      listaDeComentarios.innerHTML = '';
  
      comentarios.forEach(comentario => {
        const card = document.createElement('div');
        card.classList.add('projeto-card');
        card.classList.add('comentario-card');
  
        card.innerHTML = `
          <div class="comentarios">${comentario.comentario}</div>
          <div class="comentario-data">Data: ${new Date(comentario.dataComentario + 'T00:00:00').toLocaleDateString('pt-BR')}</div>
          <button onclick="deletarComentario(${comentario.idComentario})" class="btn-deletar">Deletar</button>
        `;
        // Corrigido: adiciona o card na listaDeComentarios, e não listaDeProjetos
        listaDeComentarios.appendChild(card);
      });
  
    } catch (err) {
      console.error('Erro ao carregar os comentarios:', err);
    }
  }
  

document.getElementById('formComentario').addEventListener('submit', function(event) {
    event.preventDefault();



    const projetoId = window.location.pathname.split('/').pop(); // Obter ID do projeto da URL


    try {
        const comentario = {
            comentario: document.getElementById('novoComentario').value,
            idProjeto: projetoId,
            dataComentario: getDataAtual()
        }

        fetch(`http://localhost:3000/api/comentario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comentario) 
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('formComentario').reset();

            getComentariosByProjeto()
        })
        .catch(error => {
            console.error('Erro ao cadastrar comentario:', error);
            alert('Ocorreu um erro ao cadastrar o comentario.');
        });
    } catch (err) {
        console.error('Erro ao carregar os comentarios:', err);
    }

})

function getDataAtual() {
    const today = new Date()
    return today.toISOString().split('T')[0]
}

function deletarComentario(comentarioId) {
    const projetoId = window.location.pathname.split('/').pop(); // Obter ID do projeto da URL
    if (window.confirm("Deseja continuar a deletar o comentario ?")) { 
        fetch(`/api/comentario/${comentarioId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())

        window.location.href=`/projeto/${projetoId}`
        // document.getElementById('formComentario').reset()
    }  
}


/*


parte das tasks



*/

async function getTaskByProjeto() {
    // Obter o ID do projeto da URL
    const projetoId = window.location.pathname.split('/').pop();
  
    try {
      const response = await fetch(`http://localhost:3000/api/task/projeto/${projetoId}`);
      // Aguarda a conversão da resposta para JSON
      const tasks = await response.json();
  
      const listaDeTask = document.getElementById("tarefasLista");
      listaDeTask.innerHTML = '';
  
      tasks.forEach(task => {
        const card = document.createElement('div');

        card.classList.add('projeto-card', 'task-card', 'comentario-card');

        let statusText = '';
        let statusClass = '';

        switch (Number(task.progressoDaTask)) {
            case 0:
              statusText = 'Pendente';
              statusClass = 'status-pendente';
              break;
            case 1:
              statusText = 'Iniciado';
              statusClass = 'status-iniciado';
              break;
            case 2:
              statusText = 'Concluído';
              statusClass = 'status-concluido';
              break;
            case -1:
              statusText = 'Cancelado';
              statusClass = 'status-cancelado';
              break;
            default:
              statusText = 'Desconhecido';
              statusClass = '';
          }
  
          card.innerHTML = `
          <div class="tituloTask"><h4>${task.nomeDaTask}</h4></div>
          <div class="descricaoTask">${task.descricaoDaTask}</div>
          <div class="proguessoDaTask ${statusClass}" data-status="${task.progressoDaTask}">${statusText}</div>
          <div class="task-data">Data: ${new Date(task.dataDaTask + 'T00:00:00').toLocaleDateString('pt-BR')}</div>
          <button onclick="deletarTask(${task.idTask})" class="btn-deletar">Deletar</button>
        `;  

        const statusElement = card.querySelector('.proguessoDaTask');
        statusElement.addEventListener('click', () => {
            // Obtém o status atual do dataset
            const currentStatus = Number(statusElement.dataset.status);
            const newStatus = cycleStatus(currentStatus);
            // Atualiza o elemento visualmente
            updateStatusElement(statusElement, newStatus);
            // Atualiza o backend (opcional)
            updateTaskStatus(task.idTask, newStatus);
        });

        // Corrigido: adiciona o card na listaDeComentarios, e não listaDeProjetos
        listaDeTask.appendChild(card);
      });
  
    } catch (err) {
      console.error('Erro ao carregar as tasks:', err);
    }
  }
  

document.getElementById('formTarefa').addEventListener('submit', function(event) {
    event.preventDefault();



    const projetoId = window.location.pathname.split('/').pop(); // Obter ID do projeto da URL


    try {
        const task = {
            nomeDaTask: document.getElementById('tituloTarefa').value,
            descricaoDaTask: document.getElementById('descricaoTarefa').value,
            progressoDaTask: document.getElementById('statusTarefa').value,
            idProjeto: projetoId,
            dataDaTask: getDataAtual()
        }

        fetch(`http://localhost:3000/api/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task) 
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('formTarefa').reset();

            getTaskByProjeto()
        })
        .catch(error => {
            console.error('Erro ao cadastrar task:', error);
            alert('Ocorreu um erro ao cadastrar o task.');
        });
    } catch (err) {
        console.error('Erro ao carregar as tasks:', err);
    }

})


function deletarTask(taskId) {
    const projetoId = window.location.pathname.split('/').pop(); // Obter ID do projeto da URL
    if (window.confirm("Deseja continuar a deletar o task ?")) { 
        fetch(`/api/task/${taskId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())

        window.location.href=`/projeto/${projetoId}`
        // document.getElementById('formTarefa').reset()
    }  
}

function cycleStatus(currentStatus) {
    let newStatus;
    if (currentStatus === 0) newStatus = 1;
    else if (currentStatus === 1) newStatus = 2;
    else if (currentStatus === 2) newStatus = -1;
    else if (currentStatus === -1) newStatus = 0;
    else newStatus = 0;
    return newStatus;
  }
  
  function updateStatusElement(statusElement, newStatus) {
    let statusText = '';
    let statusClass = '';
    switch (newStatus) {
      case 0:
        statusText = 'Pendente';
        statusClass = 'status-pendente';
        break;
      case 1:
        statusText = 'Iniciado';
        statusClass = 'status-iniciado';
        break;
      case 2:
        statusText = 'Concluído';
        statusClass = 'status-concluido';
        break;
      case -1:
        statusText = 'Cancelado';
        statusClass = 'status-cancelado';
        break;
      default:
        statusText = 'Desconhecido';
    }
    // Atualiza o texto
    statusElement.textContent = statusText;
    // Atualiza o atributo de status
    statusElement.dataset.status = newStatus;
    // Remove classes antigas e adiciona a nova
    statusElement.classList.remove('status-pendente', 'status-iniciado', 'status-concluido', 'status-cancelado');
    if (statusClass) {
      statusElement.classList.add(statusClass);
    }
  }




  
  function updateTaskStatus(taskId, newStatus) {
    fetch(`http://localhost:3000/api/task/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ progressoDaTask: newStatus })
    })
    .then(response => {
        console.log('Resposta HTTP do servidor:', response);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        // Tenta converter em JSON se houver corpo
        return response.text(); // usa text() primeiro
    })
    .then(text => {
        const updateTask = text ? JSON.parse(text) : {}; // só faz JSON.parse se tiver conteúdo
        console.log('Task atualizada:', updateTask);
        alert('Projeto atualizado com sucesso!');
    })
    .catch(error => {
        console.error('Erro ao atualizar a tarefa:', error);
        alert('Ocorreu um erro ao atualizar a tarefa. Detalhes: ' + error.message);
    });
}
