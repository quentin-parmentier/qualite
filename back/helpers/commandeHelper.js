export function createNumeroCommande(lastcommande){
    const today = new Date();
    const baseNum = `${today.getFullYear().toString().slice(-2)}-${(today.getMonth() + 1).toString().padStart(2,"0")}-`
    if(!lastcommande) return baseNum + '01'
    const numero = (parseInt(lastcommande.numero.split('-')[2]) + 1).toString().padStart(2,'0')
    
    return baseNum + numero.toString()
}