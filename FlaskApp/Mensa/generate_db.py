import sys, csv, os
from os import path
from pathlib import Path

main_dir = Path(os.path.abspath(__file__)).parents[1]
sys.path.insert(0, str(main_dir))
from Mensa import create_app, db
from Mensa.models import *


base_dir = path.abspath(path.dirname(__file__))
# file names for database tables (dummy data)
tables = ["AppUser", "ClubUser", "Table", "Club", "Slot", "Booking", "ClubImages", "Admin"]

# populates (seeds) SQLite database with dummy data 
def populate():
    for table in tables:
        with open(f"{base_dir}/data/{table}.csv", newline="") as table_file:
            csv_reader = csv.reader(table_file, delimiter=",")
            headers = next(csv_reader)
            objects = []

            for row in csv_reader:
                for index,i in enumerate(row):
                    if i == "True":
                        row[index] = True
                    if i == "False":
                        row[index] = False
                
                kwargs = str(dict(zip(headers, row)))
                objects.append(eval(table + "(**" + kwargs + ")"))

            db.session.bulk_save_objects(objects)
            db.session.commit()


if __name__ == "__main__":
    try:
        choice = sys.argv[1]
        app = create_app()
        app.app_context().push()
        # create tables in sqlite database file
        if choice == "create":
            db.create_all()
            print("Database tables created")
        # drop all tables and clear db
        elif choice == "drop":
            db.drop_all()
            print("Database tables deleted")
        # populate tables with dummy data
        elif choice == "seed":
            populate()
            print("Database populated")
        else:
            raise Exception
    except Exception as e:
        print(e)
