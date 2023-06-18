import sqlite3

DATABASE_PATH = 'store.db'

def create_database():
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()

    # Create the stores table if it doesn't exist
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS stores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            is_public INTEGER NOT NULL
        )
    """)

    # Create the items table if it doesn't exist
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT NOT NULL,
            store_id INTEGER NOT NULL,
            FOREIGN KEY (store_id) REFERENCES stores (id)
        )
    """)

    conn.commit()
    cursor.close()
    conn.close()

def get_connection():
    return sqlite3.connect(DATABASE_PATH)
