from typing import Optional
from pydantic import BaseModel

class Product(BaseModel):
    id: Optional[int] = None
    name: str
    value: int
    price: int

#Classe appellée uniquement pour update un product  
class ProductUpdate(BaseModel):
    name: Optional[str] = None
    value: Optional[int] = None
    price: Optional[int] = None
