from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import sqlite3
import os

load_dotenv()

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')
CORS(app)

conn = sqlite3.connect("adminn.db")
conn.row_factory = sqlite3.Row()
cursor = conn.cursor()

cursor.execute("CREATE TABLE IF NOT EXIST admins (id INTEGER, adminName TEXT UNIQUE, password TEXT, role TEXT)")

conn.commit()
conn.close()


SECRET_KEY = os.getenv("SECRET_KEY")

@app.route("/api/login")
def login():
    data = request.get_data()
    login = data.get("login")
    password = data.get("password")

    if not login or not password:
        return jsonify({"error": "admin is not found"}), 401

    conn = sqlite3.connect("admin.db")
    conn.row_factory = sqlite3.Row()
    cursor = conn.cursor()

    cursor.execute("SELECT adminName FROM admins WHERE adminName = ? AND password = ?", (login, password))
    result = cursor.fetchall()

    if not result:
        return jsonify({"error": ""})

    return


if __name__ == '__main__':
    app.run(debug=True)