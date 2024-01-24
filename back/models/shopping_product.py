from typing import Optional
from pydantic import BaseModel

class ShoppingProduct(BaseModel):
    id: Optional[int] = None
    user_id: Optional[int] = None
    product_id: int
    number: int

class ShoppingProductUpdate(BaseModel):
    number: int