import {ReactComponent as SvgLivraison} from '../assets/svg/livraison.svg';
import {ReactComponent as SvgConseil} from '../assets/svg/conseil.svg';
import ViewFournisseurInputCell from './ViewFournisseurInputCell'

const renderCellInput = ({value,changeFournisseurState,attribut,key, errors}) => <ViewFournisseurInputCell data={value} changeState={changeFournisseurState} attribut={attribut} key={key} errors={errors} />
const renderCellColor = ({value,key}) => <div key={key} className={["h-25 my-auto ", value ? ' bg-green-400' : ' bg-red-500']}></div>

export const FournisseurPresenter = [
    {
        attribut:'nom',
        renderHeader:'Nom',
        renderCell: renderCellInput
    },
    {
        attribut:'compte',
        renderHeader:'Compte',
        renderCell: renderCellInput
    },
    {
        attribut:'psw',
        renderHeader:'Password',
        renderCell: renderCellInput
    },
    {
        attribut:'email',
        renderHeader:'Mail',
        renderCell: renderCellInput
    },
    {
        attribut:'tel',
        renderHeader:'Telephone',
        renderCell: renderCellInput
    },
    {
        attribut:'isNoteConseilGood',
        renderHeader:<SvgConseil className={"w-6 h-6"} />,
        renderCell: renderCellColor
    },
    {
        attribut:'isNoteLivraisonGood',
        renderHeader:<SvgLivraison className={"w-6 h-6"} />,
        renderCell: renderCellColor
    }

]