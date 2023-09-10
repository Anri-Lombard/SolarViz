from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import GlobalSettings

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

@api_view(['POST'])
@permission_classes([permissions.IsAdminUser])
def update_global_settings(request):
    settings = GlobalSettings.load()

    # Update the settings based on the request data
    data = request.data
    
    colors = data.get('colors', {})
    settings.incomerPower = colors.get('incomerPower', settings.incomerPower)
    settings.solarPower = colors.get('solarPower', settings.solarPower)
    settings.secondary_storey_kitchen = colors.get('Secondary Storey Kitchen', settings.secondary_storey_kitchen)
    settings.second_storey_toilet = colors.get('Second Storey Toilet', settings.second_storey_toilet)
    settings.second_storey_ablution = colors.get('Second Storey Ablution', settings.second_storey_ablution)
    settings.ground_storey_toilet = colors.get('Ground Storey Toilet', settings.ground_storey_toilet)
    settings.ground_storey_hot_ablution = colors.get('Ground Storey Hot Ablution', settings.ground_storey_hot_ablution)
    settings.ground_storey_geyser = colors.get('Ground Storey Geyser', settings.ground_storey_geyser)
    settings.ground_storey_cold_ablution = colors.get('Ground Storey Cold Ablution', settings.ground_storey_cold_ablution)
    settings.first_storey_toilet = colors.get('First Storey Toilet', settings.first_storey_toilet)
    settings.first_storey_ablution = colors.get('First Storey Ablution', settings.first_storey_ablution)

    pieChart = data.get('pieChart', {})
    settings.pieChart_sequence = pieChart.get('sequence', settings.pieChart_sequence)
    settings.pieChart_duration = pieChart.get('duration', settings.pieChart_duration)
    settings.pieChart_display = pieChart.get('display', settings.pieChart_display)

    areaChart = data.get('areaChart', {})
    settings.areaChart_sequence = areaChart.get('sequence', settings.areaChart_sequence)
    settings.areaChart_duration = areaChart.get('duration', settings.areaChart_duration)
    settings.areaChart_display = areaChart.get('display', settings.areaChart_display)

    lineChart = data.get('lineChart', {})
    settings.lineChart_sequence = lineChart.get('sequence', settings.lineChart_sequence)
    settings.lineChart_duration = lineChart.get('duration', settings.lineChart_duration)
    settings.lineChart_display = lineChart.get('display', settings.lineChart_display)
    
    media = data.get('media', {})
    settings.media_sequence = media.get('sequence', settings.media_sequence)
    settings.media_display = media.get('display', settings.media_display)
    settings.media_audio = media.get('audio', settings.media_audio)


    settings.save()

    return Response({"message": "Global settings updated successfully"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_global_settings(request):
    settings = GlobalSettings.load()
    transformed_data = {
        'colors': {
            'incomerPower': settings.incomerPower,
            'solarPower': settings.solarPower,
            'Secondary Storey Kitchen': settings.secondary_storey_kitchen,
            'Second Storey Toilet': settings.second_storey_toilet,
            'Second Storey Ablution': settings.second_storey_ablution,
            'Ground Storey Toilet': settings.ground_storey_toilet,
            'Ground Storey Hot Ablution': settings.ground_storey_hot_ablution,
            'Ground Storey Geyser': settings.ground_storey_geyser,
            'Ground Storey Cold Ablution': settings.ground_storey_cold_ablution,
            'First Storey Toilet': settings.first_storey_toilet,
            'First Storey Ablution': settings.first_storey_ablution,
        },
        'pieChart': {
            'sequence': settings.pieChart_sequence,
            'duration': settings.pieChart_duration,
            'display': settings.pieChart_display,
        },
        'areaChart': {
            'sequence': settings.areaChart_sequence,
            'duration': settings.areaChart_duration,
            'display': settings.areaChart_display,
        },
        'lineChart': {
            'sequence': settings.lineChart_sequence,
            'duration': settings.lineChart_duration,
            'display': settings.lineChart_display,
        },
        'media': {
            'sequence': settings.media_sequence,
            'display': settings.media_display,
            'audio': settings.media_audio,
        },

    }
    return Response(transformed_data, status=status.HTTP_200_OK)



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
    data = csv_to_json('data/UCT_Drawing_School_2023_08_01_2023_08_31.csv', delimiter=";")
    
    # Replace negative values with 0
    for row in data:
        for key, value in row.items():
            try:
                if float(value) < 0:
                    row[key] = '0'
            except ValueError:
                # Skip if the value is not a number
                continue

    return JsonResponse(data, safe=False)


def standardize_description(meter_description):
    # Function to standardize the meter description names
    standardized_mapping = {
        'Secondary Storey - Kitchen': 'Secondary Storey Kitchen',
        'Second Storey - Toilet': 'Second Storey Toilet',
        'Second Storey - Ablution': 'Second Storey Ablution',
        'Ground Storey - Toilet': 'Ground Storey Toilet',
        'Ground Storey - Hot Ablution': 'Ground Storey Hot Ablution',
        'Ground Storey - Geyser': 'Ground Storey Geyser',
        'Ground Storey - Cold Ablution': 'Ground Storey Cold Ablution',
        'First Storey - Toilet': 'First Storey Toilet',
        'First Storey - Ablution': 'First Storey Ablution',
    }
    
    for key in standardized_mapping.keys():
        if key.lower() in meter_description.lower():
            return standardized_mapping[key]
    return meter_description  # return original if no match

def water_data(request):
    # Mapping of Meter Serial to Meter Description
    meter_description_mapping = {
        '8SEN0121279830': 'UCT D-School - Secondary Storey - Kitchen',
        '8SEN0121100508': 'UCT D-School - Second Storey - Toilet',
        '8SEN0121077871': 'UCT D-School - Second Storey - Ablution',
        '8SEN0121208690': 'UCT D-School - Ground Storey - Toilet',
        '8SEN0121138030': 'UCT D-School - Ground Storey - Hot Ablution',
        '8SEN0121077881': 'UCT D-School - Ground Storey - Geyser',
        '8SEN0121160337': 'UCT D-School - Ground Storey - Cold Ablution',
        '8SEN0120732796': 'UCT D-School - First Storey - Toilet',
        '8SEN0121077869': 'UCT D-School - First Storey - Ablution',
    }
    
    try:
        csv_data = csv_to_json('data/University of Cape Town (UCT - School of Design) 01 Aug to 06 Aug 2023 Report Data.csv')
    except FileNotFoundError:
        return JsonResponse({'error': 'CSV file not found'}, status=404)
    except csv.Error:
        return JsonResponse({'error': 'Invalid CSV format'}, status=400)  
    
    # Initialize a dictionary to hold the transformed data
    transformed_data = defaultdict(list)

    # Iterate through the CSV data and populate the transformed_data dictionary
    for row in csv_data:
        # Update the Meter Description using the mapping
        meter_serial = row['Meter Serial']
        row['Meter Description'] = meter_description_mapping.get(meter_serial, row['Meter Description'])
        
        # Standardize the Meter Description
        row['Meter Description'] = standardize_description(row['Meter Description'])
        
        timestamp = row['tstamp']
        meter_description = row['Meter Description']
        difference_kl = float(row['difference_kl'])  # Convert to float

        # Extract date and hour from timestamp
        dt_object = datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S')
        date_str = dt_object.strftime('%Y-%m-%d')
        hour_str = dt_object.strftime('%H')

        # Create a key for date, hour, and meter description using a unique delimiter
        key = f"{date_str}||{hour_str}||{meter_description}"  

        # Aggregate difference_kl values
        if key in transformed_data:
            transformed_data[key] += difference_kl
        else:
            transformed_data[key] = difference_kl

    # Convert the dictionary into a list of dictionaries for the response
    response_data = []
    for key, value in transformed_data.items():
        date_str, hour_str, meter_description = key.split("||")  # Use the same unique delimiter to split

        # Replace negative values with 0
        if value < 0:
            value = 0

        response_data.append({
            'date': date_str,
            'hour': hour_str,
            'Meter Description': meter_description,
            'difference_kl': value,
        })
    
    # Sort the list of dictionaries based on 'date' and 'hour'
    response_data.sort(key=lambda x: (x['date'], x['hour']))

    return JsonResponse(response_data, safe=False)


def vcom_data(request):
    data = get_vcom_data()
    if data is not None:
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({"error": "Unable to get data from VCOM API"}, status=500)

def csv_data(request):
    data = csv_to_json('data/UCT_Drawing_School_2023_08_01_2023_08_06.csv')
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

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([permissions.IsAdminUser])
def manage_admins(request):
    if request.method == 'GET':
        admins = User.objects.filter(is_staff=True)
        admin_data = [{"id": admin.id, "username": admin.username} for admin in admins]
        return Response(admin_data)

    elif request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        new_admin = User.objects.create_user(username=username, password=password, is_staff=True)
        new_admin.save()
        return Response({"message": "Admin added successfully"}, status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':
        admin_id = request.data.get('id')
        try:
            admin_to_remove = User.objects.get(id=admin_id)
            admin_to_remove.delete()
            return Response({"message": "Admin removed successfully"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "Admin not found"}, status=status.HTTP_404_NOT_FOUND)
