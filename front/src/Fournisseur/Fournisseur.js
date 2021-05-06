export default class Fournisseur {
    constructor({id,nom="",compte="",psw="",email="",tel="",notesConseil={}, notesLivraison={}, visible=true}={}){
        this.id = id
        this.nom = nom
        this.compte = compte
        this.psw = psw
        this.email = email
        this.tel = tel
        //Tableau de notes Note : {id_commande:[1,2,3],id_commande:[2,3,2]}
        this.notesConseil = notesConseil
        this.notesLivraison = notesLivraison
        this.visible = visible
    }

    set(key,value){
        return {...this,[key] : value}
    }

    get(attribut){
        switch (attribut) {
            case 'nom':
                return this.nom
            case 'compte':
                return this.compte
            case 'psw':
                return this.psw
            case 'email':
                return this.email
            case 'tel':
                return this.tel
            case 'isNoteConseilGood':
                return this.isNoteConseilGood()
            case 'isNoteLivraisonGood':
                return this.isNoteLivraisonGood()
            case 'noteConseil':
                return calculNoteMoyenne(this.notesConseil)
            case 'noteLivraison':
                return calculNoteMoyenne(this.notesLivraison)
            case 'isPremiereCommande':
                return this.isPremiereCommande()
            default:
                break;
        }
    }

    //{"21-01-01":[1,1,2], "20-01-01":[1,1,3]}
    isNoteConseilGood(){
        return this.get('noteConseil') <= 8
    }

    isNoteLivraisonGood(){
        return this.get('noteLivraison') <= 8
    }

    isPremiereCommande(numero){
        const keys = Object.keys(this.notesConseil)
        const yearTwo = new Date().getFullYear().toString().slice(2)
        if(this.id === undefined) return false
        if(keys.length === 0) return true
        return !keys.some((key) => key.includes(`${yearTwo}-`) && key !== numero)
    }

    hasNotesConseilFor(numero){
        return this.notesConseil[numero] !== undefined
    }

    hasNotesLivraisonFor(numero){
        return this.notesLivraison[numero] !== undefined
    }
}

function calculNoteMoyenne(notes){
    const idsNotes = Object.keys(notes)
    let noteGlobal = 0
    idsNotes.map((idNote) => 
        noteGlobal += notes[idNote].reduce((note, currentValue) => note*currentValue, 1)
    )

    return (noteGlobal/idsNotes.length).toFixed(1)
}