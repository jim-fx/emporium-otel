from pydantic import BaseModel
from typing import List, Dict

class ProductDetail(BaseModel):
    id: str
    quantity: int

class OrderCreate(BaseModel):
    user_id: str
    products: List[ProductDetail]
    total_price: int

class Order(BaseModel):
    id: str
    user_id: str
    products: List[Dict]
    total_price: int

    class Config:
        from_attributes = True
