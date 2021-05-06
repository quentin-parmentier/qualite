import React from 'react'
import ReactiveInput from '../BaseComponent/ReactiveInput'

export default function ViewCellFournisseurInput({data,changeState,attribut, errors}) {
    return (
        <ReactiveInput
            classes={` text-center max-w-full break-line flex items-center justify-center}`} 
            value={data} 
            handleChange={changeState} 
            dataAttribut={attribut}
            errors={errors}
        />
    )
}
