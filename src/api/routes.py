"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
import json 


api = Blueprint('api', __name__)

#############################TOKEN#################################

#@api.route("/token", methods=["POST"])
#def create_token():
 #   email = request.json.get("email")
 #   password = request.json.get("password")
 #   
 #   try:
  #      user = User.query.filter_by(email=email, password=password).first()    
 #       if user is None:
 #           return jsonify({"msg": "Email o Contraseñas Incorrectas"}), 401
#
  #      access_token = create_access_token(identity=user.id)
 #       return jsonify({"token": access_token, "user_id": user.id}) 
  #  except Exception as e: 
  #          print(e)
  #          return jsonify({"message" : "Producto no Creado", "created" : False}), 500    

#############################USUARIOS#################################

@api.route('/user', methods=['POST'])
def create_user():
    email = request.json.get('email')
    password = request.json.get('password')

    if not (email and password):
        return jsonify({"message": "Usuario no creado", "created": False}), 400
    
    user = User(email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Usuario creado", "created": True}), 200
    
# @api.route('/user', methods=['GET'])
# @jwt_required()
# def get_user_by_id():
#       current_user_id = get_jwt_identity()
#       user = User.query.get(current_user_id)
#       return jsonify({"user": user.serialize()}), 200    

#############################LOGIN#################################

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if email and password is None:
        return jsonify({"msg": "Email y password requeridos"}), 400

    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"message": "El usuario no existe"}), 400
    
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id})