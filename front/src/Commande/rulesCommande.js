export function showPrecision(achatPour){
    return ["2","4"].includes(achatPour)
}

export function showAchatPrestaPrecision(achatPour){
    return ["2"].includes(achatPour)
}

export function hasToEvaluateConseil(commande){
    if(!commande.fournisseur.id) return false
    if(isPresta(commande.achatPour)) return false
    if(commande.fournisseur.isPremiereCommande(commande.numero) || commande.isPlus500EuroHT) return true
    return false
}

export function isPresta(achatPour){
    return achatPour === "2"
}

export function isCreateCommandeOk(commande, errors, touched, submit=false){
    if(touched.fournisseur || submit) errors = isFournisseurOk(commande.fournisseur, errors)
    if(touched.dateCommande || submit) errors = isDateCommandeOk(commande.dateCommande, errors)
    if(touched.fournisseur || submit) errors = isNotesConseilOk(commande, errors)
    if(touched.achatPrecision || submit) errors = isAchatPrecisionOk(commande, errors)

    return {errors, valid:Object.keys(errors).length === 0}
}

function isFournisseurOk(fournisseurActuel, errors){
    if(!fournisseurActuel.id) return {...errors, fournisseur:"Ce champs est requis"}
    const {fournisseur, ...rest} = errors
    return rest
}

function isDateCommandeOk(dateCommandeActuelle, errors){
    if(!dateCommandeActuelle) return {...errors, dateCommande:"Ce champs est requis"}
    const {dateCommande, ...rest} = errors
    return rest
}

function isNotesConseilOk(commande, errors){
    if(hasToEvaluateConseil(commande) && !commande.fournisseur.hasNotesConseilFor(commande.numero)) return {...errors, notesConseil:"Veuillez noter le fournisseur"}
    const {notesConseil, ...rest} = errors
    return rest
}

function isAchatPrecisionOk(commande, errors){
    if(showPrecision(commande.achatPour) && !commande.achatPrecision) return {...errors, achatPrecision:"Ce champs est requis"}
    const {achatPrecision, ...rest} = errors
    return rest
}

export function isNotesOk(notes,questions, errors, touched, submit=false){
    questions.forEach((question, index) => {
        if(touched[index] || submit) errors = isNoteOk(notes,index,errors) 
    });

    return {errors,valid:Object.keys(errors).length === 0};
}

function isNoteOk(notes,index,errors){
    if(!notes[index]) return {...errors, [index]:'Cette note est requise'}
    const {[index]: value, ...rest} = errors
    return rest
}