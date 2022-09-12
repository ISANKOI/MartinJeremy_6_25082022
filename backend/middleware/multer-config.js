const multer = require("multer"); //Multer permet de gérer les fichiers entrants dans les requêtes HTTP

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"

};

const storage = multer.diskStorage({ //Enregistre les fichiers dans le dossier images
    destination: (req, file, callback) => { 
        callback(null, "images")
    },
    filename: (req, file, callback) => { //Utilise le nom d'origine, remplace les espaces par des underscores et ajoute un timestamp Date.now() comme nom de fichier
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    }
});

module.exports = multer({ storage }).single("image"); //Exportation de multer configuré (gestion téléchargement images)