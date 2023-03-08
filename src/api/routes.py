"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("username", None)
    password = request.json.get("password", None)
    if email == None:
        return "The email is missing", 404
    if password == None:
        return "The last password is missing", 404
    user = User.query.filter_by(email=email).first()
    if (user == None):
        return "user does not exist", 404
    if user.password != password:
        return jsonify("wrong password"), 404
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/register", methods=["POST"])
def register():
    request_body = request.json
    if (request_body["email"] == None):
        return "The email is missing", 404
    if (request_body["password"] == None):
        return "The password name is missing", 404
    
    user = User(request_body["email"], request_body["password"], request_body["is_active"])
    
    db.session.add(user)
    db.session.commit()

    
    
    return jsonify({"user": user.serialize()}), 200


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify("This secret came from the backend through a JWT protected route"), 200