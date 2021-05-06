import React, { useEffect, useState } from 'react'
import BaseInput from '../BaseComponent/BaseInput'
import BaseSelect from '../BaseComponent/BaseSelect'
import BaseButton from '../BaseComponent/BaseButton'
import BaseCheckBox from '../BaseComponent/BaseCheckBox'
import Tab from '../BaseComponent/Tab'
import { generateId } from '../Fonctions/Generations'
import { getFournisseurs } from '../Fournisseur/actionsFournisseur'
import FournisseurStore from '../Fournisseur/FournisseurStore'
import { typeAchatList, achatPourList, achatPrestaPrecisionList, modeCommandeList } from './choicesListesCommande'
import { showPrecision,showAchatPrestaPrecision, hasToEvaluateConseil, isCreateCommandeOk } from './rulesCommande'
import Commande from './Commande'
import ModalCreateFournisseur from './ModalCreateFournisseur'
import ModalNoteConseil from './ModalNoteConseil'
import { postCommande } from './actionsCommande'
import useErrors from '../FormulaireHandler/errorsHandler'

export default function ViewCommandeCreation() {

    const [commande, setCommande] = useState(new Commande({id:generateId()}))
    const [fournisseurs, setFournisseurs] = useState(new FournisseurStore())
    const [creatingFournisseur, setCreatingFournisseur] = useState(false)
    const [creatingEvaluationConseil, setCreatingEvaluationConseil] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const {handleChange,handleClickEnregistrer,errors} = useErrors(commande,setCommande,Commande,isCreateCommandeOk,enregistrer)

    //Initialise la liste des fournisseurs
    useEffect(() => {
        getFournisseurs()
        .then((fournisseur) => {
            setFournisseurs(new FournisseurStore(fournisseur))
        })
    }, [])

    function handleChangeAchatPour({newValue,attr}){
        setCommande((currentCommande) => {
            if(!showPrecision(newValue)) currentCommande = new Commande(currentCommande.set('achatPrecision',''))
            if(!showAchatPrestaPrecision(newValue)) currentCommande = new Commande(currentCommande.set('achatPrestaPrecision',0))
            else currentCommande = new Commande(currentCommande.set('achatPrestaPrecision',1))
            return new Commande(currentCommande.set(attr,newValue))
        })
    }

    function handleChangeFournisseur({newValue, attr}){
        const newFournisseur = fournisseurs.getFournisseur(newValue)
        handleChange({newValue:newFournisseur,attr})
    }

    function handleClickFournisseur(){
        setCreatingFournisseur((currentBool) => !currentBool);
    }

    function handleClickEvaluer(){
        setCreatingEvaluationConseil((currentBool) => !currentBool);
    }

    function enregistrer(){
        setIsRegistering(true)
        postCommande(commande)
        .then(() => {
            //Changer de page + show Toaster
        })
        .catch(() => {
            //On affiche une erreur
            setIsRegistering(false)
            console.log("Erreur")
        })
    }
    
    return (
        <div className=" mt-5 max-w-4xl mx-auto space-y-8">
            {renderCommandeHeader()}
            {renderCommandeAchatPour()}
            {renderCommandeFournisseur()}
            {renderCommandeCommande()}
            {renderButtonSave()}
            <button onClick={() => {
                console.log(commande)
                console.log(fournisseurs)
                console.log(errors)
            }}> TEST VALUE </button>
            {renderModals()}
        </div>
    )

    function renderCommandeHeader(){
        return(
            <div className="flex flex-wrap items-center gap-y-4">
                <div className=" w-44 xs:text-center font-semibold flex-1 min-w-90">
                    N° {commande.numero}
                </div>
                <div className=" flex-3 flex items-center">
                    <BaseSelect 
                        array={typeAchatList} 
                        idSelected={commande.typeAchat} 
                        handleChange={handleChange}
                        dataAttribut="typeAchat"
                        label="Type d'achat"
                    />
                </div>
            </div>
        )
    }

    function renderCommandeAchatPour(){
        return(
        <div className=" flex flex-wrap w-full gap-x-4 gap-y-4">
            <BaseSelect 
                array={achatPourList} 
                idSelected={commande.achatPour} 
                handleChange={handleChangeAchatPour}
                dataAttribut="achatPour"
                label="Achat pour"
            />
            { showAchatPrestaPrecision(commande.achatPour) ?
            <BaseSelect 
                array={achatPrestaPrecisionList} 
                idSelected={commande.achatPrestaPrecision} 
                handleChange={handleChange}
                dataAttribut="achatPrestaPrecision"
                label="Type de prestation"
            /> : ''}
            { showPrecision(commande.achatPour) ?
            <BaseInput 
                label="Précisez nom"
                handleChange={handleChange}
                value={commande.achatPrecision}
                dataAttribut="achatPrecision"
                errors={errors}
            /> : ''}
        </div>
        )
    }

    function renderCommandeFournisseur(){

        return(
            <div className=" flex flex-wrap w-full items-center gap-x-4 gap-y-4">
                <div className="flex items-center flex-1 ">
                <BaseSelect
                    array={fournisseurs.getFournisseurList()}
                    handleChange={handleChangeFournisseur}
                    idSelected={commande.fournisseur.id}
                    label="Fournisseur"
                    firstEmpty={true}
                    errors={errors}
                    dataAttribut='fournisseur'
                />
                { commande.fournisseur.id ? '' : <BaseButton label="+" handleClick={handleClickFournisseur} />}
                </div>

                { commande.fournisseur.id ?
                    <BaseCheckBox value={commande.isPlus500EuroHT} label="< 500€ HT" handleChange={handleChange} dataAttribut='isPlus500EuroHT' />
                    : ''
                }

                {   
                    <div className=' flex flex-1 items-center gap-x-4 gap-y-4'>
                        { hasToEvaluateConseil(commande) ? <BaseButton label="Evaluer conseils" handleClick={handleClickEvaluer} errors={errors} dataAttribut='notesConseil' /> : ''}
                        {!isNaN(commande.fournisseur.get('noteConseil')) ? 
                        <div className={[' p-2 font-semibold text-white ' , commande.fournisseur.get('isNoteConseilGood') ? ' bg-green-400 ' : ' bg-red-500 ']}>
                            {commande.fournisseur.get('noteConseil')}
                        </div> 
                        : ''}
                    </div> 
                }
                
            </div>
        )
    }

    function renderCommandeCommande(){
        return(
            <div className="flex flex-wrap gap-x-4 gap-y-4">
                <BaseInput 
                    type="date"
                    label="Date de la commande"
                    handleChange={handleChange}
                    value={commande.dateCommande}
                    dataAttribut="dateCommande"
                    errors={errors}
                />
                <BaseInput 
                    type="date"
                    label="Date de la validation"
                    handleChange={handleChange}
                    value={commande.dateValidationCommande}
                    dataAttribut="dateValidationCommande"
                />
                <Tab 
                    array={modeCommandeList} 
                    idSelected={commande.modeCommande} 
                    handleChange={handleChangeAchatPour}
                    dataAttribut="modeCommande"
                />
            </div>
        )
    }

    function renderButtonSave(){
        return(
            <div className="w-1/2 mx-auto">
                <BaseButton label="Enregistrer" color="green" disabled={isRegistering} handleClick={handleClickEnregistrer} />
            </div>
        )
    }

    function renderModals(){
        return(
            <div>
                {creatingFournisseur ? 
                <ModalCreateFournisseur 
                    closeModal={handleClickFournisseur}
                    setFournisseurs={setFournisseurs}
                    setCommandeFournisseur = {handleChange}
                    fournisseurs={fournisseurs}
                /> : ''}
                {creatingEvaluationConseil ? 
                <ModalNoteConseil 
                    closeModal={handleClickEvaluer}
                    commande={commande}
                    handleChangeNote={handleChange}
                />
                : ''}
            </div>
        )
    }
}
