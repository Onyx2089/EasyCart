from passlib.hash import bcrypt
import sqlite3
from sqlite3 import Connection
from fastapi import HTTPException

from models.product import Product , ProductUpdate


def create_product(product: Product, db: Connection, requester_id : int):
    try:

        cursor = db.cursor()
    
        # vérifie le rôle de l'utilisateur qui fait la demande
        cursor.execute('SELECT role FROM users WHERE id = ?', (requester_id,))
        requester_role = cursor.fetchone()

        # autorise la suppression si l'utilisateur demandeur est un admin ou si c'est son propre compte
        if requester_role[0] != 'admin':
            raise HTTPException(status_code=403, detail="Vous n'avez pas les permissions nécessaires")


        cursor.execute('''INSERT INTO products (name, value, price)
                        VALUES (?, ?, ?)''',
                    (product.name, product.value, product.price))
        db.commit()
        cursor.close()
        db.close()
    except sqlite3.DatabaseError as e:  
        db.rollback() 
        raise HTTPException(status_code=500, detail=f"Erreur de la base de données: {e}")

    return {"message" : "Le product a bien été créé"}



def read_products(db : Connection):
    try :   
        cursor= db.cursor()
        cursor.execute('SELECT * FROM products')
        rows= cursor.fetchall()

    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return [Product(id=row['id'], name= row['name'], value=row['value'], price=row['price']) for row in rows]


def read_product(product_id : int, db : Connection):
    try : 
        cursor = db.cursor()
        cursor.execute('SELECT * FROM products WHERE id=?', (product_id,))
        row = cursor.fetchone()
        if row is None:
            raise HTTPException(status_code= 404, detail="Product not found")
        
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    return [Product(id=row['id'], name= row['name'], value=row['value'], price=row['price'])]


def delete_product(product_id : int, db : Connection, requester_id : int):
    try :
        cursor = db.cursor()
                    
        # vérifie le rôle de l'utilisateur qui fait la demande
        cursor.execute('SELECT role FROM users WHERE id = ?', (requester_id,))
        requester_role = cursor.fetchone()

        # autorise la suppression si l'utilisateur demandeur est un admin ou si c'est son propre compte
        if requester_role[0] != 'admin':
            raise HTTPException(status_code=403, detail="Vous n'avez pas les permissions nécessaires")


        cursor.execute('DELETE FROM products WHERE id = ?', (product_id,))
        db.commit()
    except sqlite3.Error as e :
        raise HTTPException(status_code= 500, detail=(str(e)))
    
    return {'message' : 'Product deleted succesfully'}


#Ici on appelle la class UserUpdate et non User pour qu'on ne soit pas obligé de changer tout les champs
def update_product(product_id: int, product_update: ProductUpdate, db: Connection, requester_id : int):
    try:
        cursor = db.cursor()
            
        # vérifie le rôle de l'utilisateur qui fait la demande
        cursor.execute('SELECT role FROM users WHERE id = ?', (requester_id,))
        requester_role = cursor.fetchone()

        # autorise la suppression si l'utilisateur demandeur est un admin ou si c'est son propre compte
        if requester_role[0] != 'admin':
            raise HTTPException(status_code=403, detail="Vous n'avez pas les permissions nécessaires")


        #Ici on stockera les valeurs qu'on veut changer
        update_values = []
        #Ici on stockera la partie des requetes SQL par exemple username=?, prenom=?, nom=?, email=? 
        update_sql_parts = []

        #Ici on définit les champs qu'on veut mettre à jour
        fields_to_update = {
            "name": product_update.name,
            "value": product_update.value,
            "price": product_update.price,
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
        update_sql = f"UPDATE products SET {', '.join(update_sql_parts)} WHERE id = ?"
        #Ajoute l'ID à la requête
        update_values.append(product_id)
        #On execute la requête a
        cursor.execute(update_sql, update_values)
        db.commit()

    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"message": "Product mis à jour avec succès"}  
# >>>>>>> main
