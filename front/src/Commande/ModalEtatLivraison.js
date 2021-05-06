import React, { useState } from 'react'
import BaseModal from '../BaseComponent/BaseModal'
import Tab from '../BaseComponent/Tab'
import Commande from './Commande'
import {etatLivraisonList} from './choicesListesCommande'
import BaseButton from '../BaseComponent/BaseButton'

export default function ModalEtatLivraison({closeModal,commande}) {

    const [activeCommande, setActiveCommande] = useState(commande)
    function handleChange({newValue, attr}){
        setActiveCommande(new Commande(activeCommande.set(attr,newValue)))
    }

    return (
        <BaseModal closeModal={() => closeModal(activeCommande)}>
            <h2 className="h2"> Quelle est l'état de la livraison ? </h2>
            <Tab idSelected={activeCommande.etatLivrasion} array={etatLivraisonList} handleChange={handleChange} dataAttribut='etatLivrasion' />
            <BaseButton label="Valider l'état de livraison" color="green" handleClick={() => closeModal(activeCommande,commande)} />
        </BaseModal>
    )
}
