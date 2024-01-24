from typing import Optional
from pydantic import BaseModel

class User(BaseModel):
    id: Optional[int] = None
    username: str
    email: str
    first_name: str
    last_name: str
    password: Optional[str] = None
    role: Optional[str] = 'user'

#Classe appellée uniquement pour update un user permettant 
class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    password : Optional[str] = None

#Classe permettant de ne pas renvoyer le mot de passe
class ResponseUser(BaseModel):
    id: Optional[int] = None
    username: str
    email: str
    first_name: str
    last_name: str
    role: Optional[str] = 'user'