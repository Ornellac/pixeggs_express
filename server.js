const express = require('express');
const bodyParser = require('body-parser');
const sql = require("mssql/msnodesqlv8");
const cors = require("cors");
const dbConnect = require("./dbConnect")

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const routes = require('./routes/routes')(app);


const server = app.listen(port,
    () => {
        console.log('Le server ecoute (Oui il a des oreilles.😨) les requete du port %s',port);
        dbConnect;
});
