import React, { useEffect, useState } from 'react'
import BaseButton from '../BaseComponent/BaseButton'
import BaseModal from '../BaseComponent/BaseModal'
import Tab from '../BaseComponent/Tab'
import { notesList } from './choicesListesCommande'
import { questionLivraison } from './questionsNotes'
import { isNotesOk } from './rulesCommande'

export default function ModalNoteLivraison({closeModal,commande,handleChangeNote}) {

    const [notes, setNotes] = useState(commande.fournisseur.notesLivraison[commande.numero] ?? [])
    const [errors, setErrors] = useState([])
    const [touched, setTouched] = useState({})

    useEffect(() => {
        setErrors((err) => {
            const {errors} = isNotesOk(notes, questionLivraison, err, touched)
            return errors
        })
    },[touched,notes])

    function handleChange({newValue, attr}) {
        setTouched((actualTouched) => {return {...actualTouched, [attr]:true}})
        setNotes((currentNotes) => {
            currentNotes[attr] = newValue
            return [...currentNotes]
        })
    }
    function handleClick() {
        const {valid, errors:err} = isNotesOk(notes,questionLivraison, errors, touched, true)
        if(valid) enregistrer()
        setErrors(() => err)
    }

    function enregistrer(){
        const newNotes = {...commande.fournisseur.notesLivraison, [commande.numero]:notes}
        const newFournisseur = commande.fournisseur.set('notesLivraison',newNotes)
        handleChangeNote({newValue:newFournisseur,attr:'fournisseur'})
        closeModal()
    }

    return (
        <BaseModal closeModal={closeModal}>
            <h2 className="h2"> Noter la livraison du fournisseur </h2>
            {
                questionLivraison.map((question,index) => 
                <div key={index}>
                    <div className=" font-semibold text-center p-2"> {question} </div>
                    <Tab array={notesList} idSelected={notes[index]} dataAttribut={index} handleChange={handleChange} errors={errors} />
                </div> 
                )
            }
            
            <BaseButton label="Valider ces notes" color="green" handleClick={handleClick} />
        </BaseModal>
    )
}
