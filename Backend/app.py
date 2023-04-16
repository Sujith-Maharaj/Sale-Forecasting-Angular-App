import os
from flask import Flask ,request, jsonify, send_file
from flask_cors import CORS
import pymongo

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
        return f'User added successfully with ID {result.inserted_id}', 200
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
    

@app.route('/predict', methods=["GET","POST"])
def forecast_sales():
    # Get file, forecast_type, and periodicity from request form
    file = request.form.get['file']
    forecast_type = request.form.get['forecast_type']
    periodicity = int(request.form.get['periodicity'])

    # Save uploaded file to a temporary location
    file.save('uploaded_file.csv')

    # Call forecast_sales function to generate forecasts
    forecasted_data = forecast_sales('uploaded_file.csv', forecast_type, periodicity)

    # Return the forecasted data as JSON response along with the saved plot images
    return_data = {
        'arima_forecast': forecasted_data['arima_forecast'],
        'sarima_forecast': forecasted_data['sarima_forecast']
    }

    # Send the saved plot images as file attachments in the JSON response
    return_data['arima_plot'] = send_file('arima_forecast.png', mimetype='image/png')
    return_data['sarima_plot'] = send_file('sarima_forecast.png', mimetype='image/png')

    # Clean up the temporary files
    os.remove('uploaded_file.csv')
    os.remove('arima_forecast.png')
    os.remove('sarima_forecast.png')

    return jsonify(return_data)


# lets run our app
if __name__ == '__main__':
    app.run(debug=True)