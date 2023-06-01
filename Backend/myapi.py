from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3

app = FastAPI()


# Database setup
conn = sqlite3.connect("food_delivery.db")
cursor = conn.cursor()

# Create items table
cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL
    )
    """
)

# Create orders table
cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_id INTEGER,
        quantity INTEGER,
        FOREIGN KEY (item_id) REFERENCES items (id)
    )
    """
)

# Commit changes and close connection
conn.commit()
conn.close()


# Models
class Item(BaseModel):
    name: str
    price: float


class OrderItem(BaseModel):
    item_id: int
    quantity: int


class Order(BaseModel):
    items: list[OrderItem]


# Item endpoints
@app.post("/items")
def create_item(item: Item):
    conn = sqlite3.connect("food_delivery.db")
    cursor = conn.cursor()

    cursor.execute("INSERT INTO items (name, price) VALUES (?, ?)", (item.name, item.price))

    conn.commit()
    conn.close()

    return {"message": "Item created successfully"}


@app.get("/items")
def get_items():
    conn = sqlite3.connect("food_delivery.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM items")
    items = cursor.fetchall()

    conn.close()

    formatted_items = [{"id": item[0], "name": item[1], "price": item[2]} for item in items]

    return formatted_items


@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    conn = sqlite3.connect("food_delivery.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM items WHERE id = ?", (item_id,))
    item = cursor.fetchone()

    if not item:
        conn.close()
        raise HTTPException(status_code=404, detail="Item not found")

    cursor.execute("DELETE FROM items WHERE id = ?", (item_id,))

    conn.commit()
    conn.close()

    return {"message": "Item deleted successfully"}


# Order endpoints
@app.post("/order")
def create_order(order: Order):
    conn = sqlite3.connect("food_delivery.db")
    cursor = conn.cursor()

    order_total = 0

    for order_item in order.items:
        item_id = order_item.item_id
        quantity = order_item.quantity

        cursor.execute("SELECT * FROM items WHERE id = ?", (item_id,))
        item = cursor.fetchone()

        if not item:
            conn.close()
            raise HTTPException(status_code=404, detail=f"Item with ID {item_id} not found")

        order_total += item[2] * quantity

        cursor.execute("INSERT INTO orders (item_id, quantity) VALUES (?, ?)", (item_id, quantity))

    conn.commit()
    conn.close()

    new_order = {"total": order_total}

    return new_order


@app.get("/orders")
def get_orders():
    conn = sqlite3.connect("food_delivery.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM orders")
    orders = cursor.fetchall()

    conn.close()

    formatted_orders = [{"id": order[0], "item_id": order[1], "quantity": order[2]} for order in orders]

    return formatted_orders


@app.delete("/order/{order_id}")
def delete_order(order_id: int):
    conn = sqlite3.connect("food_delivery.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM orders WHERE id = ?", (order_id,))
    order = cursor.fetchone()

    if not order:
        conn.close()
        raise HTTPException(status_code=404, detail="Order not found")

    cursor.execute("DELETE FROM orders WHERE id = ?", (order_id,))

    conn.commit()
    conn.close()

    return {"message": "Order deleted successfully"}
