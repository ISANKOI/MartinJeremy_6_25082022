const express = require("express");
const app = express(); //Permet d'initialiser express
const path = require('path');
const mongoose = require('mongoose');

const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

mongoose.connect("mongodb+srv://SANKO:Roger_13013@cluster.bf2dmbh.mongodb.net/?retryWrites=true&w=majority", //Permet de se connecter à la base de données MongoDB
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //Permet d'accéder a l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //Donne l'autorisation d'utiliser certains headers sur l'objet requête
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //Permet d'envoyer des requêtes avec ces méthodes
    next(); // Permet de passer à l'exécution du middleware suivant
  });

app.use(express.json()); //Remplace body-parser et analyse donc le corps de la requête

app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images"))); //Pour chaque requête envoyé à images on sert ce dossier statique images

module.exports = app;
