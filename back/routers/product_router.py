import sqlite3
from typing import List
from sqlite3 import Connection
from crud.product_crud import create_product, read_products, read_product, update_product, delete_product
from db.database import get_db
from models.product import Product, ProductUpdate
from fastapi import APIRouter, Depends
from security.auth import validate_token


router = APIRouter()

@router.post("/products/")
def create_product_endpoint(product: Product, db: Connection = Depends(get_db), payload: dict = Depends(validate_token)):
    requester_id = payload["user_id"]
    return create_product(product, db, requester_id)



@router.get("/products/", response_model= List[Product])
def read_users_endpoint(db: Connection = Depends(get_db)):
    return read_products(db)



@router.get("/products/{product_id}", response_model = List[Product])
def read_product_endpoint(product_id: int, db: Connection = Depends(get_db)):
    product = read_product(product_id, db)
    return product



@router.put("/products/{product_id}")
def update_user_endpoint(product_id: int, user_update: ProductUpdate, db: Connection = Depends(get_db), payload: dict = Depends(validate_token)):
    requester_id = payload["user_id"]
    return update_product(product_id, user_update, db, requester_id)


@router.delete("/products/{product_id}")
def delete_product_endpoint(product_id: int,  db: Connection = Depends(get_db), payload: dict = Depends(validate_token)):
    requester_id = payload["user_id"]
    delete_product(product_id, db, requester_id)
    return {"message": "Product successfully deleted"}

