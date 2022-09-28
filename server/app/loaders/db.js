const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('node-react-crud', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to MySQL');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

sequelize.sync({ force: false }).then(() => {
  console.log('Re-sync db.');
});

module.exports = sequelize;
