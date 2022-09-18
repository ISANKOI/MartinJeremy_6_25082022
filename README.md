<h2>Mesures de sécurité mises en place :</h2>

- Hashage du mot de passe utilisateur avec bcrypt
- Manupulation sécurisée de la base de donnée avec mongoose
- Vérification que l'email utilisateur soit unique dans la base de données avec mongoose-unique-validator
- Utilisation de variables d'environnement pour les données sensibles avec dotenv
- Authentification de l'utilisateur par token avec jsonwebtoken
- Protection des headers avec helmet


<h2>Test de l'application :</h2>

- Pour le projet le fichier .env n'est pas ignoré dans gitignore.

1. Cloner <a href='https://github.com/ISANKOI/MartinJeremy_6_25082022'>l'application</a>.

2. A l'aide de votre terminal se placer dans le dossier frontend de l'application
    - Installer les dépendances : npm install
    - Lancer : npm start

3. A l'aide de votre terminal se placer dans le dossier backend de l'application
    - Installer les dépendances : npm install
    - Lancer : nodemon server

- Front accessible a l'adresse : http://localhost:4200
- Le backend répond à l'adresse: http://localhost:3000 (attention: authentification requise pour toutes les routes /api/sauces/)