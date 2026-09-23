from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from dotenv import load_dotenv
import sqlite3
import os
import jwt
import datetime 

load_dotenv()
print("CWD:", os.getcwd())
print(".env exists:", os.path.exists(".env"))
SECRET_KEY = os.getenv("SECRET_KEY")
print("SECRET_KEY:", repr(SECRET_KEY))

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')
CORS(app)

conn = sqlite3.connect("admin.db")
conn.execute("PRAGMA foreign_keys = ON")
cursor = conn.cursor()

#cursor.execute("CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY, adminName TEXT UNIQUE, password TEXT, role TEXT)")
#cursor.execute("INSERT INTO admins (adminName, password, role) VALUES ('admin', 'admin', 'admin')")
#cursor.execute("DELETE FROM admins WHERE adminName = 'admin'")
#cursor.execute("INSERT INTO admins (adminName, password, role) VALUES (?, ?, ?)", ("admin", generate_password_hash("admin"), "admin"))
#cursor.execute("DROP TABLE admins")
cursor.execute("CRESTE TABLE IF NOT EXISTS routes")

conn.commit()
conn.close()


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    login = data.get("login")
    password = data.get("password")

    if not login or not password:
        return jsonify({"error": "admin is not found"}), 401

    conn = sqlite3.connect("admin.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM admins WHERE adminName = ?", (login,))
    result = cursor.fetchone()

    if not result or not check_password_hash(result["password"], password):
        return jsonify({"error": "login or password are incorrect"}), 401

    token = jwt.encode(
        {
            "login": login,
            "exp": datetime.datetime.now(datetime.UTC) + datetime.timedelta(days=3)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({"message": "admin is logged in", "token": token}), 200



if __name__ == '__main__':
    app.run(debug=True)