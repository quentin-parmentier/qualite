const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const fournisseurSchema = Schema({
  _id: Schema.Types.ObjectId,
  id: {
    type: String, 
    unique: true,
    required: [true,'id requis']
  },
  nom: {
    type: String, 
    required: [true,'Nom de fournisseur requis']
  },
  notesConseil: {
    type: [Schema.Types.ObjectId], ref: 'noteConseil'
  },
  compte: String,
  psw: String,
  email: String,
  tel: String
});


fournisseurSchema.post('save', function(error, doc, next){
  if(error.name === "MongoError" && error.code === 11000){
    //On a une violation d'unique
    if(error.keyValue.id) return Promise.reject('Cet id existe déjà')
  }else{
    next()
  }
})

const Fournisseur = mongoose.model('fournisseur', fournisseurSchema);

module.exports = Fournisseur;