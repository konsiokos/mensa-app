from flask import request, jsonify, Blueprint
from sqlalchemy import null
from . import db
import os
import base64
from .models import AppUser, Booking, Club, ClubImages, Table, Slot
from werkzeug.security import generate_password_hash
from flask_jwt_extended import jwt_required, current_user

App = Blueprint("App", __name__)


# route for getting all available slots at a club 
@App.route("/api/app/get-available-slots", methods=["POST"])
@jwt_required()
def get_slots():
    clubid = request.get_json()["clubID"]
    slots = Slot.query.filter_by(isBooked=False).filter_by(ClubID=clubid)
    response = []
    for slot in slots:
        dict = {}
        dict["table"] = to_json(slot.Table)
        dict["slot"] = to_json(slot)
        dict["slot"].pop("Table")
        response.append(dict)
    return jsonify(response)

#  route for creating a new app user 
@App.route("/api/app/register", methods=["POST"])
def register():
    first = request.get_json()["firstName"]
    last = request.get_json()["lastName"]
    pw = request.get_json()["password"]
    email = request.get_json()["email"]
    exists = AppUser.query.filter_by(Email=email).first()
    if exists is None:
        pw_hash = generate_password_hash(pw, method="sha256")
        new_user = AppUser(
            FirstName=first, LastName=last, Email=email, Password=pw_hash
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify("success")
    else:
        return jsonify("user already exists")

#  route for getting all clubs from database 
@App.route("/api/app/get-clubs", methods=["GET"])
@jwt_required()
def get_all_clubs():
    clubs = Club.query.all()
    response = []
    # for each club, convert club images to base64 string 
    for club in clubs:
        # get images for current club from db table 
        images = ClubImages.query.filter_by(ClubID=club.ClubID).first()
        dict = to_json(club)
        if images != None:
            images = [images.Image1, images.Image2, images.Image3]
            for i,image in enumerate(images):
                if image is not None:
                    # encode image file to base64 and add to response dictionary
                    with open(os.path.join(os.getcwd(), image), "rb") as image_file:
                        encoded_string = base64.b64encode(image_file.read())
                        base64_string = encoded_string.decode('utf-8')
                        dict[f"Image{i+1}"] = base64_string
                else:
                    dict[f"Image{i+1}"] = ""
        else:
            dict["Image1"] = ""
            dict["Image2"] = ""
            dict["Image3"] = ""
        response.append(dict)

    return jsonify(response)

# route for getting current user's bookings 
@App.route("/api/app/get-bookings", methods=["GET"])
@jwt_required()
def get_bookings():
    response = []
    bookings = current_user.Bookings
    for book in bookings:
        dict = {}
        dict["info"] = to_json(book.Slot)
        dict["booking"] = to_json(book)
        dict["booking"].pop("Slot")
        dict["club"] = to_json(Club.query.filter_by(ClubID=book.ClubID).first())
        response.append(dict)

    return jsonify(response)

# route for user to make a booking
@App.route("/api/app/make-booking", methods=["POST"])
@jwt_required()
def make_booking():
    slotid = request.get_json()["slotID"]
    slot = Slot.query.filter_by(SlotID=slotid).first()
    if slot.isBooked == True:
        return "already booked"
    slot.isBooked = True
    booking = Booking(
        UserID=current_user.UserID, isConfirmed=False, Slot=slot, ClubID=slot.ClubID
    )
    slot.BookingID = booking.BookingID
    db.session.add(booking)
    db.session.commit()
    return "success"

# route to return current user's details 
@App.route("/api/app/user-details", methods=["GET"])
@jwt_required()
def get_user_details():
    return to_json(current_user)

# function for converting ORM model instance to JSON 
def to_json(obj):
    dict = obj.__dict__
    if "_sa_instance_state" in dict.keys():
        dict.pop("_sa_instance_state")
    return dict
