//* Ici j'indique le chemin de ma configuration pour le lien node/sql

const sql = require("mssql/msnodesqlv8")
const dbConfig = require("./dbConfig")

//* Ici je connecte le projet a ma base de donnée sql

const dbConnect = new sql.connect(dbConfig,
    (err) => {
        if(err) console.log(err);
        else console.log(`Connecter a la database 👑 : ${dbConfig.server}\\${dbConfig.database}`);
    }
);

module.exports = dbConnect;