const mongoose = require("mongoose"); //Mongoose permet de faciliter les interactions entre l'application express et la base de données MongoDB.

const sauceSchema =mongoose.Schema({ //Crée un schéma de données des sauces pour la base de données MongoDB
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true } ,
    description: { type: String, required: true } ,
    mainPepper: { type: String, required: true } ,
    imageUrl: { type: String, required: true } ,
    heat: { type: Number, required: true },
    likes: { type: Number, required: true } ,
    dislikes: { type: Number, required: true } ,
    usersLiked: { type: [String], required: true },
    usersDisliked:{ type: [String], required: true }
});

module.exports = mongoose.model("Sauce", sauceSchema); //Exportation du schéma de sauces