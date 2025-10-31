const formateurModel = require('../models/modelFormateur');

const formateurController = {

getAll: async (req, res)=>{
    try{
        const data = await formateurModel.getAll();
        res.status(200).json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json('Erreur au niveau du serveur');
    }
},

getById: async (req, res)=>{
    try{
         const formateur = await formateurModel.getById(req.params.id);
    if(!formateur){
        return res.status(404).json({ message: 'Formateur non trouve'});
    }
    res.status(200).json(formateurormateur);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    } 
},

create: async (req, res)=>{
    try{
        const newFormateur = await formateurModel.create(req.body);
        res.status(201).json(newFormateur);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},

};


module.exports = formateurController;