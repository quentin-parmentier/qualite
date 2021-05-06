import {ReactComponent as SvgLivraison} from '../assets/svg/livraison.svg';
import {ReactComponent as SvgConseil} from '../assets/svg/conseil.svg';
import { renderCellDate, renderCellText } from '../BaseRenderer/rendererBasicCell';
import { renderCellTypeAchat, renderCellAchatPour, renderCellToCommande, renderCellEtatLivraison, renderCellEtatNotes } from './rendererCommande';


export const CommandePresenter = [
    {
        attribut:'numero',
        renderHeader:'Numero',
        renderCell: renderCellText
    },
    {
        attribut:'nomFournisseur',
        renderHeader:'Fournisseur',
        renderCell: renderCellText
    },
    {
        attribut:'typeAchat',
        renderHeader:'Type',
        renderCell: renderCellTypeAchat
    },
    {
        attribut:'achatPour',
        renderHeader:'Achat',
        renderCell: renderCellAchatPour
    },
    {
        attribut:'dateCommande',
        renderHeader:'Commande',
        renderCell: renderCellDate
    },
    {
        attribut:'dateLivraisonTotale',
        renderHeader:'Livraison',
        renderCell: renderCellDate
    },
    {
        attribut:'isNoteDone',
        renderHeader:<SvgConseil className={"w-6 h-6"} />,
        renderCell: renderCellEtatNotes
    },
    {
        attribut:'etatLivrasion',
        renderHeader:<SvgLivraison className={"w-6 h-6"} />,
        renderCell: renderCellEtatLivraison
    },
    {
        attribut:'id',
        renderHeader:'',
        renderCell: renderCellToCommande
    }

]