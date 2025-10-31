const attestationModel = require('../models/modelAttestation');


const attestationController = {


getAll: async (req, res)=>{
    try{
        const data = await attestationModel.getAll();
        res.status(200).json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau ;du serveur'});
    }
},

getById: async (req, res)=>{
    try{
        const attestation = await attestationModel.getById(req.params.id);
        if(!attestation){
            return res.status(404).json('attestation non trouve');
        }
        res.status(200).json(attestation);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau ;du serveur'});
    }
},

create: async (req, res)=>{
    try{
        const newattestation = await attestationModel.create(req.body);
        res.status(201).json(newattestation);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erreur au niveau du serveur'});
    }
},


};

module.exports = attestationController;