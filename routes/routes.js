const monstreRoutes = require('./monstre');
const statRoutes = require('./stat');
const utilisateurRoutes = require('./utilisateur');
//* Ici je récupere toutes les routes
const appRoutes = (app)=>{
    app.get('/',
        (req, res) => {
            let accueil = {
                description: "Bienvenu sur l'API de mon Projet_pixeggs, vous pourrez acceder aux information des monstres avec l'url : http://Localhost:3000/monstre",
                routes:
                {
                    monstre: "http://localhost:3000/monstre",
                    stat:"http://localhost:3000/stat",
                    utilisateur: "http://localhost:3000/utilisateur"
                }
            };
            res.send(accueil);
        }
    );
    monstreRoutes(app);
    statRoutes(app);
    utilisateurRoutes(app);
};

module.exports = appRoutes;