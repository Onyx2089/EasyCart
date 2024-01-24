from typing import Optional
from fastapi.security import OAuth2PasswordRequestForm
from security.auth import create_access_token
import sqlite3
from passlib.hash import bcrypt
from sqlite3 import Connection
from fastapi import Depends, HTTPException

from models.user import User , UserUpdate

def create_user(user: User, db: Connection):
    try:
        hashed_password = bcrypt.hash(user.password)
        cursor = db.cursor()
        cursor.execute('''INSERT INTO users (username, last_name, first_name, email, password)
                        VALUES (?, ?, ?, ?, ?)''',
                    (user.username, user.last_name, user.first_name, user.email, hashed_password))
        db.commit()
    except sqlite3.IntegrityError as e:
        raise HTTPException(status_code=400, detail=f"Erreur d'intégrité de la base de données: {e}")
    except sqlite3.DatabaseError as e:
        raise HTTPException(status_code=500, detail=f"Erreur de la base de données: {e}")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erreur du serveur: {e}")
    finally:
        cursor.close()
        db.close()

    return {"message" : "L'utilisateur a bien été créé"}

def create_admin(user: User, db: Connection, requester_id: int):
    try:
        cursor = db.cursor()

        # Vérifie le rôle de l'utilisateur qui fait la demande
        cursor.execute('SELECT role FROM users WHERE id = ?', (requester_id,))
        requester_role = cursor.fetchone()
        if requester_role is None:
            raise HTTPException(status_code=404, detail="Utilisateur demandeur introuvable")

        if requester_role[0] != 'admin':
            raise HTTPException(status_code=403, detail="Vous n'avez pas la permission de créer un admin")

        # L'utilisateur demandeur est un admin
        hashed_password = bcrypt.hash(user.password)  # Supposons que bcrypt est importé ailleurs dans votre code
        cursor.execute('''INSERT INTO users (username, last_name, first_name, email, password, role)
                          VALUES (?, ?, ?, ?, ?, 'admin')''',
                       (user.username, user.last_name, user.first_name, user.email, hashed_password))

        db.commit()
    except sqlite3.IntegrityError as e:
        raise HTTPException(status_code=400, detail=f"Erreur d'intégrité de la base de données: {e}")
    except sqlite3.DatabaseError as e:
        raise HTTPException(status_code=500, detail=f"Erreur de la base de données: {e}")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erreur du serveur: {e}")
    finally:
        cursor.close()
        db.close()

    return {"message": "L'utilisateur admin a bien été créé"}


def read_users(db : Connection, requester_id: int):
    try :   
        cursor= db.cursor()

        # vérifie le rôle de l'utilisateur qui fait la demande
        cursor.execute('SELECT role FROM users WHERE id = ?', (requester_id,))
        requester_role = cursor.fetchone()

        # autorise la suppression si l'utilisateur demandeur est un admin ou si c'est son propre compte
        if requester_role[0] != 'admin':
            raise HTTPException(status_code=403, detail="Vous n'avez pas les permissions nécessaires")

        cursor.execute('SELECT * FROM users')
        rows= cursor.fetchall()


    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    # except Exception as e:
        # raise HTTPException(status_code=500, detail=str(e))
    

    return [User(id=row['id'], username= row['username'],last_name=row['last_name'], first_name=row['first_name'], role=row['role'], email=row['email']) for row in rows]


def read_user(user_id : int, db : Connection, requester_id: int):
    try : 
        cursor = db.cursor()

        # vérifie le rôle de l'utilisateur qui fait la demande
        cursor.execute('SELECT role FROM users WHERE id = ?', (requester_id,))
        requester_role = cursor.fetchone()

        # autorise la suppression si l'utilisateur demandeur est un admin ou si c'est son propre compte
        if requester_role[0] != 'admin' and requester_id != user_id:
            raise HTTPException(status_code=403, detail="Vous n'avez pas les permissions nécessaires")

        cursor.execute('SELECT * FROM users WHERE id=?', (user_id,))
        row = cursor.fetchone()
        if row is None:
            raise HTTPException(status_code= 404, detail="User not found")
        
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    return [User(id=row['id'], username= row['username'],last_name=row['last_name'], first_name=row['first_name'], email=row['email'])]



def delete_user(user_id: int, requester_id: int, db: Connection):
    try:
        cursor = db.cursor()
       
        # vérifie le rôle de l'utilisateur qui fait la demande
        cursor.execute('SELECT role FROM users WHERE id = ?', (requester_id,))
        requester_role = cursor.fetchone()

        # autorise la suppression si l'utilisateur demandeur est un admin ou si c'est son propre compte
        if requester_role[0] != 'admin' and requester_id != user_id:
            raise HTTPException(status_code=403, detail="Vous n'avez pas les permissions nécessaires")

        cursor.execute('DELETE FROM users WHERE id = ?', (user_id,))
        db.commit()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
        
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    return {'message': 'Utilisateur supprimé avec succès'}




#Ici on appelle la class UserUpdate et non User pour qu'on ne soit pas obligé de changer tout les champs
def update_user(user_id: int, user_update: UserUpdate, db: Connection, requester_id: int):
    try:
        cursor = db.cursor()

        # vérifie le rôle de l'utilisateur qui fait la demande
        cursor.execute('SELECT role FROM users WHERE id = ?', (requester_id,))
        requester_role = cursor.fetchone()

        # autorise la suppression si l'utilisateur demandeur est un admin ou si c'est son propre compte
        if requester_role[0] != 'admin' and requester_id != user_id:
            raise HTTPException(status_code=403, detail="Vous n'avez pas les permissions nécessaires")

        #Ici on stockera les valeurs qu'on veut changer
        update_values = []
        #Ici on stockera la partie des requetes SQL par exemple username=?, prenom=?, nom=?, email=? 
        update_sql_parts = []

        #Ici on définit les champs qu'on veut mettre à jour
        fields_to_update = {
            "username": user_update.username,
            "email": user_update.email,
            "first_name": user_update.first_name,
            "last_name": user_update.last_name,
            #on hash le mot de passe
            "password": bcrypt.hash(user_update.password) if user_update.password is not None else None,
        }
        # ici on se balade dans fiels_to_update pour récupérer les valeurs qu'on veut changer, par exemple pour username : "username" on l'ajoute à la requête sql 
        # et user_update.username si il existe, on l'ajoute à notre tableu update_values
        for field_name, field_value in fields_to_update.items():
            if field_value is not None:
                update_values.append(field_value)
                update_sql_parts.append(f"{field_name} = ?")

        # Si rien n'existe on retourne en Json un message
        if not update_sql_parts:
            return {"message": "Aucune mise à jour nécessaire"}

        # update_sql sera notre requete, on ajoute les parties que l'on a stocké dans notre update_sql_parts
        update_sql = f"UPDATE users SET {', '.join(update_sql_parts)} WHERE id = ?"
        #Ajoute l'ID à la requête
        update_values.append(user_id)
        #On execute la requête a
        cursor.execute(update_sql, update_values)

        db.commit()

    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e)) 

    return {"message": "Utilisateur mis à jour avec succès"}



def validate_user(username: str, password: str, db: Connection) -> Optional[int]:
    cursor = db.cursor()
    try: 
        cursor.execute("SELECT id, password FROM users WHERE username = ?", (username,))
        user_record = cursor.fetchone()
        if user_record:
            user_id, hashed_password = user_record
            if bcrypt.verify(password, hashed_password):
                return user_id
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    return None



def login(db: Connection, form_data: OAuth2PasswordRequestForm = Depends()):
    user_id = validate_user(form_data.username, form_data.password, db)
    if user_id is None:
        raise HTTPException(status_code=400, detail="Identifiants incorrects")
    
    access_token = create_access_token(user_id=user_id, data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}
