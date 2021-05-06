import React, { useEffect, useRef, useState } from 'react'
import {getFournisseurs, saveFournisseurs} from './actionsFournisseur' 
import FournisseurLine from './ViewFournisseurLine'
import FournisseurStore from './FournisseurStore'
import {List, AutoSizer, CellMeasurer, CellMeasurerCache} from 'react-virtualized'
import {ReactComponent as Search} from '../assets/svg/search.svg';
import {FournisseurPresenter} from './FournisseurPresenter'
import BaseInput from '../BaseComponent/BaseInput'
import BaseButton from '../BaseComponent/BaseButton'

export default function ViewFournisseurList() {
    
    const [fournisseurs, setFournisseurs] = useState(new FournisseurStore())
    const [searchValue, setSearchValue] = useState("")

    const shownFournisseurs = fournisseurs.shown()
    const cache = useRef(new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100
    }))
    const refFournisseurs = useRef()

    useEffect(()=> {
        getFournisseurs()
        .then((fournisseurs) => {
            setFournisseurs(new FournisseurStore(fournisseurs))
        })
    }, [])

    useEffect(() => {
        refFournisseurs.current = fournisseurs
    },[fournisseurs])

    useEffect(() => {
        window.onbeforeunload = () => {
            saveFournisseurs(refFournisseurs.current.fournisseurs)
            
            //return false
        }

        return () => saveFournisseurs(refFournisseurs.current.fournisseurs)
    }, [])

    function replaceAFournisseurWithANewOne(oldFournisseur,newFournisseur){
        setFournisseurs((currentStore) => currentStore.setFournisseur(oldFournisseur,newFournisseur))
    }

    function filter({newValue}){
        setFournisseurs(fournisseurs.filterFournisseur({search:newValue}))
        setSearchValue(newValue)
    }

    function createFournisseur(){
        setFournisseurs(fournisseurs.addFournisseur())
    }

    return (
        <div className="space-y-5 pt-5 h-full grid grid-rows-maxcontent">
            <div id="topSearchBar" className="space-y-2">
                <div className="flex justify-end">
                    <BaseButton 
                        label="Ajouter fournisseur"
                        handleClick={() => createFournisseur()}
                    />
                </div>
                <div className="w-1/2 mx-auto">
                    <BaseInput 
                        handleChange={filter} 
                        label="Recherche fournisseur"
                        IconLeft={Search}
                        value={searchValue}
                        fullWidth={true}
                    />
                </div>
            </div>
            
            <div className="space-y-1 grid grid-rows-maxcontent">
                <div className="grid grid-cols-fournisseurs font-bold gap-2 pr-1">
                    {FournisseurPresenter.map((data, index) => 
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
                                rowCount={shownFournisseurs.length}
                                rowRenderer={({index,style,parent}) => {
                                    const fournisseur = shownFournisseurs[index]
                                    return(
                                        <CellMeasurer
                                            key={'cell_'+fournisseur.id}
                                            cache={cache.current}
                                            parent={parent}
                                            columnIndex={0}
                                            rowIndex={index}
                                        > 
                                            <div key={fournisseur.id} style={style} className=" py-3 border flex">
                                                <FournisseurLine fournisseurObject={fournisseur} handleChange={replaceAFournisseurWithANewOne} />
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
        </div>
    )
}
