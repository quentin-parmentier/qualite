import React from 'react'
import Fournisseur from './Fournisseur'
import {FournisseurPresenter} from './FournisseurPresenter'
import {isFournisseurNameOk} from './rulesFournisseurs'

//Component rendering a fournisseur line
export default function ViewFournisseurLine({fournisseurObject, handleChange}) {
    //Create a fournisseur with his constructor
    const fournisseur = new Fournisseur(fournisseurObject)
    const errors = isFournisseurNameOk(fournisseur,{})
    
    //Update the state of a fournisseur
    const changeFournisseurState = function(data,value){
        handleChange(fournisseurObject,fournisseur.set(data,value))
    }

    return (
        <div className=" grid grid-cols-fournisseurs flex-1 gap-2">
            {FournisseurPresenter.map((data,key) => {
                const attribut = data.attribut
                const value = fournisseur.get(attribut)
                return data.renderCell({value,changeFournisseurState,attribut,key,errors})
            })}
        </div>
    )
}
