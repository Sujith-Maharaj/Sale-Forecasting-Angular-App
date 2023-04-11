import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.statespace.sarimax import SARIMAX

def forecast_sales(data_path, forecast_type, periodicity):

    sales_data = pd.read_csv(data_path)

    sales_data['Date'] = pd.to_datetime(sales_data['Date'])
    sales_data.set_index('Date', inplace=True)

    #Defining arima Model
    arima_model = ARIMA(sales_data['Sales'], order = (1,1,0))
    arima_results = arima_model.fit()

    #Defining Sarima Model
    sarima_model = SARIMAX(sales_data['Sales'], order=(1,1,0), seasonal_order=(1,1,0,12))
    sarima_results = sarima_model.fit()

    if forecast_type == 'monthly':
        arima_forecast = arima_results.forecast(steps = 12 * periodicity)
        sarima_forecast = sarima_results.forecast(steps = 12 * periodicity)
    elif forecast_type == 'yearly':
        arima_forecast = arima_results.forecast(steps = 1 * periodicity)
        sarima_forecast = sarima_results.forecast(steps = 1 * periodicity)

    forecasted_data = {
        'arima_forecast': arima_forecast.to_list(),
        'sarima_forecast': sarima_forecast.to_list()
    }

    return forecasted_data         
