import requests
import json

def get_data(api_url, api_key):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }
    response = requests.get(api_url, headers=headers)
    
    print(f'Status code: {response.status_code}')
    print(f'Response text: {response.text}')
    
    if response.status_code == 200:
        return response.json()
    else:
        return None

api_url = 'http://public.solarmonitoring.net/dashboard/system/C36EM/gpbgpSav1s' # replace with your actual API URL
api_key = 'gpbgpSav1s' # replace with your actual API key

data = get_data(api_url, api_key)

if data is not None:
    print(json.dumps(data, indent=4))
else:
    print('Failed to retrieve data')
