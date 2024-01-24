import sqlite3
from typing import List
from sqlite3 import Connection
from crud.shopping_product import create_shopping_product, read_shopping_products, read_price #create_product, read_products, read_product, update_product, delete_product
from db.database import get_db
from models.shopping_product import ShoppingProduct, ShoppingProductUpdate
from fastapi import APIRouter, Depends
from security.auth import validate_token


router = APIRouter()

@router.post("/shoppings")
def create_shopping_product_endpoint(shopping_product: ShoppingProduct, db: Connection = Depends(get_db), payload: dict = Depends(validate_token)):
    requester_id = payload["user_id"]
    return create_shopping_product(shopping_product, db, requester_id)


@router.get("/shoppings/cart", response_model= [] )
def read_shopping_products_endpoint(db: Connection = Depends(get_db), payload: dict = Depends(validate_token)):
    requester_id = payload["user_id"]
    return read_shopping_products(db, requester_id)


@router.get("/shoppings/price", response_model= int )
def read_price_shopping_cart_endpoint(db: Connection = Depends(get_db), payload: dict = Depends(validate_token)):
    requester_id = payload["user_id"]
    return read_price(db, requester_id)

