//* Ici je créez le lanceur du serveur 

const express = require('express');
const bodyParser = require('body-parser');
const sql = require("mssql/msnodesqlv8");
const cors = require("cors");
const dbConnect = require("./dbConnect")

const app = express();
//* J'ai choisi le port 3000 par habitude, mon Angular sera connecter sur le port 3001.
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//* Ici j'indique les routes pour mon app, qu'elle puisse me ressortir les info que je demanderais a la base de donnée, dans chaque route, en format JSON.
const routes = require('./routes/routes')(app);

//* Ici le serveur écoute les requete du port 3000 pour y connecté ma base de donnée.
const server = app.listen(port,
    () => {
        console.log('Le server ecoute (Oui il a des oreilles.😨) les requete du port %s',port);
        dbConnect;
});
