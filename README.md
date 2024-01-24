# EasyCart - Votre Plateforme de Commerce Électronique

( Projet étudiant )

Bienvenue sur EasyCart, une plateforme de commerce électronique conçue avec passion et technologie. Notre application offre une expérience d'achat fluide et sécurisée pour les utilisateurs, avec une architecture robuste utilisant Python (FastAPI) pour la partie backend/API et Next.js pour le frontend.

## Initialisation du Projet

### Frontend

Pour initialiser le frontend, exécutez la commande suivante dans le répertoire `front/` :

```bash
npm install
```

### Backend/API

Pour lancer le backend/API, suivez ces étapes simples sur votre système Linux :

1. Assurez-vous que vous avez Python 3 installé.

2. Installez les dépendances requises :

    ```bash
    pip install -r requirements.txt
    ```

3. Lancez l'API en local :

    ```bash
    python main.py
    ```

    L'API sera accessible sur http://localhost:8000.

## Exemple de Requête API avec Insomnia

Testez notre API avec Insomnia en utilisant la configuration suivante :

1. **Endpoint :** http://localhost:8000/user/
2. **Méthode :** POST
3. **Corps de la Requête :**
    ```json
    {
        "username": "johndoe",
        "email": "johndoe@example.com",
        "first_name": "John",
        "last_name": "Doe",
        "password": "s3cr3tP@ssw0rd"
    }
    ```

## Connexion et Génération de Token

1. **Endpoint pour la Connexion :** http://localhost:8000/login
2. **Méthode :** POST
3. **Corps de la Requête :**
    ```json
    {
        "username": "lolo",
        "password": "lolo"
    }
    ```

Le serveur vous renverra un token d'authentification.

## Utilisation du Token pour une Requête Protégée

1. **Exemple de Requête Protégée :** http://localhost:8000/delete
2. **Méthode :** DELETE
3. **Ajoutez dans les En-têtes :** `Authorization: Bearer <token>`

## Qu'est-ce que Next.js ?

Next.js est bien plus qu'un simple framework React. Il révolutionne le développement web en offrant un rendu côté serveur, des performances optimales, et une intégration fluide avec les API. Lancer le site est aussi simple que d'exécuter la commande suivante dans le répertoire `front/` :

```bash
npm run dev
```

Ouvrez votre navigateur préféré et visitez http://localhost:3000 pour plonger dans l'expérience EasyCart. Profitez de votre shopping en ligne ! 🛍️
