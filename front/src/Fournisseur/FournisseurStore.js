import {generateId} from '../Fonctions/Generations'
import Fournisseur from './Fournisseur'

export default class FournisseurStore {
    constructor(fournisseurs = []){
        this.fournisseurs = fournisseurs
    }

    addFournisseur(fournisseur = new Fournisseur({id:generateId()})) {
        return new FournisseurStore([fournisseur
        , ...this.fournisseurs])
    }

    setFournisseur(oldF,newF) {
        return new FournisseurStore(this.fournisseurs.map((f) => oldF === f ? newF : f))
    }

    getFournisseur(id){
        return new Fournisseur(this.fournisseurs.find((f) => f.id.toString() === id))
    }

    shown(){
        return this.fournisseurs.filter((f) => f.visible === undefined || f.visible)
    }
    
    getFournisseurList(){
        return this.fournisseurs.map((f) => { return {value:f.id, label:f.nom}})
    }

    filterFournisseur({search,note} = {}){
        return new FournisseurStore(this.fournisseurs.map((f) => {
            new Fournisseur(f).nom.toLowerCase().replaceAll(" ","").includes(search.toLowerCase().replaceAll(" ","")) ? f.visible = true : f.visible = false
            return f
        }))
    }

    deleteFournisseur(fournisseur){
        return new FournisseurStore(this.fournisseurs.filter(f => f !== fournisseur))
    }
}