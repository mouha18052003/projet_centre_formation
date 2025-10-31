const Apprenant = require ('../models/modelApprenant');//importation du dossier/fichier de la logique model dans le controllers


//on regroupe tous les controllers dans un objet
const ControllerApprenant = {

//controller du model getAll
getAll: async (req, res)=>{
    try{
        const data = await Apprenant.getAll();
        res.status(200).json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},

//controller du model getById
getById: async (req, res)=>{
    try{
        const apprenant = await Apprenant.getById(req.params.id);
        if(!apprenant){
            return res.status(404).json({ message: 'apprenant non trouve'});
        }
        res.status(200).json(apprenant);
    }
    catch (err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},

// controller du model create
create: async (req, res)=>{
    try{
        const newApprenant = await Apprenant.create(req.body);
        res.status(201).json(newApprenant);
    }
    catch (err){
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de l`ajout'});
    }
},

// controller du model update
update: async (req, res)=>{
    try{
        const apprenant = await Apprenant.update(req.params.id, req.body);
        if(!apprenant) {
            return res.status(404).json({ message: 'Apprenant non trouve'});
        }
        res.status(200).json(apprenant)
    }
    catch (err){
        console.error(err);
        res.status(500).json({ message: 'Erreur survenue lors du mise a jour'})
    }
},

//controller du model delete
delete: async (req, res)=>{
    try{
        const apprenant = await Apprenant.delete(req.params.id);
        if(!apprenant){
            return res.status(404).json({ message: 'Apprenant non trouve'});
        }
        res.status(200).json({ message: 'Apprenant supprimer avec succes'})
    }
    catch (err){
        console.error(err);
        res.status(500).json({ message: 'Erreur survenue lors de la suppression'});
    }
},

};


module.exports = ControllerApprenant; // exportation de la module