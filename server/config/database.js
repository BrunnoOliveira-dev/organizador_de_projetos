const Sequelize = require('sequelize')

// atualize os dados abaixo
const nome_do_banco = 'organizador'
const username = 'root'
const password = ''
const host = '' // padrão = localhost


// vá para o passo 5 do README.md

const sequelize = new Sequelize(nome_do_banco, username, password, {
    host: host,
    dialect: 'mysql',
    logging: false,
})

function testConection() {
    (async () => {
        try {
          await sequelize.authenticate();
          console.log('Conexão estabelecida com sucesso!');
        } catch (error) {
          console.error('Não foi possível conectar ao banco de dados:', error);
        }
    })();
}

testConection()

module.exports = sequelize;


