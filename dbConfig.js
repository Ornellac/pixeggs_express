//* Ici je configure node pour qu'il se connecte a ma base de donnée "Projet_Pixeggs".

var dbConfig = {
    server : "localhost",
    database: "Projet_Pixeggs",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
}

module.exports = dbConfig;