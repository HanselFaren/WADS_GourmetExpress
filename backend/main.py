from fastapi import FastAPI, HTTPException
from typing import List
from database import create_database, get_connection
from models import Item, Store

app = FastAPI()

# Create the database tables if they don't exist
create_database()

# Endpoint to add an item to the store
@app.post('/api/items')
def add_item(item: Item):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Insert the item into the database
        cursor.execute("INSERT INTO items (name, price, description) VALUES (?, ?, ?)",
                       (item.name, item.price, item.description))
        conn.commit()

        return {"message": "Item added successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

# Endpoint to fetch existing stores
@app.get('/api/stores')
def get_stores():
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Fetch all stores from the database
        cursor.execute("SELECT * FROM stores")
        stores = cursor.fetchall()

        return stores
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

# Endpoint to create a store
@app.post('/api/stores')
def create_store(store: Store):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Insert the store into the database
        cursor.execute("INSERT INTO stores (name, is_public) VALUES (?, ?)",
                       [store.name, store.is_public])
        conn.commit()

        return {"message": "Store created successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

# Endpoint to fetch a specific store
@app.get('/api/stores/{store_id}')
def get_store(store_id: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Fetch the store from the database based on the store_id
        cursor.execute("SELECT * FROM stores WHERE id = ?", (store_id,))
        store = cursor.fetchone()

        if store:
            return store
        else:
            raise HTTPException(status_code=404, detail="Store not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

# Endpoint to fetch items of a specific store
@app.get('/api/stores/{store_id}/items')
def get_store_items(store_id: int):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Fetch items of the specific store from the database
        cursor.execute("SELECT * FROM items WHERE store_id = ?", (store_id,))
        items = cursor.fetchall()

        return items
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

# API endpoint to place an order
@app.post('/api/orders')
def place_order(items: List[int]):
    try:
        # Implement the logic to place the order based on the item IDs
        # You can access the item IDs in the `items` list parameter

        return {"message": "Order placed successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the FastAPI application
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
