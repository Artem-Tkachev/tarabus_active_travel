from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from dotenv import load_dotenv
import sqlite3
import os
import jwt
import datetime
import uuid

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')
CORS(app)

def db_connect():
    conn = sqlite3.connect("tarabus.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    return conn, cursor

def init_db():
    conn, cursor = db_connect()

    cursor.execute("DROP TABLE members")
    cursor.execute("""CREATE TABLE IF NOT EXISTS members (
        id INTEGER PRIMARY KEY,
        name TEXT,
        phone TEXT,
        email TEXT,
        nickname TEXT,
        information TEXT,
        routeID INTEGER,
        bookingID TEXT,
        cancelled INTEGER DEFAULT 0, 
        createdAt DATETIME,
        FOREIGN KEY (routeID) REFERENCES routes(id)
    )""")

    conn.commit()
    conn.close()

#init_db()

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
        "routeStatus" : data.get("routeStatus"),
        "memberName": data.get("memberName"),
        "memberPhone": data.get("memberPhone"),
        "memberEmail": data.get("memberEmail"),
        "memberNickname": data.get("memberNickname"),
        "memberInformation": data.get("memberInformation")
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

# публичный список туров для сайта — без токена, только опубликованные и не архивные.
# её дёргает routesContext.jsx, когда в localStorage нет токена (обычный посетитель сайта)
@app.route('/api/public/routes')
def showPublicRoutes():
    conn, cursor = db_connect()

    cursor.execute("SELECT * FROM routes WHERE routeStatus = 'published' AND (archived IS NULL OR archived = 0)")
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

@app.route('/api/route/<int:routeID>/archive', methods=['PUT'])
def archiveRoute(routeID):
    admin, error = token_check()

    if error:
        return error

    conn, cursor = db_connect()
    try:
        cursor.execute("UPDATE routes SET archived = 1 WHERE id = ?", (routeID,))
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.commit()
        conn.close()
    return jsonify({"message": "route archived"}), 200

@app.route('/api/route/<int:routeID>/restore', methods=['PUT'])
def restoreRoute(routeID):
    admin, error = token_check()

    if error:
        return error

    conn, cursor = db_connect()
    try:
        cursor.execute("UPDATE routes SET archived = 0 WHERE id = ?", (routeID,))
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.commit()
        conn.close()
    return jsonify({"message": "route restored"}), 200

# список записавшихся на конкретную поездку — для админки (страница /routes/:id/bookings)
@app.route('/api/route/<int:routeID>/bookings')
def getRouteBookings(routeID):
    admin, error = token_check()

    if error:
        return error

    conn, cursor = db_connect()

    cursor.execute("SELECT * FROM routes WHERE id = ?", (routeID,))
    route = cursor.fetchone()

    if not route:
        conn.close()
        return jsonify({"error": "route not found"}), 404

    cursor.execute("SELECT * FROM members WHERE routeID = ? ORDER BY id", (routeID,))
    members = cursor.fetchall()
    conn.close()

    return jsonify({
        "route": dict(route),
        "members": [dict(member) for member in members]
    }), 200

@app.route('/api/route/<int:routeID>/book', methods=['POST'])
def bookRoute(routeID):
    data = get_fields(request.get_json())

    bookingID = uuid.uuid4().hex

    conn, cursor = db_connect()
    try:
        cursor.execute("INSERT INTO members (name, phone, email, nickname, information, routeID, bookingID, createdAt) VALUES (?,?,?,?,?,?,?, datetime('now'))",
                        (data["memberName"], data["memberPhone"], data["memberEmail"], data["memberNickname"], data["memberInformation"], routeID, bookingID))
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.commit()
        conn.close()
    return jsonify({"message": "booking succeed", "bookingID": bookingID}), 200

# личный доступ к брони держится на самом bookingID (это случайная строка —
# как и обсуждали, её не угадать и не перебрать), поэтому токен тут не нужен
@app.route('/api/booking/<bookingID>')
def getBooking(bookingID):
    conn, cursor = db_connect()

    cursor.execute("""
        SELECT members.*, routes.routeName, routes.routeDates, routes.routePrice, routes.routePlan
        FROM members
        JOIN routes ON members.routeID = routes.id
        WHERE members.bookingID = ?
    """, (bookingID,))
    booking = cursor.fetchone()
    conn.close()

    if not booking:
        return jsonify({"error": "booking not found"}), 404

    return jsonify(dict(booking)), 200

@app.route('/api/booking/<bookingID>', methods=['PUT'])
def editBooking(bookingID):
    data = get_fields(request.get_json())

    conn, cursor = db_connect()
    try:
        cursor.execute("""UPDATE members SET
        name = ?,
        phone = ?,
        email = ?,
        nickname = ?,
        information = ?
        WHERE bookingID = ?""",
        (data["memberName"], data["memberPhone"], data["memberEmail"], data["memberNickname"], data["memberInformation"], bookingID))
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.commit()
        conn.close()
    return jsonify({"message": "booking updated"}), 200

@app.route('/api/booking/<bookingID>/cancel', methods=['PUT'])
def cancelBooking(bookingID):
    conn, cursor = db_connect()
    try:
        cursor.execute("UPDATE members SET cancelled = 1 WHERE bookingID = ?", (bookingID,))
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.commit()
        conn.close()
    return jsonify({"message": "booking cancelled"}), 200

if __name__ == '__main__':
    app.run(debug=True)
