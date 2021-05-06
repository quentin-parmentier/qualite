const BASE_URI = '/api'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()

//Middleware pour jwt
var authenticateToken = function (req, res, next) {
    if(req.path.indexOf(`${base}`) == -1) return next()
    const authHeader = req.headers['authorization']
    //Bearer + Token
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({message : "Connectez-vous"})
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({message:err})
      const currentId = user.iduser
      //Pour valider l'iduser id.match(/^[0-9a-fA-F]{24}$/) car 24 caract fixé en hexa
      if(!currentId.match(/^[0-9a-fA-F]{24}$/)) return res.status(401).json({message : "Identifiant inconnu"})
      req.body.iduser = currentId
      next()
    })
}

//Simplifie l'utilisation de data
var dataToBody = function(req,res,next){
    req.body = req.body.data ?? req.body
    next()
}

app.use(bodyParser.json())
app.use(cors())
app.use(dataToBody)

//Routes
const fournisseurRoutes = require('./routes/fournisseur.js')
app.use(`${BASE_URI}/fournisseur`, fournisseurRoutes)

const commandeRoutes = require('./routes/commande.js')
app.use(`${BASE_URI}/commande`, commandeRoutes)

//Listener
const port = process.env.PORT || 3001;
app.listen(port)