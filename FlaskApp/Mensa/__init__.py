from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from datetime import timedelta
from os import path
import os

# global scope instances
# instance of flask login manager 
login_manager = LoginManager() 
# instance of flask SQLAlchemy for database management 
db = SQLAlchemy()
# instance of flask JWT extended for authentication 
jwt = JWTManager()
base_dir = path.abspath(path.dirname(__file__))

# application factory that returns an instance of the app
def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + path.join(
        base_dir, "mensa.db"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_TOKEN_LOCATION"] = "headers"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=30)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
    db.init_app(app)
    jwt.init_app(app)
    login_manager.init_app(app)
    # blueprint for app route 
    from .app import App as app_blueprint

    app.register_blueprint(app_blueprint)
    # blueprint for authentication routes
    from .auth import auth as auth_blueprint

    app.register_blueprint(auth_blueprint)
    # blueprint for admin routes
    from .admin import admin as admin_blueprint

    app.register_blueprint(admin_blueprint)
    # blueprint for client routes
    from .client import client as client_blueprint

    app.register_blueprint(client_blueprint)
    return app
