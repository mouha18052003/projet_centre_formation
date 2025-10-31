const noteModel = require('../models/modelNotes');

const noteController = {

getAll: async (req, res)=>{
    try{
        const data = await noteModel.getAll();
        res.status(200).json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},

getById: async (req, res)=>{
    try{
        const note = await noteModel.getById(req.params.id);
        if(!note){
            return res.status(404).json({ message: 'note non touve '});
        }
        res.status(200).json(note);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},
create: async (req, res)=>{
    try{
        const newnote = await noteModel.create(req.body);
        res.status(201).json(newnote);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},

update: async (req,res)=>{
    try{
        const noteUpdate = await noteModel.update(req.params.id, req.body);
        if(!noteUpdate){
            res.status(404).json({ message: 'note non trouve donc impossile de la modifier'});
        }
        res.status(200).json(noteUpdate);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},


};


module.exports = noteController;