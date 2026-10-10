from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from dotenv import load_dotenv
import sqlite3
import os
import jwt
import datetime 

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')
CORS(app)

def db_connect():
    conn = sqlite3.connect("tarabus.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    return conn, cursor

# conn = db_connect()
# conn.execute("PRAGMA foreign_keys = ON")
# cursor = conn.cursor()
# conn, cursor = db_connect()

# cursor.execute("CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT, phone INTEGER, mail TEXT, nickname TEXT, information TEXT)")

# #cursor.execute("CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY, adminName TEXT UNIQUE, password TEXT, role TEXT)")
# #cursor.execute("DELETE FROM admins WHERE adminName = 'admin'")
# #cursor.execute("INSERT INTO admins (adminName, password, role) VALUES (?, ?, ?)", ("admin", generate_password_hash("admin"), "admin"))
# cursor.execute("DROP TABLE members")
# cursor.execute("CREATE TABLE IF NOT EXISTS routes (id INTEGER PRIMARY KEY, routeName TEXT, routeDiscription TEXT, routeDates DATETIME, routePrice INTEGER, routePlan TEXT, routeConditions TEXT, routeUnconditions TEXT, routeLimit INTEGER, routeDifficulty TEXT, routeLink TEXT, routeStatus TEXT, createdAt DATETIME, author TEXT, FOREIGN KEY (author) REFERENCES admins(adminName))")

# conn.commit()
# conn.close()

def get_fields(data):
    return {
        "routeName" : data.get("routeName"),
        "routeDiscription" : data.get("routeDiscription"),
        "routeDates" : data.get("routeDates"),
        "routePrice" : data.get("routePrice"),
        "routePlan" : data.get("routePlan"),
        "routeConditions" : data.get("routeConditions"),
        "routeUnconditions" : data.get("routeUnconditions"),
        "routeLimit" : data.get("routeLimit"),
        "routeDifficulty" : data.get("routeDifficulty"),
        "routeLink" : data.get("routeLink"),
        "routeAuthor" : data.get("routeAuthor"),
        "routeStatus" : data.get("routeStatus")
    }

def token_check():
    auth_header = request.headers.get("Authorization")
        
    if not auth_header:
        return None, (jsonify({"error": "token is not provided"}), 401)
    
    token = auth_header.split(" ")[1]

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        admin = decoded["login"]
    except jwt.ExpiredSignatureError:
        return None, (jsonify({"error": "token is expired"}), 401)
    except jwt.InvalidTokenError:
        return None, (jsonify({"error": "token is invalid"}), 401)
    return admin, None


    


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    login = data.get("login")
    password = data.get("password")

    if not login or not password:
        return jsonify({"error": "admin is not found"}), 401

    conn, cursor = db_connect()

    cursor.execute("SELECT * FROM admins WHERE adminName = ?", (login,))
    result = cursor.fetchone()

    if not result or not check_password_hash(result["password"], password):
        conn.close()
        return jsonify({"error": "login or password are incorrect"}), 401

    token = jwt.encode(
        {
            "login": login,
            "exp": datetime.datetime.now(datetime.UTC) + datetime.timedelta(days=3)
        },
        SECRET_KEY,
        algorithm="HS256"
    )
    conn.close()
    return jsonify({"message": "admin is logged in", "token": token}), 200



@app.route('/api/route', methods=['POST'])
def createRoute():
    data = get_fields(request.get_json())

    admin, error = token_check()

    if error:
        return error

    conn, cursor = db_connect()

    #routeName, routeDiscription, routeDates, routePrice, routePlan, routeConditions, routeUncondition, routeLimit, routeDifficulty, routeLink, routeStatus, createdAt, author

    cursor.execute("""INSERT INTO routes (routeName, routeDiscription, routeDates, routePrice, routePlan, routeConditions, routeUnconditions, routeLimit, routeDifficulty, routeLink, routeStatus, createdAt, author) VALUES (?,?,?,?,?,?,?,?,?,?,?,datetime('now'),?)""",
                   (data["routeName"], data["routeDiscription"], data["routeDates"], data["routePrice"], data["routePlan"], data["routeConditions"], data["routeUnconditions"], data["routeLimit"], data["routeDifficulty"], data["routeLink"], data["routeStatus"], admin))
    conn.commit()
    newID = cursor.lastrowid
    conn.close()

    return jsonify({"message": "route created", "id": newID}), 201

@app.route('/api/route/<int:route_id>', methods=['PUT'])
def editRoute(route_id):
    data = get_fields(request.get_json())

    admin, error = token_check()

    if error:
        return error

    conn, cursor = db_connect()

    try:
        cursor.execute("""UPDATE routes SET
        routeName = ?,
        routeDiscription = ?,
        routeDates = ?,
        routePrice = ?,
        routePlan = ?,
        routeConditions = ?,
        routeUnconditions = ?,
        routeLimit = ?,
        routeDifficulty = ?,
        routeLink = ?,
        routeStatus = ?
        WHERE id = ?""",
        (data["routeName"], data["routeDiscription"], data["routeDates"], data["routePrice"], data["routePlan"], data["routeConditions"], data["routeUnconditions"], data["routeLimit"], data["routeDifficulty"], data["routeLink"], data["routeStatus"], route_id))
    except Exception as e:
        return jsonify({"error": str(e)}), 401
    finally:
        conn.commit()
        conn.close()

    return jsonify({"message": "route edited"}), 201

@app.route('/api/routes')
def showRoutes():
    admin, error = token_check() 

    if error:
        return error

    conn, cursor = db_connect()

    cursor.execute("SELECT * FROM routes")
    routes = cursor.fetchall()
    conn.close()

    routes = [dict(route) for route in routes]
    return jsonify(routes), 200

@app.route('/api/route/<int:routeID>', methods=['DELETE'])
def deleteRoute(routeID):
    admin, error = token_check()

    if error:
        return error

    conn, cursor = db_connect()
    try:
        cursor.execute("DELETE FROM routes WHERE id = ? ",(routeID,))
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.commit()
        conn.close()

    return jsonify({"message": "route deleted"}), 201

@app.route('/api/route/<int:routeID>', methods=['PUT'])
def archiveRoute(routeID):
    admin, error = token_check()

    if error:
        return error

    conn, cursor = db_connect()
    try: 
        cursor.execute('UPDATE routes archived WHERE id = ?', (routeID,))
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.commit()
        conn.close()
    return jsonify({"message": "route archived succesfully"}, 200)

if __name__ == '__main__':
    app.run(debug=True)