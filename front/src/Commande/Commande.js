import { getToday } from "../Fonctions/Generations";
import Fournisseur from "../Fournisseur/Fournisseur";
import { hasToEvaluateConseil } from "./rulesCommande";

export default class Commande {
    constructor({id,numero=newNumero(),typeAchat=1, achatPour=1, achatPrecision="", achatPrestaPrecision=0
                ,fournisseur={}, isPlus500EuroHT=false, dateCommande=getToday(), dateValidationCommande =getToday(),
                modeCommande=0,dateLivraisonTotale=null, etatLivrasion=0, visible=true}={}){
        this.id = id
        this.numero = numero
        this.typeAchat = typeAchat
        this.achatPour = achatPour
        this.achatPrecision = achatPrecision
        this.achatPrestaPrecision = achatPrestaPrecision
        this.fournisseur = new Fournisseur(fournisseur)
        this.isPlus500EuroHT = isPlus500EuroHT
        this.dateCommande = dateCommande
        this.dateValidationCommande = dateValidationCommande
        this.modeCommande = modeCommande
        this.dateLivraisonTotale = dateLivraisonTotale
        this.etatLivrasion = etatLivrasion
        this.visible = visible
    }

    set(key,value){
        return {...this,[key] : value}
    }

    get(attribut){
        switch (attribut) {
            case 'id':
                return this.id
            case 'numero':
                return this.numero
            case 'typeAchat':
                return this.typeAchat
            case 'achatPour':
                return this.achatPour
            case 'achatPrecision':
                return this.achatPrecision
            case 'achatPrestaPrecision':
                return this.achatPrestaPrecision
            case 'fournisseur':
                return this.fournisseur
            case 'nomFournisseur':
                return this.fournisseur?.nom
            case 'isPlus500EuroHT':
                return this.isPlus500EuroHT
            case 'dateCommande':
                return this.dateCommande
            case 'dateValidationCommande':
                return this.dateValidationCommande
            case 'modeCommande':
                return this.modeCommande
            case 'dateLivraisonTotale':
                return this.dateLivraisonTotale
            case 'etatLivrasion':
                return this.etatLivrasion
            case 'visible':
                return this.visible
            case 'isNoteDone':
                return this.isNoteDone()
            default:
                break;
        }
    }

    isNoteDone(){
        if(hasToEvaluateConseil(this) && !this.fournisseur.hasNotesConseilFor(this.numero)) return 0
        if((!hasToEvaluateConseil(this) || this.fournisseur.hasNotesConseilFor(this.numero)) && !this.fournisseur.hasNotesLivraisonFor(this.numero)) return 1
        return 2
    }
}

function newNumero(){
    const today = new Date();
    return `${today.getFullYear().toString().slice(-2)}-${(today.getMonth() + 1).toString().padStart(2,"0")}-xx`
}