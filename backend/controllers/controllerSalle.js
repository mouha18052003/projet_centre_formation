const salleModel = require('../models/modelSalle');

const controllerSalle = {

getAll: async (req, res)=>{
    try{
        const data = await salleModel.getAll();
        console.log("Données récupérées :", data); // Debug ici
        res.status(200).json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json('Erreur au niveau du serveur');
    }
},

getById: async (req, res)=>{
    try{
       const salle= await salleModel.getById(req.params.id);
       if(!salle){
        return res.status(404).json({ message: 'Salle non trouve'});
    }
    res.status(200).json(salle);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    } 
},
};


module.exports = controllerSalle;