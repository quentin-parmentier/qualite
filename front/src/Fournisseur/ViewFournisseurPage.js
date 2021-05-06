import React from 'react'
import {useParams} from 'react-router-dom'

export default function FournisseurVisu() {

    const {id} = useParams()
    console.log(useParams())

    return (
        <div>
            Visu Fournisseur {id}
        </div>
    )
}
