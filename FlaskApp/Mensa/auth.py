from flask import Blueprint, render_template, request, jsonify, url_for, redirect
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    current_user,
)
from flask_login import login_user, login_required, logout_user

from .models import Admin, AppUser, ClubUser


auth = Blueprint("auth", __name__, template_folder="templates", static_folder="static")

# route for app user login 
@auth.route("/api/app/login", methods=["POST"])
def login():
    email = request.get_json()["email"]
    password = request.get_json()["password"]
    user = AppUser.query.filter_by(Email=email).first()
    if user is not None and user.check_password(password):
        at = create_access_token(identity=user)
        rt = create_refresh_token(identity=user)
        response = {"authenticated": "true", "accessToken": at, "refreshToken": rt}
        return jsonify(response)
    else:
        return jsonify({"authenticated": "false"})

# render client and admin login portal 
@auth.route("/login-portal", methods=["GET"])
def login_portal():
    return render_template("login.html")

# logout currently logged in user 
@auth.route("/api/logout", methods=["GET"])
@login_required
def client_logout():
    logout_user()
    return url_for("auth.login_portal")

# end point for client authentication 
@auth.route("/api/client/login", methods=["POST"])
def client_login():
    username = request.get_json()["username"]
    password = request.get_json()["password"]
    user = ClubUser.query.filter_by(Email=username).first()
    if user is not None and user.check_password(password):
        login_user(user)
        return url_for("Client.client_profile_page")
    return "unsuccessful"

@auth.route("/api/admin/login", methods=["POST"])
def admin_login():
    username = request.get_json()["username"]
    password = request.get_json()["password"]
    user = Admin.query.filter_by(UserName=username).first()
    if user is not None and user.check_password(password):
        login_user(user)
        return url_for("admin.admin_page")
    return "unsuccessful"


# end point for app user password change 
@auth.route("/api/app/change-password", methods=["POST"])
@jwt_required()
def app_change_password():
    user = current_user
    old_password = request.get_json()["oldPassword"]
    new_password = request.get_json()["newPassword"]

    if not user.check_password(old_password):
        return "invalid old password"

    if new_password == "" or new_password == old_password:
        return "invalid new password"

    user.change_password(new_password)

    return "success"

# route for refreshing JWT tokens 
@auth.route("/api/app/refresh-token", methods=["GET"])
@jwt_required(refresh=True)
def refresh_token():
    user = current_user
    at = create_access_token(identity=user)
    rt = create_refresh_token(identity=user)
    response = {"accessToken": at, "refreshToken": rt}
    return jsonify(response), 200
