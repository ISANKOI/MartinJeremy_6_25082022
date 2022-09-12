const mongoose = require("mongoose"); //Mongoose permet de faciliter les interactions entre l'application et la base de données MongoDB.
const uniqueValidator = require("mongoose-unique-validator"); //Permet d'améliorer les messages d'erreur lors de l'enregistrement de données uniques

const userSchema = mongoose.Schema({ //Crée un schéma de données des utilisateurs pour la base de données MongoDB
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); //Vérifie que l'email de l'utilisateur est bien unique
module.exports = mongoose.model("User", userSchema); //Exportation du schéma des utilisateurs