
import { getRequest, postRequest } from "../facades/FacadeBackEnd"
import { notesFromBaseToFront } from "../Fournisseur/fournisseurHelper"
import Fournisseur from '../Fournisseur/Fournisseur'

/**
 * Enregistre une commande
 * @param {Commande} commande 
 */
export function postCommande(commande){
    const params = {commande}
    return postRequest('commande',params)
}

export function getCommandes(){
    return getRequest('commande')
    .then((response) => {
        const fournisseurs = response.data.fournisseurs
        const commandes = response.data.commandes

        fournisseurs.map((fournisseur) => {
            return fournisseur.notesConseil = notesFromBaseToFront(fournisseur.notesConseil)
        })

        commandes.map((commande) => {
            const foundFournisseur = fournisseurs.find((f) => f._id.toString() === commande.fournisseur)
            foundFournisseur.id = foundFournisseur._id
            commande.fournisseur = new Fournisseur(foundFournisseur)
            return commande
        })

        return commandes
    })
}