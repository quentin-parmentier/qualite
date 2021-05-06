export function isOkFournisseur(fournisseur, errors, touched, submit=false){
    if(touched.nom || submit) errors = isFournisseurNameOk(fournisseur, errors)
    return {errors, valid:Object.keys(errors).length === 0}
}

export function isFournisseurNameOk(fournisseur, errors){
    if(!fournisseur.nom) return {...errors, nom:"Ce champs est requis"}
    const {nom, ...rest} = errors
    return rest
}