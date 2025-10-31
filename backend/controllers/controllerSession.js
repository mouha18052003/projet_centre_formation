const sessionModel = require('../models/modelSession');

const controllerSession = {

getAll: async (req, res)=>{
    try{
        const data = await sessionModel.getAll();
        res.status(200).json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},

getById: async (req, res)=>{
    try{
        const session = await sessionModel.getById(req.params.id);
        if(!session){
            return res.status(404).json({ message: 'session non trouve'});
        }
        res.status(200).json(session);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},

create: async (req, res)=>{
    try{
        const newSession = await sessionModel.create(req.body);
        res.status(201).json(newSession);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
    
},


};


module.exports = controllerSession;