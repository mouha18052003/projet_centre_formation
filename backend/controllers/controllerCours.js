const { getAll, getById } = require('../models/modelApprenant');
const coursModel = require('../models/modelCours');

const coursController = {

getAll: async (req, res)=>{
    try{
        const data = await coursModel.getAll();
        res.status(200).json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},

getById: async (req, res)=>{
    try{
        const cours = await coursModel.getById(req.params.id);
        if(!cours){
            return res.status(404).json({ message: 'cours non trouve'});
        }
        res.status(200).json(cours);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},

create: async (req,res)=>{
    try{
        const newCours = await coursModel.create(req.body);
        res.status(201).json(newCours);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},

update: async (req, res)=>{
    try{
        const cours = await coursModel.update(req.params.id, req.body);
        if(!cours){
            return res.status(404).json({ message: 'cours non trouve'});
        }
        res.status(200).json(cours);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},

delete: async(req, res)=>{
    try{
        const cours = await coursModel.delete(req.params.id);
        if(!cours){
            return res.status(404).json({ message: 'Erreur cours non trouve'});
        }
        res.status(200).json({ message: 'Cours supprime avec succes'});
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},


};


module.exports = coursController;