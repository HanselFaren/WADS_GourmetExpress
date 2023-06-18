from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    description: str

class Store(BaseModel):
    name: str
    is_public: bool
