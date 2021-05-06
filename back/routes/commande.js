const express = require('express');
const mongoose = require('mongoose');
const connect = require('../connection');
const Commande = require('../models/Commande');
const Fournisseur = require('../models/Fournisseur');
const NoteConseil = require('../models/NoteConseil');
const NoteLivraison = require('../models/NoteLivraison');

const { getNotesOfCommande } = require('../helpers/fournisseurHelper');
const { createNumeroCommande } = require('../helpers/commandeHelper');
const router = express.Router()

/**
 * Permet d'ajouter une commande
 * @param {Commande} commande
 * @return {String} message
 */
router.post('/', async (req, res) => {
    const datas = req.body
    if(!datas.commande) res.status(401).json({message : 'Commande non fournie'})
    await connect(res)

    const fournisseur = await Fournisseur.findOne({id:datas.commande.fournisseur.id})
    if(!fournisseur) res.status(401).json({message : 'Fournisseur inconnu'})

    const lastcommande = await Commande.findOne().sort({'numero':-1})
    const numeroCommande = createNumeroCommande(lastcommande)

    const commande = new Commande({
        _id: new mongoose.Types.ObjectId(),
        id:datas.commande.id,
        numero:numeroCommande,
        typeAchat:datas.commande.typeAchat,
        achatPour:datas.commande.achatPour,
        achatPrecision:datas.commande.achatPrecision,
        achatPrestaPrecision:datas.commande.achatPrestaPrecision,
        fournisseur: fournisseur._id,
        isPlus500EuroHT:datas.commande.isPlus500EuroHT,
        dateCommande:datas.commande.dateCommande,
        dateValidationCommande:datas.commande.dateValidationCommande,
        modeCommande:datas.commande.modeCommande,
        dateLivraisonTotale:datas.commande.dateLivraisonTotale,
        etatLivrasion:datas.commande.etatLivrasion
    })

    commande.save()
    .then(() => {
        //On enregistre les notes
        const fournisseurNotesConseil = datas.commande.fournisseur.notesConseil
        const commandeNumberFront = datas.commande.numero
        const conseilNotesForThisCommande = getNotesOfCommande(fournisseurNotesConseil, commandeNumberFront)
        if(conseilNotesForThisCommande){
            const note = new NoteConseil({
                _id: new mongoose.Types.ObjectId(),
                id_commande: commande.numero,
                id_fournisseur: fournisseur._id,
                notes: conseilNotesForThisCommande
            });

            note.save()
            .then(() => {
                fournisseur.notesConseil.push(note._id)
                fournisseur.save()
            })
        }
    })
    .then(() => res.status(201).json({message : 'Commande créée'}))
    .catch((error) => res.status(401).json({message : error}))
})

/**
 * Permet de récupérer toutes les commandes
 * @return {Commande[]}
 */
router.get('/', async (req, res) => {
    await connect(res)
    const commandes = await Commande.find().select('-_id -__v')
    const fournisseurs = await Fournisseur.find().populate({path:'notesConseil',select:'notes id_commande -_id'}).select('-email -compte -psw -tel -id -__v')
    
    res.status(201).json({commandes,fournisseurs})
})

module.exports = router;