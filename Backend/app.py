from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import pymongo
from model import forecast_sales

# creating the Flask app
app = Flask(__name__)
cors = CORS(app)

# MongoDB Connection
client = pymongo.MongoClient("mongodb+srv://Sujith:Sujith@samplecluster.lachpx6.mongodb.net/?retryWrites=true&w=majority")
db = client.get_database("users")
user = db.users


@app.route('/signup', methods=['POST'])
def signup():
    email = request.json['email']
    password = request.json['password']
    if email and password:
        result = user.insert_one({
            'email': email,
            'password': password
        })
        return f'User added successfully with ID {result.inserted_id}', 201
    else:
        return 'provide both email and password', 400
    

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user_found = user.find_one({"email": email})
    if user_found and password == user_found.get('password'):
        return jsonify({'message': "Success"}),200
    else:
        return jsonify({'message': "Invalid email or password"}),401
    

@app.route('/predictions', methods = ['GET'])
def get_predictions():
    data_path = ""
    forecast_type = request.form.get('forecast_type')
    periodicity = int(request.form.get('periodicity'))

    try:
        forecasted_data = forecast_sales(data_path, forecast_type, periodicity)
        return jsonify(forecasted_data)
    except ValueError as e:
        return jsonify({'error': str(e)}),400


# lets run our app
if __name__ == '__main__':
    app.run(debug=True)