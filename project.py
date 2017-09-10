from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os
 
app = Flask(__name__)

# Set mongo DB connection
MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'data'
COLLECTION_NAME = 'projects'

# Main dashboard route
@app.route("/")
def index():
    return render_template("index.html")
 
# Route to get data from mongoDB
@app.route("/company/income")
def company_income():
    # Fields to retrieve from database
    FIELDS = {
        '_id': False, 'date': True, 'quantity': True, 'total': True, 'tip': True, 'type': True
    }
 
    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 55000
        projects = collection.find(projection=FIELDS, limit=55000)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(projects))
 
 
if __name__ == "__main__":
    app.run(debug=True)