from flask import render_template, request, jsonify, Blueprint
from flask_login import current_user, login_required, logout_user
from sqlalchemy import null
from .models import Club, ClubUser, Slot, Table, Booking
from . import db
from sqlalchemy import sql

client = Blueprint(
    "Client", __name__, template_folder="templates", static_folder="static"
)

# route for client profile page in web portal
@client.route("/client/profile", methods=["GET"])
@login_required
def client_profile_page():
    user = current_user
    c = Club.query.filter_by(ClubID=user.ClubID).first()
    return render_template("client_profile_page.html", tables=c.Tables, club=c, user=user)

# route for client bookings page in web portal 
@client.route("/client/bookings", methods=["GET"])
@login_required
def client_bookings_page():
    user = current_user
    club = Club.query.filter_by(ClubID=user.ClubID).first()
    return render_template("client_bookings_page.html", bookings=club.Bookings, slots=club.Slots, tables=club.Tables)

# route for client adding a table to a club
@client.route("/api/client/add-table", methods=["POST"])
@login_required
def add_table():
    user = current_user
    capacity = request.get_json()["capacity"]
    alias = request.get_json()["alias"]
    table = Table(Capacity=capacity, Alias=alias, ClubID=user.ClubID)
    db.session.add(table)
    db.session.commit()
    return "success"

# router for client deleting a table at club
@client.route("/api/client/delete-table", methods=["POST"])
@login_required
def delete_table():
    tableid = request.get_json()["tableID"]
    table = Table.query.filter_by(TableID=tableid).first()
    if table.ClubID == current_user.ClubID:
        db.session.delete(table)
        db.session.commit()
        return "success"
    return "cannot delete table"

# route for a client to update the details of a table at their club 
@client.route("/api/client/update-table", methods=["POST"])
@login_required
def update_table():
    tableid = request.get_json()["tableID"]
    capacity = request.get_json()["capacity"]
    alias = request.get_json()["alias"]
    table = Table.query.filter_by(TableID=tableid).first()
    if table.ClubID == current_user.ClubID:
        table.Capacity = capacity
        table.Alias = alias
        db.session.commit()
        return "success"
    return "cannot update table"

# route for a client to add an availability slot
@client.route("/api/client/add-slot", methods=["POST"])
@login_required
def make_slot():
    tableid = request.get_json()["tableID"]
    start = request.get_json()["start"]
    starttime = request.get_json()["startTime"]
    end = request.get_json()["end"]
    endtime = request.get_json()["endTime"]
    price = request.get_json()["price"]
    slot = Slot(TableID=tableid, StartDate=start, StartTime=starttime, EndDate=end, EndTime=endtime, Price=price, ClubID=current_user.ClubID)
    db.session.add(slot)
    db.session.commit()
    return "success"

# route for a client to remove an availability slot
@client.route("/api/client/delete-slot", methods=["POST"])
@login_required
def delete_slot():
    slotid = request.get_json()["slotID"]
    slot = Slot.query.filter_by(SlotID=slotid).first()
    if slot is not None: 
        db.session.delete(slot)
        db.session.commit()
    return "success"




@client.route("/api/client/accept-booking", methods=["POST"])
@login_required
def accept_booking():
    bookingID = request.get_json()["bookingID"]
    booking = Booking.query.get(bookingID)
    if booking is not None:
        booking.isConfirmed = True
        db.session.commit()
        return "success"
    return "unsuccessful"

@client.route("/api/client/reject-booking", methods=["POST"])
@login_required
def reject_booking():
    bookingID = request.get_json()["bookingID"]
    booking = Booking.query.get(bookingID)
    if booking is not None:
        slot = booking.Slot
        slot.isBooked = False
        slot.BookingID = sql.null()
        db.session.delete(booking)
        db.session.commit()
        return "success"
    return "unsuccessful"

