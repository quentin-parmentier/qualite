const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commandeSchema = Schema({
  _id: Schema.Types.ObjectId,
  id: {
    type: String, 
    unique: true,
    required: [true,'id requis']
  },
  numero: {
    type: String, 
    unique: true,
    required: [true,'id requis']
  },
  typeAchat: Number,
  achatPour: Number,
  achatPrecision: String,
  achatPrestaPrecision: Number,
  fournisseur: { type: Schema.Types.ObjectId, ref: 'fournisseur' },
  isPlus500EuroHT: Boolean,
  dateCommande: Date,
  dateValidationCommande: Date,
  modeCommande: Number,
  dateLivraisonTotale: Date,
  etatLivrasion: Number
});

commandeSchema.post('save', function(error, doc, next){
  if(error.name === "MongoError" && error.code === 11000){
    //On a une violation d'unique
    if(error.keyValue.id) return Promise.reject('Cet id existe déjà')
    if(error.keyValue.numero) return Promise.reject('Ce numéro de commande existe déjà')
  }else{
    next()
  }
})

const Commande = mongoose.model('commande', commandeSchema);
module.exports = Commande;