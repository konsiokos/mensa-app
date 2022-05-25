from . import db, jwt, login_manager
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import expression


# Lookup loader function for flask JWT to find user from JWT token data
@jwt.user_lookup_loader
def user_lookup_callback(header, jwt_data):
    user_id = jwt_data["sub"]
    return AppUser.query.filter_by(UserID=user_id).one_or_none()


# callback function to return user ID when creating a JWT token
@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.UserID


# Lookup loader function for flask login to find user from session
@login_manager.user_loader
def load_user(user_id):
    if int(user_id) <= 2:
        return Admin.query.get(user_id)
    return ClubUser.query.get(user_id)


# database models --------------------------------------


class AppUser(db.Model):
    __tablename__ = "AppUser"
    UserID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Email = db.Column(db.Text(), unique=True, nullable=False)
    Password = db.Column(db.String(64), nullable=False)
    FirstName = db.Column(db.String(20), nullable=False)
    LastName = db.Column(db.String(20), nullable=False)
    Bookings = db.relationship("Booking", cascade="all, delete")

    def check_password(self, password):
        return check_password_hash(self.Password, password)

    def change_password(self, new_pasword):
        self.Password = generate_password_hash(new_pasword)
        db.session.commit()


class Booking(db.Model):
    __tablename__ = "Booking"
    BookingID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserID = db.Column(
        db.Integer, db.ForeignKey("AppUser.UserID", ondelete="CASCADE"), nullable=False
    )
    User = db.relationship("AppUser", back_populates="Bookings")
    isConfirmed = db.Column(db.Boolean, default=True, server_default=expression.false())
    ClubID = db.Column(
        db.Integer, db.ForeignKey("Club.ClubID", ondelete="CASCADE"), nullable=False
    )
    Slot = db.relationship(
        "Slot", back_populates="Booking", uselist=False
    )


class Admin(db.Model, UserMixin):
    __tablename__ = "Admin"
    AdminID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserName = db.Column(db.String(64), nullable=False)
    Password = db.Column(db.String(64), nullable=False)

    def check_password(self, password):
        return check_password_hash(self.Password, password)

    def get_id(self):
        return self.AdminID


class Club(db.Model):
    __tablename__ = "Club"
    ClubID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(64), nullable=False)
    Details = db.Column(db.Text())
    Address1 = db.Column(db.Text(), nullable=False)
    Address2 = db.Column(db.Text(), nullable=False)
    PostCode = db.Column(db.Text(), nullable=False)
    PostCode = db.Column(db.Text(), nullable=False)
    MinPrice = db.Column(db.Integer(), nullable=False)
    Phonenumber = db.Column(db.String(15), nullable=False)
    Tables = db.relationship("Table", cascade="all, delete")
    Bookings = db.relationship("Booking", cascade="all, delete")
    Slots = db.relationship("Slot", cascade="all, delete")
    Images = db.relationship("ClubImages", cascade="all, delete")


class ClubImages(db.Model):
    __tablename__ = "ClubImages"
    ClubID = db.Column(
        db.Integer,
        db.ForeignKey("Club.ClubID", ondelete="CASCADE"),
        nullable=False,
        primary_key=True,
    )
    Image1 = db.Column(db.String(50), nullable=False)
    Image2 = db.Column(db.String(50))
    Image3 = db.Column(db.String(50))


class Table(db.Model):
    __tablename__ = "Table"
    TableID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ClubID = db.Column(
        db.Integer,
        db.ForeignKey("Club.ClubID", ondelete="CASCADE"),
        nullable=False,
    )
    Capacity = db.Column(db.Integer, nullable=False)
    Alias = db.Column(db.String(10))
    Slots = db.relationship("Slot", cascade="all, delete", back_populates="Table")


class Slot(db.Model):
    __tablename__ = "Slot"
    SlotID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    BookingID = db.Column(
        db.Integer,
        db.ForeignKey("Booking.BookingID", ondelete="CASCADE"),
        nullable=True,
    )
    ClubID = db.Column(
        db.Integer, db.ForeignKey("Club.ClubID", ondelete="CASCADE"), nullable=False
    )
    TableID = db.Column(
        db.Integer, db.ForeignKey("Table.TableID", ondelete="CASCADE"), nullable=False
    )
    Table = db.relationship("Table", back_populates="Slots")
    StartDate = db.Column(db.Text, nullable=False)
    StartTime = db.Column(db.Text, nullable=False)
    EndDate = db.Column(db.Text, nullable=False)
    EndTime = db.Column(db.Text, nullable=False)
    Price = db.Column(db.Integer, nullable=False)
    isBooked = db.Column(db.Boolean, default=False, server_default=expression.false())
    Booking = db.relationship("Booking", back_populates="Slot", cascade="all, delete")


class ClubUser(db.Model, UserMixin):
    __tablename__ = "ClubUser"
    ClubUserID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    FirstName = db.Column(db.String(20), nullable=False)
    LastName = db.Column(db.String(20), nullable=False)
    Email = db.Column(db.Text(), unique=True, nullable=False)
    Password = db.Column(db.String(64), nullable=False)
    ClubID = db.Column(
        db.Integer,
        db.ForeignKey("Club.ClubID", ondelete="CASCADE"),
        nullable=False,
    )

    def check_password(self, password):
        return check_password_hash(self.Password, password)

    def get_id(self):
        return self.ClubUserID
