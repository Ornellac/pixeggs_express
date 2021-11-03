const sql = require('mssql/msnodesqlv8');
const dbConfig = require('../dbConfig');
const dbConnect = require('../dbConnect');

const prefix='/stat/';

const statRoutes = (app) =>{
    app.get(`${prefix}`,
        (req, res)=>{
            let request = new sql.Request(dbConnect);
            request.query('SELECT [PK_Stat], [TypeMonstre], [StatVie], [StatAttaque], [ApparenceMonstre] FROM [Projet_Pixeggs].[dbo].[Stat]',
                (err, result)=>{
                    if(err) console.log(err);
                    else res.send(result.recordset);
                }
            );
        }
    );

    app.get(`${prefix}:id`,
        (req, res)=>{
            let id = parseInt(req.params.id);
            let request = new sql.Request(dbConnect);
            request.query(`SELECT [PK_Stat], [TypeMonstre], [StatVie], [StatAttaque], [ApparenceMonstre] FROM [Projet_Pixeggs].[dbo].[Stat] WHERE [PK_Stat] = ${id}`,
                (err, result)=> {
                    if(err) console.log(err);
                    else if (result.recordset.length > 0) res.send(result.recordset[0]);
                    else res.send({error: "Pas d'element avec cet identifiant"});
                }
            );
        }
    );

};

module.exports = statRoutes;