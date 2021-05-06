const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//{id_commande:[1,2,3],id_commande:[2,3,2]}
const noteLivraisonSchema = Schema({
  _id: Schema.Types.ObjectId,
  id_commande: { 
    type: Schema.Types.ObjectId, ref: 'commande',
    unique: true,
    require: [true,'id commande requis'],
  },
  id_fournisseur: { 
    type: Schema.Types.ObjectId, ref: 'fournisseur', 
    require: [true,'id fournisseur requis']
  },
  notes: [Number]
});

const NoteLivraison = mongoose.model('noteLivraison', noteLivraisonSchema);

module.exports = NoteLivraison;