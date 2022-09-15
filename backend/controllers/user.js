const bcrypt = require("bcrypt"); //Bcrypt permet de crypter le mot de passe en le hachant 
const jwt = require("jsonwebtoken"); //Jsonwebtoken permet de créer et vérifier les tokens d'authentification
const User = require("../models/user");

//----- Creation utilisateur -----//
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //Permet de hash le mot de passe sur 10 tour
    .then(hash => {
        const user = new User({ //Créé un nouveau utilisateur
            email: req.body.email,
            password: hash
        });
        user.save() //Sauvegarde de l'utilisateur dans la base de données
            .then(() => res.status(201).json({ message : "Utilisateur créé !" }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
//----- Connexion utilisateur -----//
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) //Recherche de l'email de l'utilisateur dans la base de données
       .then((user) => {
           if (!user) { //Si l'utilisateur n'est pas trouvé/existe pas
               return res.status(401).json({ message: "Email/mot de passe incorrecte"});
           }
           bcrypt.compare(req.body.password, user.password) //comparaison du mot de passe de l'utilisateur avec celui de la base de données
               .then(valid => {
                    if (!valid) { //Si le mot de passe est différent
                        return res.status(401).json({ message: "Email/mot de passe incorrecte" });
                   }
                        res.status(200).json({ //Sinon status réussite et renvoie de l'objet
                            userId: user._id,
                            token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_MYSECRET, //Clé secrete
                            {expiresIn: "24h"} //Durée d'expiration du token
                            )
                        });
               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
};