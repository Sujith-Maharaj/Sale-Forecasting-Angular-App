from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import pymongo

# creating the Flask app
app = Flask(__name__)
cors = CORS(app)

# MongoDB Connection
client = pymongo.MongoClient("mongodb+srv://Sujith:Sujith@samplecluster.lachpx6.mongodb.net/?retryWrites=true&w=majority")
db = client.get_database("users")
user = db.users

nos = user.count_documents({})
print("===========>" +str(nos) )

@app.route('/index')
def index():
    return jsonify({'message': 'Hello, World!'})

# lets run our app
if __name__ == '__main__':
    app.run(debug=True)