# -*- coding: utf-8 -*-

import os
from fastapi import FastAPI
from routers.user_router import router as user_router
from routers.product_router import router as product_router
from routers.shopping_product import router as shopping_product_router
from db.database import init_db, default_db, drop_db
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Initialisation de la base de donnée
# drop_db()
init_db()
# default_db()

# Inclure le routeur d'utilisateurs dans l'application FastAPI
app.include_router(user_router)
app.include_router(product_router)
app.include_router(shopping_product_router)


# route d'accueil (non nécessaire)
@app.get("/")
def read_root():
    return {"message": "Bienvenue sur mon API FastAPI"}

# Utilisation de cet if permet de lancer l'application avec Uvicorn directement depuis ce fichier
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
