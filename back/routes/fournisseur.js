const express = require('express');
const mongoose = require('mongoose');
const connect = require('../connection');
const Fournisseur = require('../models/Fournisseur');
const router = express.Router()

/**
 * Permet d'ajouter UN fournisseur
 * @param {Fournisseur} fournisseur 
 */
router.post('/', async (req, res) => {
    const datas = req.body
    if(!datas.fournisseur) res.status(401).json({message : 'Fournisseur non fourni'})
    await connect(res)

    const fournisseur = new Fournisseur({
        _id: new mongoose.Types.ObjectId(),
        id: datas.fournisseur.id,
        nom: datas.fournisseur.nom,
        compte: datas.fournisseur.compte,
        psw: datas.fournisseur.psw,
        email: datas.fournisseur.email,
        tel: datas.fournisseur.tel
    });
    
    fournisseur.save()
    .then(() => res.status(201).json({message : 'Fournisseur créé'}))
    .catch((error) => res.status(401).json({message : error}))
})

/**
 * Récupère tous les fournisseurs
 */
router.get('/', async (req,res) => {
    await connect(res)
    const fournisseurs = await Fournisseur.find().populate('notesConseil', {id_commande:1,notes:1}).select('-_id -__v')

    res.status(201).json({fournisseurs})
})

module.exports = router;