# from passlib.hash import bcrypt
import sqlite3
from sqlite3 import Connection
from fastapi import HTTPException

from models.shopping_product import ShoppingProduct, ShoppingProductUpdate

def create_shopping_product(shopping_product: ShoppingProduct, db: Connection, requester_id : int):
    try:

        cursor = db.cursor()
    
        cursor.execute('SELECT * FROM products WHERE id = ?', (shopping_product.product_id,))
        requester_product = cursor.fetchone()

        # check if product exist
        if requester_product is None:
            raise HTTPException(status_code=404, detail="Product not found")


        cursor.execute('SELECT * FROM shopping_products WHERE user_id = ? AND product_id = ?', (requester_id, shopping_product.product_id,))
        requester_product = cursor.fetchone()

        # check if not create doublon with user and product
        if requester_product is not None:
            raise HTTPException(status_code=409, detail="Create doublon")


        cursor.execute('''INSERT INTO shopping_products (user_id, product_id, number)
                          VALUES (:user_id, :product_id, :number)''',
                    (requester_id, shopping_product.product_id, shopping_product.number))


        db.commit()
        cursor.close()
        db.close()
    except sqlite3.DatabaseError as e:  
        db.rollback() 
        raise HTTPException(status_code=500, detail=f"Erreur de la base de données: {e}")

    return {"message" : "Le shopping_product a bien été créé"}

def read_shopping_products(db : Connection, requester_id : int):
    try :   
        cursor= db.cursor()
        
        cursor.execute('''
            SELECT sp.id, p.name, p.price, sp.number 
            FROM shopping_products sp
            JOIN products p ON sp.product_id = p.id
            WHERE user_id=?
        ''', (requester_id,))

        rows = cursor.fetchall()        

    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return rows

def read_price(db : Connection, requester_id : int):
    try :   
        cursor= db.cursor()
        
        cursor.execute('''
            SELECT sp.number, p.price 
            FROM shopping_products sp
            JOIN products p ON sp.product_id = p.id
            WHERE user_id=?
        ''', (requester_id,))

        rows = cursor.fetchall()        

        price = 0

        for row in rows:
            price += row['number'] * row['price']


    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return price