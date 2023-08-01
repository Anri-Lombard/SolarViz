import requests
import json

# Open the JSON file
with open('api.json') as f:
    api_data = json.load(f)

# Extract the API key and other data from the JSON file
api_key = api_data['siteDataCollection']['C36EM']['apiKey']
site_key = api_data['siteDataCollection']['C36EM']['siteKey']
dashboard_url = api_data['siteDataCollection']['C36EM']['dashboardUrl']

# Replace with the actual API endpoint
url = dashboard_url + "/siteDataCollection/" + site_key

headers = {
    "apiKey": api_key
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(json.dumps(data, indent=4))
else:
    print(f"Request failed with status code {response.status_code}")
