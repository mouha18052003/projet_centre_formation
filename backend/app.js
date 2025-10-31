const express = require('express');
const cors = require('cors');//import du module cors 
const app = express(); // initialisation de notre module express

//importation des routes 
const routerApprenant = require('./routes/routeApprenant');
const routerSession = require('./routes/routeSession');
const routerFormateur = require('./routes/routeFormateur');
const routerModule = require('./routes/routeModule');
const routerCours = require('./routes/routeCours');
const routerInscription = require('./routes/routeInscription');
const routerNote = require('./routes/routeNote');
const routerAttestation = require('./routes/routeAttestation');
const routerSalle = require('./routes/routeSalle');
const routerAuth = require('./routes/routeAuth');


//autoriser les requetes depuis le frontend
app.use(cors());


//midlware pour lire les donnes  json
app.use(express.json());


//midlware pour afficher les bugs au console
app.use( (req, res, next)=>{
    console.log(`requete recue: ${req.method} ${req.url}`);
    next();
});

//midlware pour utiliser les routes
app.use('/apprenants', routerApprenant);
app.use('/sessions', routerSession);
app.use('/formateurs', routerFormateur);
app.use('/modules', routerModule);
app.use('/cours', routerCours);
app.use('/inscriptions', routerInscription);
app.use('/notes', routerNote);
app.use('/attestations', routerAttestation);
app.use('/salles', routerSalle);
app.use('/authentifier', routerAuth);




app.listen(3000, ()=>{
    console.log('Serveur demarer sur le port 3000');
});