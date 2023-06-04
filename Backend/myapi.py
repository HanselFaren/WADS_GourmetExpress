from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import Base, Store, Item

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=['https://frontend-kohl-eight.vercel.app/'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/stores")
def get_stores(db: Session = Depends(get_db)):
    stores = db.query(Store).all()
    return stores

@app.post("/stores")
def create_store(store_name: str, db: Session = Depends(get_db)):
    store = Store(name=store_name)
    db.add(store)
    db.commit()
    db.refresh(store)
    return store

@app.get("/stores/{store_id}/items")
def get_store_items(store_id: int, db: Session = Depends(get_db)):
    store = db.query(Store).get(store_id)
    if not store:
        raise HTTPException(status_code=404, detail="Store not found")
    items = store.items
    return items

@app.post("/stores/{store_id}/items")
def create_item(store_id: int, item_name: str, item_price: int, db: Session = Depends(get_db)):
    store = db.query(Store).get(store_id)
    if not store:
        raise HTTPException(status_code=404, detail="Store not found")
    item = Item(name=item_name, price=item_price, store_id=store_id)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=5000)
