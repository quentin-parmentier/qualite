import ViewCommandeList from "../Commande/ViewCommandeList";
import ViewCommandeCreation from "../Commande/ViewCommandeCreation";
import ViewFournisseurList from "../Fournisseur/ViewFournisseurList";
import ViewFournisseurPage from "../Fournisseur/ViewFournisseurPage";
import Error404 from "../Error/Error404";

const routes = [
    {
        path:'/commande', 
        component:ViewCommandeList, 
        exact:true
    },
    {
        path:'/commande/create', 
        component:ViewCommandeCreation, 
        exact:true
    },
    {
        path:'/fournisseur', 
        component:ViewFournisseurList, 
        exact:true,
        onEnter:() => console.log("Entré")
    },
    {
        path:'/fournisseur/:id', 
        component:ViewFournisseurPage, 
        exact:true
    },
    {
        path:'/', 
        component:Error404, 
        exact:false
    }
]

export default routes