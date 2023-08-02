from django.http import HttpResponse
from django.http import JsonResponse
import csv
import json

def csv_to_json(csv_filename):
    data = []
    with open(csv_filename, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter=';')
        for row in csv_reader:
            data.append(row)
    # print(f"Data: {data}")
    return data

def csv_data(request):
    data = csv_to_json('data/UCT_Drawing_School_2023_07_01_2023_07_31.csv')
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
