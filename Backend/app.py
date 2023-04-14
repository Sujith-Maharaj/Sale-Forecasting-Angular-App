from flask import Flask ,request, jsonify
from flask_cors import CORS
import pymongo
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.statespace.sarimax import SARIMAX
import matplotlib.pyplot as plt

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
    

@app.route('/predict', methods=["POST"])
def forecast_sales():
    file = request.files['file']
    forecast_type = request.form['forecast_type']
    periodicity = int(request.form['periodicity'])

    sales_data = pd.read_csv(file)

    sales_data['Date'] = pd.to_datetime(sales_data['Date'], format='%Y-%m')
    sales_data.set_index('Date', inplace=True)

    monthly_sales_data = sales_data.resample('m').sum()

    yearly_sales_data = sales_data.resample('Y').sum()

    # Function to train arima model
    def train_arima_model(data):
        model = ARIMA(data, order=(1,0,0))
        model_fit = model.fit()
        return model_fit
    
    #Function to train sarima model
    def train_sarima_model(data):
        model = SARIMAX(data, order=(1,0,0), seasonal_order=(0,1,1,12))
        model_fit = model.fit()
        return model_fit

    if forecast_type == 'monthly':
        arima_model_monthly = train_arima_model(monthly_sales_data['Price'])
        sarima_model_monthly = train_sarima_model(monthly_sales_data['Price'])
        arima_forecast = arima_model_monthly.forecast(steps=25)
        sarima_forecast = sarima_model_monthly.forecast(steps=25)
    elif forecast_type == 'yearly':
        arima_model_yearly = train_arima_model(yearly_sales_data['Price'])
        sarima_model_yearly = train_sarima_model(yearly_sales_data['Price'])
        arima_forecast = arima_model_yearly.forecast(steps=periodicity)
        sarima_forecast = sarima_model_yearly.forecast(steps=periodicity)

    # Plot ARIMA forecast
    plt.figure(figsize=(10, 5))
    plt.plot(arima_forecast, label='ARIMA Forecast')
    plt.xlabel('Time')
    plt.ylabel('Sales')
    plt.title('ARIMA Forecast of Sales')
    plt.legend()
    plt.savefig('arima_forecast.png')  # Save plot as image file

    # Plot SARIMA forecast
    plt.figure(figsize=(10, 5))
    plt.plot(sarima_forecast, label='SARIMA Forecast')
    plt.xlabel('Time')
    plt.ylabel('Sales')
    plt.title('SARIMA Forecast of Sales')
    plt.legend()
    plt.savefig('sarima_forecast.png')  # Save plot as image file

    plt.close()  # Close plot

    forecastedData = {
        'arima_forecast': arima_forecast.to_list(),
        'sarima_forecast': sarima_forecast.to_list()
    }
    return jsonify(forecastedData)


# lets run our app
if __name__ == '__main__':
    app.run(debug=True)