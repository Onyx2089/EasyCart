import sqlite3
from passlib.hash import bcrypt
from fastapi import HTTPException 


def get_db():
    try:
        conn = sqlite3.connect('back_end.db')
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail="could not connect to database")
    


def init_db():
    conn = sqlite3.connect('back_end.db')
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE IF NOT EXISTS users
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username VARCHAR UNIQUE,
                    last_name VARCHAR,
                    first_name VARCHAR,
                    role TEXT,
                    email VARCHAR UNIQUE,
                    password VARCHAR)''')
    
    cursor.execute('''CREATE TABLE IF NOT EXISTS products
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR UNIQUE,
                value INTEGER,
                price INTEGER)''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS shopping_products
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER ,
                product_id INTEGER,
                number INTEGER)''')    

    conn.commit()
    conn.close()



def default_db():
    conn = sqlite3.connect('back_end.db')
    cursor = conn.cursor()

    # Vérifier si un utilisateur avec l'id 1 existe déjà
    cursor.execute("SELECT * FROM users WHERE id = 1")
    existing_user = cursor.fetchone()
    if not existing_user:
        admin_user = {
            'username': 'admin',
            'last_name': 'Admin',
            'first_name': 'Admin',
            'email': 'admin@example.com',
            'password': bcrypt.hash('root'),
            'role': 'admin'
        }

        cursor.execute('''INSERT INTO users (username, last_name, first_name, email, password, role)
                          VALUES (:username, :last_name, :first_name, :email, :password, :role)''', admin_user)
        conn.commit()

    cursor.execute("SELECT * FROM products WHERE id = 1")
    existing_product = cursor.fetchone()

    if not existing_product:
        # Le produit avec l'id 0 n'existe pas, nous pouvons l'insérer
        insert_product = {
            'name': 'Tomate',
            'value': 50,
            'price': 4
        }

        cursor.execute('''INSERT INTO products (name, value, price)
                          VALUES (:name, :value, :price)''', insert_product)
        
    
    cursor.execute("SELECT * FROM shopping_products WHERE id = 1")
    existing_shopping_product = cursor.fetchone()

    if not existing_shopping_product:
        # Le produit avec l'id 0 n'existe pas, nous pouvons l'insérer
        insert_shopping_product = {
            'user_id': 1,
            'product_id': 1,
            'number': 6
        }

        cursor.execute('''INSERT INTO shopping_products (id, user_id, product_id, number)
                          VALUES (1, :user_id, :product_id, :number)''', insert_shopping_product)

    conn.commit()
    conn.close()  



def drop_db():
    conn = sqlite3.connect('back_end.db')
    cursor = conn.cursor()

    cursor.execute('''DROP TABLE IF EXISTS users''')

    cursor.execute('''DROP TABLE IF EXISTS products''')

    conn.commit()
    conn.close()