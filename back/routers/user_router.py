import sqlite3
from typing import List
from sqlite3 import Connection

from fastapi.security import OAuth2PasswordRequestForm
from security.auth import validate_token
from crud.user_crud import read_user, read_users, update_user, delete_user, create_user, login
from db.database import get_db
from models.user import ResponseUser, User, UserUpdate
from fastapi import APIRouter, Depends

router = APIRouter()

@router.post("/users/")
def create_user_endpoint(user: User, db: Connection = Depends(get_db)):
    return create_user(user, db)


@router.get("/users/", response_model= List[ResponseUser])
def read_users_endpoint(db: Connection = Depends(get_db), payload: dict = Depends(validate_token)):
    requester_id = payload["user_id"]
    # print(payload)
    return read_users(db, requester_id)



@router.get("/users/{user_id}", response_model = List[ResponseUser])
def read_user_endpoint(user_id: int,db: Connection = Depends(get_db), payload: dict = Depends(validate_token)):
    requester_id = payload["user_id"]

    return read_user(user_id, db, requester_id)



@router.put("/users/{user_id}")
def update_user_endpoint(user_id: int, user_update: UserUpdate, db: Connection = Depends(get_db), payload: dict = Depends(validate_token)):
    requester_id = payload["user_id"]

    return update_user(user_id, user_update, db, requester_id)


@router.delete("/users/{user_id}", dependencies=[Depends(validate_token)])
def delete_user_endpoint(user_id: int, payload: dict = Depends(validate_token), db: Connection = Depends(get_db)):
    requester_id = payload["user_id"]

    delete_user(user_id, requester_id, db)
    return {"message": "Utilisateur supprimé avec succès"}



@router.post("/login")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Connection = Depends(get_db)):
    return login(db=db, form_data=form_data)
