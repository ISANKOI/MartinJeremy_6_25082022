<h2>Mesures de sécurité mises en place :</h2>

- Hashage du mot de passe utilisateur avec bcrypt
- Manupulation sécurisée de la base de donnée avec mongoose
- Vérification que l'email utilisateur soit unique dans la base de données avec mongoose-unique-validator
- Utilisation de variables d'environnement pour les données sensibles avec dotenv
- Authentification de l'utilisateur par token avec jsonwebtoken
- Protection des headers avec helmet


<h2>Test de l'application :</h2>

- Cloner Front

1. Cloner le <a href='https://github.com/ISANKOI/MartinJeremy_6_25082022/tree/main/frontend'>frontend</a> de l'application.
2. Installer les dépendances : npm install
3. Lancer : npm start

- Cloner Back

1. Cloner le <a href='https://github.com/ISANKOI/MartinJeremy_6_25082022/tree/main/backend'>backend</a> de l'application.
2. Pour le projet le fichier .env n'est pas ignoré dans gitignore.
3. installer les dépendances : npm install
4. lancer nodemon server

- Front accessible a l'adresse : http://localhost:4200
- Le backend répond à l'adresse: http://localhost:3000 (attention: authentification requise pour toutes les routes /api/sauces/)