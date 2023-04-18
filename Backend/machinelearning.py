import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.statespace.sarimax import SARIMAX
import matplotlib.pyplot as plt


def forecast_sales(file, forecast_type, periodicity):

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
        arima_forecast = arima_model_monthly.forecast(steps=periodicity)
        sarima_forecast = sarima_model_monthly.forecast(steps=periodicity)
    elif forecast_type == 'yearly':
        arima_model_yearly = train_arima_model(yearly_sales_data['Price'])
        sarima_model_yearly = train_sarima_model(yearly_sales_data['Price'])
        arima_forecast = arima_model_yearly.forecast(steps=periodicity)
        sarima_forecast = sarima_model_yearly.forecast(steps=periodicity)

    # Plot ARIMA forecast
    plt.figure(figsize=(10, 5))
    plt.plot(arima_forecast, label='ARIMA Forecast')
    plt.xlabel('Date')
    plt.ylabel('Sales')
    plt.title('ARIMA Forecast of Sales')
    plt.legend()
    plt.savefig('arima_forecast.png')  # Save plot as image file

    # Plot SARIMA forecast
    plt.figure(figsize=(10, 5))
    plt.plot(sarima_forecast, label='SARIMA Forecast')
    plt.xlabel('Date')
    plt.ylabel('Sales')
    plt.title('SARIMA Forecast of Sales')
    plt.legend()
    plt.savefig('sarima_forecast.png')  # Save plot as image file

    plt.close()  # Close plot

    forecasted_data = {
        'arima_forecast': arima_forecast.to_list(),
        'sarima_forecast': sarima_forecast.to_list()
    }

    return forecasted_data         
