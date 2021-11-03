const sql = require("mssql/msnodesqlv8")
const dbConfig = require("./dbConfig")

const dbConnect = new sql.connect(dbConfig,
    (err) => {
        if(err) console.log(err);
        else console.log(`Connecter a la database 👑 : ${dbConfig.server}\\${dbConfig.database}`);
    }
);

module.exports = dbConnect;