import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import BaseButton from '../BaseComponent/BaseButton'
import BaseInput from '../BaseComponent/BaseInput'
import Commande from './Commande'
import {ReactComponent as Search} from '../assets/svg/search.svg';
import {List, AutoSizer, CellMeasurer, CellMeasurerCache} from 'react-virtualized'
import { getCommandes } from './actionsCommande'
import { CommandePresenter } from './CommandePresenter'
import ViewCommandeLine from './ViewCommandeLine';
import ModalEtatLivraison from './ModalEtatLivraison'
import ModalNoteLivraison from './ModalNoteLivraison'

export default function ViewCommandeList() {

    const [commandes, setCommandes] = useState([])
    const [commandeEditingLivraison, setCommandeEditingLivraison] = useState({})
    const [commandeEditingNotesLivraison, setCommandeEditingNotesLivraison] = useState({})
    const [searchValue, setSearchValue] = useState("")

    const cache = useRef(new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100
    }))

    const commandesVisible = commandes.filter((c) => c.visible === undefined || c.visible)

    useEffect(() => {
        getCommandes()
        .then((commandes) => setCommandes(commandes))
    },[])

    return (
        <div className=' space-y-5 pt-5 h-full grid grid-rows-maxcontent'>
            <div className="flex items-center justify-center">
                <div className="w-1/2 mx-auto">
                    <BaseInput 
                        handleChange={filter} 
                        label="Recherche une commande"
                        IconLeft={Search}
                        value={searchValue}
                        fullWidth={true}
                    />
                </div>
                <div className="mx-auto w-1/4">
                    <NavLink to='/commande/create'>
                        <BaseButton label="Créer commande" />
                    </NavLink>
                </div>
                <BaseButton handleClick={() => console.log(commandes)} label="Stats" />
            </div>

            <div className="space-y-1 grid grid-rows-maxcontent">
                <div className="grid grid-cols-commandes font-bold gap-2 pr-1">
                    {CommandePresenter.map((data, index) => 
                        <div className="text-center" key={index}>
                            {data.renderHeader}
                        </div>  
                    )}
                </div>
                <div style={{width: "100%"}}>
                    <AutoSizer>
                        {({width, height}) => (
                            <List
                                width={width}
                                height={height}
                                className=" outline-none"
                                rowHeight={cache.current.rowHeight}
                                deferredMeasurementCache={cache.current}
                                rowCount={commandesVisible.length}
                                rowRenderer={({index,style,parent}) => {
                                    const commande = commandesVisible[index]
                                    return(
                                        <CellMeasurer
                                            key={'cell_'+commande.id}
                                            cache={cache.current}
                                            parent={parent}
                                            columnIndex={0}
                                            rowIndex={index}
                                        > 
                                            <div key={commande.id} style={style} className=" py-3 border flex">
                                                <ViewCommandeLine commande={new Commande(commande)} setCommandeEditing={setCommandeEditingLivraison} />
                                            </div>
                                        </CellMeasurer>
                                    )
                                }}
                            >
                            </List>
                        )}
                    </AutoSizer>
                </div>
            </div>
        
            {commandeEditingLivraison.id ? <ModalEtatLivraison commande={commandeEditingLivraison} closeModal={closeCommandeEditingLivraison} /> : ''}
            {commandeEditingNotesLivraison.id ? <ModalNoteLivraison commande={commandeEditingNotesLivraison} closeModal={closeCommandeEditingNotesLivraison} handleChangeNote={handleChangeNote} /> : ''}
        </div>
    )

    function filter({newValue}){
        setCommandes(commandes.map((commande) => {

            const chaine = `${commande.numero}_${commande.fournisseur.nom}` 
            commande.visible = chaine.toLowerCase().replaceAll(" ","").includes(newValue.toLowerCase().replaceAll(" ","")) ? true : false
            return commande
        }))
        setSearchValue(newValue)
    }

    function closeCommandeEditingLivraison(newCommande){
        setCommandes(commandes.map((c) => newCommande.id === c.id ? newCommande : c))
        //Update ma commande api

        if(newCommande.etatLivrasion === 2 && !newCommande.fournisseur.hasNotesLivraisonFor(newCommande.numero)) setCommandeEditingNotesLivraison(newCommande)
        setCommandeEditingLivraison({})
    }
    
    function closeCommandeEditingNotesLivraison(){
        setCommandeEditingNotesLivraison({})
    }

    function handleChangeNote({newValue,attr}){
        const newCommande = commandeEditingNotesLivraison.set(attr,newValue)
        setCommandes(commandes.map((c) => newCommande.id === c.id ? newCommande : c))
        //Update ma commande api
        closeCommandeEditingNotesLivraison()
    }
}
