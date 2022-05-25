from flask import render_template, request, jsonify, Blueprint
from flask_login import current_user, login_required
from sqlalchemy import null
from .models import Club, ClubImages
from . import db
import base64
import os
from io import BytesIO
from PIL import Image
from sqlalchemy import sql

admin = Blueprint("admin", __name__, template_folder="templates", static_folder="static")

images_dir = os.path.join("Mensa/clubImages/")

@admin.route("/admin/home", methods=["GET"])
@login_required
def admin_page():
    user = current_user
    print(user.UserName)
    c = Club.query.all()
    return render_template("admin_home.html", clubs=c, user=user)

# route for admins to register new clubs
@admin.route("/api/auth/add-club", methods=["POST"])
def add_club():
    name = request.get_json()["name"]
    a1 = request.get_json()["address1"]
    a2 = request.get_json()["address2"]
    pc = request.get_json()["postcode"]
    images_base64 = [
        request.get_json()["image1"],
        request.get_json()["image3"],
        request.get_json()["image3"],
    ]
    details = request.get_json()["details"]
    name = request.get_json()["name"]
    phone = request.get_json()["phone"]
    minprice = request.get_json()["minprice"]
    exists = Club.query.filter_by(Name=name).first()
    if exists is None:
        club = Club(
            Name=name,
            Details=details,
            Address1=a1,
            Address2=a2,
            PostCode=pc,
            Phonenumber=phone,
            MinPrice=minprice,
        )
        db.session.add(club)
        db.session.commit()
        club = Club.query.filter_by(Name=name).first()
        # check if current club already has images saved
        imageRow = ClubImages.query.filter_by(ClubID=club.ClubID).first()
        if imageRow is None:
            # make club images entry with paths to images if images are given
            images = ClubImages(
                ClubID=club.ClubID,
                Image1=os.path.join(
                    images_dir,
                    f"club{club.ClubID}/club{club.ClubID}image1.png"
                ),
                Image2=os.path.join(
                    images_dir,
                    f"club{club.ClubID}/club{club.ClubID}image2.png"
                )
                if images_base64[1] != ""
                else sql.null(),
                Image3=os.path.join(
                    images_dir,
                    f"club{club.ClubID}/club{club.ClubID}image3.png"
                )
                if images_base64[2] != ""
                else sql.null(),
            )
            db.session.add(images)
            db.session.commit()
            # make new directory for current club images
            os.makedirs(os.path.join(images_dir, f"club{club.ClubID}/"))
            # decode each image and save it as .png file in corresponding
            # directory
            for i, img in enumerate(images_base64):
                if img != "":
                    image_binary = BytesIO(base64.b64decode(img))
                    im = Image.open(image_binary)
                    im.save(
                        os.path.join(
                            images_dir,
                            f"club{club.ClubID}/club{club.ClubID}image{i+1}.png",
                        ),
                        "PNG",
                    )

        return jsonify("success")

    return jsonify("already exists")


@admin.route("/delete-club", methods=["POST"])
def delete_club():
    clubid = request.get_json()["clubID"]
    club = Club.query.filter_by(ClubID=clubid)
    db.session.delete(club)
    db.session.commit()
    return "success"
