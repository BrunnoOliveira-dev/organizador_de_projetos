const Sequelize = require('sequelize')

const sequelize = new Sequelize('organizador', 'root', '1234', {
    host: 'localhost',
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


