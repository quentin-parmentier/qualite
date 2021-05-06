import React, { useState } from 'react'
import BaseButton from '../BaseComponent/BaseButton'
import BaseInput from '../BaseComponent/BaseInput'
import BaseModal from '../BaseComponent/BaseModal'
import { generateId } from '../Fonctions/Generations'
import useErrors from '../FormulaireHandler/errorsHandler'
import { addFournisseur } from '../Fournisseur/actionsFournisseur'
import Fournisseur from '../Fournisseur/Fournisseur'
import { isOkFournisseur } from '../Fournisseur/rulesFournisseurs'

export default function ModalCreateFournisseur({closeModal, setFournisseurs, setCommandeFournisseur, fournisseurs}) {
    const [fournisseur, setFournisseur] = useState(new Fournisseur({id:generateId()}))
    const {handleChange,handleClickEnregistrer,errors} = useErrors(fournisseur,setFournisseur,Fournisseur,isOkFournisseur,enregistrer)

    function enregistrer(){
        //Enregistrer le nouveau Fournisseur
        addFournisseur(fournisseur)
        //On ajoute le nouveau fournisseur à la volée
        setFournisseurs(fournisseurs.addFournisseur(fournisseur))
        setCommandeFournisseur({newValue:fournisseur,attr:'fournisseur'})
        closeModal()
    }

    return (
        <>
            <BaseModal closeModal={closeModal}>
                <h2 className="h2"> Créer un fournisseur </h2>
                <BaseInput label="Nom du fournisseur" value={fournisseur.nom} handleChange={handleChange} dataAttribut="nom" errors={errors} />
                <BaseButton label="Créer le fournisseur" color="green" handleClick={handleClickEnregistrer} />
            </BaseModal>  
        </>
    )
}
