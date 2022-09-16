const express = require("express");
const mongoose = require('mongoose'); //Mongoose permet de faciliter les interactions entre l'application express et la base de données MongoDB.
const path = require("path");
const helmet = require("helmet");// Helmet permet de sécuriser les headers

const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

const app = express(); //Permet d'initialiser express

mongoose.connect(process.env.MONGODB_URL, //Permet de se connecter à la base de données MongoDB
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(helmet()); // Permet d'initialiser helmet

app.use((req, res, next) => { // Configuration CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); //Permet d'accéder a l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //Donne l'autorisation d'utiliser certains headers sur l'objet requête
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //Permet d'envoyer des requêtes avec ces méthodes
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site'); // Permet d'indiquer que la ressource et le document sont diffusés à partir du même site
  next(); // Permet de passer à l'exécution du middleware suivant
});

app.use(express.json()); //Permet d'analyser le corps de la requête

app.use("/images", express.static(path.join(__dirname, "images"))); //Pour chaque requête envoyé à images on sert ce dossier statique images
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);


module.exports = app;
