import React from 'react'
import { CommandePresenter } from './CommandePresenter'

export default function ViewCommandeLine({commande, setCommandeEditing}) {
    return (
        <div className=" grid grid-cols-commandes flex-1 gap-2">
            {CommandePresenter.map((data,key) => {
                const attribut = data.attribut
                const value = commande.get(attribut)
                return data.renderCell({value,key,setCommandeEditing,commande})
            })}
        </div>
    )
}
