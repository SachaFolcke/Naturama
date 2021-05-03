const db = require("./models");

db.sequelize.sync({alter: true}).then(() => {
    console.log('Mise à jour de la base de données terminée.');
});