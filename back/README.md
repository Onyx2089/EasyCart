# Groupe de biton_l 1020832

# Update user

# Installer les dépendances nécéssaires
pip install -r requirements.txt

# Lancer l'API en local 
python main.py

# Exemple de requete avec Insomnia
http://localhost:8080/user/

{
    "username": "johndoe",
    "email": "johndoe@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "password": "s3cr3tP@ssw0rd"
}

# Tester récupération token 
post : http://localhost:8080/login
username : lolo
password : lolo

Il retourne un token 

Nouvelle requete sur une route protégée (par exemple delete)

Ajouter : Authorization Bearer token 





