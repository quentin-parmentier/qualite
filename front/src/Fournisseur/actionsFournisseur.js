import { getRequest, postRequest } from "../facades/FacadeBackEnd"
import { notesFromBaseToFront } from "./fournisseurHelper"

export function getFournisseurs(){
    return getRequest('fournisseur')
    .then((response) => {
        const fournisseurs = response.data.fournisseurs
        fournisseurs.map((fournisseur) =>{
            return fournisseur.notesConseil = notesFromBaseToFront(fournisseur.notesConseil)
        })
        
        return fournisseurs
    })
}

export function saveFournisseurs(fournisseurs){
    console.log("Enregistrés",fournisseurs)
    //Vérifier qu'il y a au moins un nom sinon le virer

    //Delete Insert
}

export function addFournisseur(fournisseur){
    const params = {fournisseur}
    return postRequest('fournisseur',params)
}