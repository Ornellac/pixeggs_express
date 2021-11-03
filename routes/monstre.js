const sql = require('mssql/msnodesqlv8');
const dbConfig = require('../dbConfig');
const dbConnect = require('../dbConnect');

const prefix='/monstre/';

const monstreRoutes = (app) =>{
    app.get(`${prefix}`,
        (req, res)=>{
            let request = new sql.Request(dbConnect);
            request.query('SELECT * FROM Monstre LEFT JOIN Utilisateur ON Monstre.FK_Utilisateur = Utilisateur.PK_Utilisateur LEFT JOIN Stat ON Monstre.FK_Stat = Stat.PK_Stat WHERE PK_Utilisateur IS NOT NULL',
                (err, result)=>{
                    if(err) console.log(err);
                    else res.send(result.recordset);
                }
            );
        }
    );
    
    //* Pour créer son monstre :
    app.post(`${prefix}choix`,
        (req, res)=>{
            let input = req.body;
            console.log(input);
            let request = new sql.Request(dbConnect);
            request.query(
                `INSERT INTO Monstre(NomMonstre, Exp, FK_Stat, FK_Utilisateur) output inserted.PK_Monstre
                VALUES
                ('${input.NomMonstre}',0, '${input.FK_Stat}','${input.FK_Utilisateur}')
            `,
                (err, result)=> {
                    if(err) console.log(err);
                    else console.log(result);
                }
            );
        }
        
    );

    //* Pour affichez les infos des monstre :
    app.get(`${prefix}:id`,
        (req, res)=>{
            let id = parseInt(req.params.id);
            let request = new sql.Request(dbConnect);
            request.query(`SELECT * FROM Monstre LEFT JOIN Stat ON Monstre.FK_Stat = Stat.PK_Stat WHERE FK_Utilisateur = ${id}`,
                (err, result)=> {
                    if(err) console.log(err);
                    else if (result.recordset.length > 0) res.send(result.recordset[0]);
                    else res.send({error: "Pas d'element avec cet identifiant"});
                }
            );
        }
    );

};

module.exports = monstreRoutes;