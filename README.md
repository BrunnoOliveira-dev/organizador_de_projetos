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

4. ⚙️ Configuração do Ambiente

Este projeto utiliza variáveis de ambiente para configurar informações sensíveis e específicas do ambiente, como as credenciais do banco de dados.

Arquivo .env.example

Na pasta "server" do projeto, você encontrará um arquivo chamado .env.example. Este arquivo serve como um modelo para o arquivo de configuração de ambiente real (.env).

Como configurar o ambiente local:

Copie o .env.example: Duplique ou renomeie o arquivo .env.example para .env.


```bash
cp .env.example .env
```
ou

```bash
mv .env.example .env
```

Preencha o arquivo .env: Abra o arquivo .env e substitua os valores de exemplo pelas suas configurações reais, como as informações de conexão com o banco de dados MySQL.

```bash
DB_NAME=nome_do_banco
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
PORT=3000
```

Abaixo está a lista de variáveis de ambiente utilizadas no projeto e suas descrições:

* DB_HOST: Host do servidor MySQL. (Tipo: String, padrão: localhost);
* DB_USER: Nome de usuário para conexão com o MySQL. (Tipo: String);
* DB_PASSWORD: Senha para o usuário do MySQL. (Tipo: String);
* DB_NAME: Nome do banco de dados MySQL a ser utilizado. (Tipo: String);
* PORT: Porta em que o servidor da aplicação será executado. (Tipo: Número, padrão: 3000);

Certifique-se de preencher o arquivo .env com os valores corretos antes de executar o projeto localmente.


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

