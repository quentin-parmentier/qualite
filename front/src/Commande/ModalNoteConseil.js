import React, { useEffect, useState } from 'react'
import BaseButton from '../BaseComponent/BaseButton'
import BaseModal from '../BaseComponent/BaseModal'
import Tab from '../BaseComponent/Tab'
import { notesList } from './choicesListesCommande'
import { questionConseil } from './questionsNotes'
import { isNotesOk } from './rulesCommande'

export default function ModalNoteConseil({closeModal,commande,handleChangeNote}) {

    const [notes, setNotes] = useState(commande.fournisseur.notesConseil[commande.numero] ?? [])
    const [errors, setErrors] = useState([])
    const [touched, setTouched] = useState({})

    useEffect(() => {
        setErrors((err) => {
            const {errors} = isNotesOk(notes, questionConseil, err, touched)
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
        const {valid, errors:err} = isNotesOk(notes,questionConseil, errors, touched, true)
        if(valid) enregistrer()
        setErrors(() => err)
    }

    function enregistrer(){
        const newNotes = {...commande.fournisseur.notesConseil, [commande.numero]:notes}
        const newFournisseur = commande.fournisseur.set('notesConseil',newNotes)
        handleChangeNote({newValue:newFournisseur,attr:'fournisseur'})
        closeModal()
    }

    return (
        <BaseModal closeModal={closeModal}>
            <h2 className="h2"> Noter les conseils du fournisseur </h2>
            {
                questionConseil.map((question,index) => 
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
