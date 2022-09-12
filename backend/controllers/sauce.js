const Sauce = require("../models/sauce");
const fs = require("fs"); //Accès aux différentes opérations liées au systèm de fichiers

//----- Creation sauce -----//
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); //Récupere l'objet JSON de la sauce
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`, //Crée l'URL de l'image
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersdisLiked: [],
    });

    sauce.save()
    .then(() => res.status(201).json({message: "Sauce enregistrée"}))
    .catch(error => res.status(400).json({ error }));
};

//----- Modification sauce -----//
exports.modifySauce =  (req, res, next) => {
        if(req.file){ //Si on trouve un fichier image dans la requête alors
        Sauce.findOne({ _id: req.params.id }) //Recherche la sauce avec cet Id
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, (err) => { //Supprime cette photo qui est donc l'ancienne
                if (err) 
                throw err
            });
        })
        .catch(error => res.status(400).json({error}));
    }

    const sauceObject = req.file ? // Si on trouve un fichier image dans la requête alors
    {
        ...JSON.parse(req.body.sauce), //on récupère l'objet json
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //et on ajoute l'image URL
    } : { ...req.body} //sinon on prend le corps de la requête
    Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id }) //On modifie celui dont l'ID est égale à l'ID envoyé dans les paramètres de requêtes
        .then(() => res.status(200).json({message:'Sauce modifiée'}))
        .catch(error => res.status(400).json({error}));
};

//----- Suppression sauce -----//
exports.deleteSauce =  (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) //Recherche de la sauce avec son ID
        .then(sauce => {
            if (sauce.userId != req.auth.userId) { //Si la demande ne viens pas du créateur de la sauce via comparaison userId
                res.status(401).json({message: "Non autorisé"});

            } else {
                const filename = sauce.imageUrl.split("/images/")[1]; //Récupère le nom du fichier précisément
                fs.unlink(`images/${filename}`, () => { //Suppression de l'image du dossier images
                    Sauce.deleteOne({_id: req.params.id}) //Supression de la sauce avec son ID
                        .then(() => res.status(200).json({ message: "Sauce supprimée !"}))
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => res.status(500).json({ error }));
};
//----- Récupération de la sauce -----//
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) //Recherche de la sauce avec son ID
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};
//----- Récupération des sauces -----//
exports.getAllSauces = (req, res, next) => {
    Sauce.find() //Recherche de toutes les sauces
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};
//----- Like/Dislike sauce -----//
exports.likeSauce = (req, res, next) => {
    let like = req.body.like;
    let userId = req.body.userId;
    let sauceId = req.params.id;
  
    switch (like) {
      case 1: //Cas 1 on like la sauce
        Sauce.updateOne(
          { _id: sauceId },
          { $push: { usersLiked: userId }, $inc: { likes: +1 } } //Ajout de l'ID de l'utilisateur qui like dans tableau des usersLiked de la sauce
        )
          .then(() => res.status(200).json({ message: "like" }))
          .catch((error) => res.status(400).json({ error }));
  
        break;
  
      case 0: // Cas 0 la sauce est neutre ( pas de like/dislike )
        Sauce.findOne({ _id: sauceId }) //Recherche de la sauce avec son ID
          .then((sauce) => {
            if (sauce.usersLiked.includes(userId)) {
              Sauce.updateOne(
                { _id: sauceId },
                { $pull: { usersLiked: userId }, $inc: { likes: -1 } } //Suppression de l'ID de l'utilisateur qui retire son like du tableau des usersLiked de la sauce
              )
                .then(() => res.status(200).json({ message: "neutre" }))
                .catch((error) => res.status(400).json({ error }));
            }
            if (sauce.usersDisliked.includes(userId)) {
              Sauce.updateOne(
                { _id: sauceId },
                { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } } //Suppression de l'ID de l'utilisateur qui retirer son dislike du tableau des usersDisliked de la sauce
              )
                .then(() => res.status(200).json({ message: "neutre" }))
                .catch((error) => res.status(400).json({ error }));
            }
          })
          .catch((error) => res.status(404).json({ error }));
        break;
  
      case -1: //Cas -1 on dislike la sauce
        Sauce.updateOne(
          { _id: sauceId },
          { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } } //Ajout de l'ID de l'utilisateur qui dislike dans tableau des usersDisliked de la sauce
        )
          .then(() => {
            res.status(200).json({ message: "dislike" });
          })
          .catch((error) => res.status(400).json({ error }));
        break;
  
      default:
        console.log(error);
    }
  };
  