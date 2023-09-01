from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from collections import defaultdict
from datetime import datetime

import csv
import json
import base64
import requests

# Custom login view for token-based authentication
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
        })

def csv_to_json(csv_filename, delimiter=','):
    data = []
    try:
        with open(csv_filename, 'r', encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file, delimiter=delimiter)
            for row in csv_reader:
                data.append(row)
    except Exception as e:
        print(f"Error reading CSV file: {e}")
    return data

# TODO: not working
def get_vcom_data():
    api_key = "gpbgpSav1s"
    username = "wanda_majikijela"
    password = "solar_meteo2022"

    url = "https://api.meteocontrol.de/v2/systems/abbreviations"
    credentials = base64.b64encode(f"{username}:{password}".encode()).decode()
    headers = {
        "Authorization": f"Basic {credentials}",
        "X-API-KEY": api_key
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        return None


def power_data(request):
    data = csv_to_json('data/UCT_Drawing_School_2023_08_01_2023_08_06.csv', delimiter=";")  # Replace with the correct path to your power data CSV file
    return JsonResponse(data, safe=False)


# TODO: test data format, also change to show each story if necessary
def water_data(request):
    csv_data = csv_to_json('data/University of Cape Town (UCT - School of Design) 01 Aug to 06 Aug 2023 Report Data.csv')
    
    # Initialize a dictionary to hold the transformed data
    transformed_data = defaultdict(list)

    # Iterate through the CSV data and populate the transformed_data dictionary
    for row in csv_data:
        timestamp = row['tstamp']
        meter_description = row['Meter Description']
        difference_kl = float(row['difference_kl'])  # Convert to float

        # Extract date and hour from timestamp
        dt_object = datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S')
        date_str = dt_object.strftime('%Y-%m-%d')
        hour_str = dt_object.strftime('%H')

        # Create a key for date, hour, and meter description
        key = f"{date_str} {hour_str} {meter_description}"

        # Aggregate difference_kl values
        if key in transformed_data:
            transformed_data[key] += difference_kl
        else:
            transformed_data[key] = difference_kl

    # Convert the dictionary into a list of dictionaries for the response
    response_data = []
    for key, value in transformed_data.items():
        date_str, hour_str, meter_description = key.split(" ")
        response_data.append({
            'date': date_str,
            'hour': hour_str,
            'Meter Description': meter_description,
            'difference_kl': value,
        })

    return JsonResponse(response_data, safe=False)


def vcom_data(request):
    data = get_vcom_data()
    if data is not None:
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({"error": "Unable to get data from VCOM API"}, status=500)

def csv_data(request):
    data = csv_to_json('data/UCT_Drawing_School_2023_08_02_2023_08_03.csv')
    return JsonResponse(data, safe=False)

def hello(request):
    return HttpResponse("Hello, World!")

def index(request):
    # Give user options to go to other available urls
    res = HttpResponse("You are at the index page. Here are some options:\n")
    res.write("1. /hello\n")
    res.write("2. /admin\n")
    res.write("3. /api\n")
    return res
