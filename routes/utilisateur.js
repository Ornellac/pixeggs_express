const sql = require('mssql/msnodesqlv8');
const dbConfig = require('../dbConfig');
const dbConnect = require('../dbConnect');

const prefix='/utilisateur/';

const utilisateurRoutes = (app) =>{
    app.get(`${prefix}`,
        (req, res)=>{
            let request = new sql.Request(dbConnect);
            request.query('SELECT [PK_Utilisateur], [Nom], [Prenom], [DateNaiss], [Email], [Password], [Pseudo] FROM [Projet_Pixeggs].[dbo].[Utilisateur]',
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
            request.query(`SELECT [PK_Utilisateur], [Nom], [Prenom], [DateNaiss], [Email], [Password], [Pseudo] FROM [Projet_Pixeggs].[dbo].[Utilisateur] WHERE [PK_Utilisateur] = ${id}`,
                (err, result)=> {
                    if(err) console.log(err);
                    else if (result.recordset.length > 0) res.send(result.recordset[0]);
                    else res.send({error: "Pas d'element avec cet identifiant"});
                }
            );
        }
    );

    app.post(`${prefix}register`,
        (req, res)=>{
            let input = req.body;
            console.log(input);
            let request = new sql.Request(dbConnect);
            request.query(
                `INSERT INTO Utilisateur(Nom, Prenom, DateNaiss, Email, Password, Pseudo) output inserted.PK_Utilisateur
                VALUES
                ('${input.Nom}','${input.Prenom}', '${input.DateNaiss}','${input.Email}',HASHBYTES('SHA2_256','${input.Password}'),'${input.Pseudo}')
            `,
                (err, result)=> {
                    if(err) console.log(err);
                    else res.send(result.recordset);  // console.log(result) ne fonctionnera pas pour renvoyé vers le choix du monstre;
                }
            );
        }
        
    );

    app.post(`${prefix}check`,
        (req, res)=>{
            let input = req.body;
            console.log(input);
            let request = new sql.Request(dbConnect);
            request.query(
                `SELECT PK_Utilisateur, Nom, Prenom, DateNaiss, Email,'******' Password, Pseudo FROM Utilisateur WHERE Email = '${input.Email}' AND Password = HASHBYTES('SHA2_256', '${input.Password}')`,
                (err, result)=>{
                    if(err) console.log(err);
                    else res.send(result.recordset);
                }
            );
        }
    );
};

module.exports = utilisateurRoutes;