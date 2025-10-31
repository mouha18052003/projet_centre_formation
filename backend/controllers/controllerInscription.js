const inscriptionModel = require('../models/modelInscription');


const inscriptionController = {

getAll: async (req, res)=>{
    try{
        const data = await inscriptionModel.getAll();
        res.status(200).json(data);
    }
    catch(err){
        console.error(err);
        res.status.json({ message: 'Erreur survenue au niveau du serveur'});
    }
},


getById: async (req, res)=>{
    try{
        const apprenantInscrit = await inscriptionModel.getById(req.params.id);
        if(!apprenantInscrit){
            return res.status(404).json({ message: 'aprenant non trouve dans les inscrit'});
        }
        res.status(200).json(apprenantInscrit);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur survenu au niveau du serveur'});
    }
},


create: async (req, res)=>{
    try{
        const newinscrit = await inscriptionModel.create(req.body);
        res.status(201).json(newinscrit);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur survenue au niveau du serveur'});
    }
},

delete: async (req, res)=>{
    try{
        const desinscrit = await inscriptionModel.delete(req.params.id);
        if(!desinscrit){
            return res.status(404).json({ message: 'apprenant non trouve dans les inscrit'});
        }
        res.status(200).json({ message: 'Apprenant supprime avec succes'});
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur survenue au niveau du serveur'});
    }
},


};


module.exports = inscriptionController;