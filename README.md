# Organizador de Projetos

O **Organizador de Projetos** é uma aplicação que visa centralizar as ideias e informações de projetos pessoais em uma única página. O sistema permite criar, editar, listar e deletar projetos, bem como associar tarefas e comentários a cada projeto.

A aplicação foi desenvolvida utilizando **Node.js**, **Express**, **MySQL** e **Sequelize**, e é dividida em duas partes:

1. **Server (Back-end)**: Responsável pela lógica de negócios, incluindo rotas, controladores e models.
2. **Client (Front-end)**: Responsável pela interface do usuário, incluindo as views HTML, arquivos JS e CSS.

## 🧑‍💻 **Tecnologias Utilizadas**

- **Node.js**
- **Express** para gerenciar as rotas e controladores
- **MySQL** para o banco de dados
- **Sequelize** como ORM (Object-Relational Mapping) para facilitar a comunicação com o banco de dados
- **HTML/CSS/JS** para o front-end

## 🚀 **Como Rodar o Projeto**

1. Clone o repositório:

```bash
git clone https://github.com/BrunnoOliveira-dev/organizador_de_projetos.git
```

2. Entre na pasta do projeto:

```bash
cd organizador_de_projetos
```

3. Instale as dependências:

```bash
npm install
```

4. Configure seu banco de dados MySQL e as credenciais de acesso no arquivo `config/database.js`.

5. entre na pasta server

```bash
cd server
``` 

6. execute o arquivo server

```bash
node server.js
``` 

7. Acesse a aplicação através de seu navegador em `http://localhost:3000`.

## 📊 **Estrutura do Banco de Dados**

### 📁 **Tabela: Projetos (`projetos`)**
| Campo                  | Tipo           | Permite Nulo | Descrição                            |
|------------------------|----------------|--------------|--------------------------------------|
| `idProjeto`            | INTEGER (PK)   | ❌           | ID único do projeto                 |
| `tituloProjeto`        | STRING(255)    | ❌           | Título do projeto                   |
| `linkDoModeloConceitual`| STRING(255)    | ✅           | Link do modelo conceitual           |
| `linkDoModeloLogico`    | STRING(255)    | ✅           | Link do modelo lógico               |
| `dataDoProjeto`        | DATEONLY       | ✅           | Data de criação do projeto          |
| `linkDoGithub`         | STRING(255)    | ✅           | Link para o repositório no GitHub    |
| `descricaoDoProjeto`   | STRING(255)    | ❌           | Descrição breve do projeto          |

---

### 📝 **Tabela: Comentários (`comentariosdoprojeto`)**
| Campo            | Tipo         | Permite Nulo | Descrição                      |
|------------------|--------------|--------------|----------------------------------|
| `idComentario`   | INTEGER (PK) | ❌           | ID único do comentário          |
| `comentario`     | STRING(255)  | ❌           | Texto do comentário             |
| `idProjeto`      | INTEGER (FK) | ✅           | Referência ao projeto           |
| `dataComentario` | DATEONLY     | ✅           | Data do comentário              |

🔗 **Relacionamento:** Muitos comentários podem estar associados a um projeto.

---

### ✅ **Tabela: Tarefas (`task`)**
| Campo            | Tipo         | Permite Nulo | Descrição                      |
|------------------|--------------|--------------|----------------------------------|
| `idTask`         | INTEGER (PK) | ❌           | ID único da tarefa              |
| `nomeDaTask`     | STRING(255)  | ❌           | Nome da tarefa                  |
| `descricaoDaTask`| STRING(255)  | ✅           | Descrição detalhada da tarefa   |
| `progressoDaTask` | STRING(255)  | ❌           | Status atual (ex.: Em andamento, Concluído) |
| `idProjeto`      | INTEGER (FK) | ✅           | Projeto associado               |
| `dataDaTask`     | DATEONLY     | ✅           | Data limite da tarefa           |

🔗 **Relacionamento:** Um projeto pode ter várias tarefas.

---

## 🌐 **Rotas da API**

A aplicação possui as seguintes rotas para gerenciamento de projetos, tarefas e comentários:

### **Projetos**

- `POST /api/projeto` – Criar um novo projeto
- `GET /api/projeto` – Listar todos os projetos
- `GET /api/projeto/:id` – Obter detalhes de um projeto específico
- `PUT /api/projeto/:id` – Atualizar um projeto específico
- `DELETE /api/projeto/:id` – Deletar um projeto específico

### **Comentários**

- `POST /api/comentario` – Adicionar um comentário a um projeto
- `GET /api/comentario` – Listar todos os comentários
- `GET /api/comentario/:id` – Obter um comentário específico
- `GET /api/comentario/projeto/:id` – Obter todos os comentários de um projeto específico
- `DELETE /api/comentario/:id` – Deletar um comentário específico

### **Tarefas**

- `POST /api/task` – Adicionar uma nova tarefa a um projeto
- `GET /api/task` – Listar todas as tarefas
- `GET /api/task/:id` – Obter uma tarefa específica
- `GET /api/task/projeto/:id` – Obter todas as tarefas de um projeto específico
- `PUT /api/task/:id` – Atualizar uma tarefa específica
- `DELETE /api/task/:id` – Deletar uma tarefa específica

## 🛠️ **Estrutura do Projeto**

O projeto é dividido nas seguintes pastas:

- **`/server`**: Contém o back-end da aplicação (models, controllers, routes e configuração do servidor).
- **`/client`**: Contém o front-end da aplicação (views, arquivos CSS e JS).
  - **`/public`**: Arquivos públicos, como CSS e JS.
  - **`/views`**: Arquivos HTML para renderização das páginas.

---

## Autoria

Este projeto foi desenvolvido por Brunno Oliveira.  
Você pode entrar em contato ou ver mais sobre o trabalho em:

- [GitHub](https://github.com/BrunnoOliveira-dev)

Se você tiver alguma sugestão, dúvida ou contribuição, sinta-se à vontade para abrir uma issue ou enviar um pull request.

