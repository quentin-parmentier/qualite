import { NavLink } from 'react-router-dom'
import {achatPourList, typeAchatList} from './choicesListesCommande'
import {ReactComponent as Edit} from '../assets/svg/edit.svg';

export function renderCellTypeAchat({value,key}){
    const label = typeAchatList.find((item) => item.value === value)?.label
    return <div key={key} className='text-center self-center'> { label } </div>
}

export function renderCellAchatPour({value,key}){
    const label = achatPourList.find((item) => item.value === value)?.label
    return <div key={key} className='text-center self-center'> { label } </div>
}

export function renderCellToCommande({value,key}){
    
    return (
    <div key={key} className=' justify-self-center self-center'> 
        <NavLink to={`/commande/edit/${value}`}>
            <Edit className=" w-8 h-8" />
        </NavLink>
    </div>
    )
}

export function renderCellEtatLivraison({value,key,setCommandeEditing,commande}){
    let color = ''
    switch (value) {
        case 0:
            color = 'bg-red-500'
            break;
        case 1:
            color = 'bg-yellow-500'
            break;
        case 2:
            color = 'bg-green-400'
            break;
        default:
    }

    return (
        <div 
            key={key} 
            className={`h-25 w-25 my-auto justify-self-center self-center ${color}`} 
            onClick={() => setCommandeEditing(commande)}
        />
    )
}

export function renderCellEtatNotes({value, key}){
    let color = ''
    switch (value) {
        case 0:
            color = 'bg-red-500'
            break;
        case 1:
            color = 'bg-yellow-500'
            break;
        case 2:
            color = 'bg-green-400'
            break;
        default:
    }

    return (
        <div 
            key={key} 
            className={`h-25 w-25 my-auto justify-self-center self-center ${color}`}
        />
    )
}