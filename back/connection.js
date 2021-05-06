const mongoose = require('mongoose');

const connect = async function (res){
    await mongoose.connect("mongodb+srv://user_rw:"+process.env.BDDPCW+"@cluster0.mvrgt.mongodb.net/Cluster0?retryWrites=true&w=majority"
    , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connexion réussie"))
    .catch((error) => res.status(500).json({error}))
}

module.exports = connect;