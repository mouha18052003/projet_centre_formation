const moduleModel = require('../models/modelModule');

const moduleController = {

getAll: async (req, res)=>{
    try{
        const data = await moduleModel.getAll();
        res.status(200).json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},

getById: async (req, res)=>{
    try{
        const module = await moduleModel.getById(req.params.id);
        if(!module){
            return res.status(404).json({ message: 'module non trouve'});
        }
        res.status(200).json(module);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }  
},

create: async (req, res)=>{
    try{
        const newmodule = await moduleModel.create(req.body);
        res.status(201).json(newmodule);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},

};

module.exports = moduleController;


