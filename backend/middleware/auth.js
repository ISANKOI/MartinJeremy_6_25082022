const jwt = require("jsonwebtoken"); //Jsonwebtoken permet de créer et vérifier les tokens d'authentification

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; //Récupération du token du header authorization de la requete
        const decodedToken = jwt.verify(token, "MY_TOKEN_IS_VERY_SECRET");//Décodage du token
        const userId = decodedToken.userId; //Récupération de l'userId
        req.auth = {
            userId: userId
        };
    next();
    } catch(error) {
        res.status(401).json({ error });
    }
};