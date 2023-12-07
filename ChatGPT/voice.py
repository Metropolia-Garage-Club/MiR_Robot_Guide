import requests
import json

SERVER_IP = "192.168.0.52"
URL= f"http://{SERVER_IP}"+"/api/v2.0.0/"+"mir_api"

headers = {}
headers['Content-Type']= 'application/json'
headers['Authorization'] = 'Basic ZGlzdHJpYnV0b3I6YjcyZDlkYzljMWYzNjg2MTBiMzBiZTJjZDc5OTAwOTAzYzk5MDYzNzA3NTY3M2NkMzliYjA4ZmJjYjc2YmIzYQ=='


#Reitti robotille -> käyttää mir_api:n API:a

def route(num):
    data = {"room_num": num}
    try:
        print (json.dumps(data))
        response = requests.post(URL, json.dumps(data), headers=headers, timeout=5)  # Set a timeout value in seconds
        response.raise_for_status()  # Raise an error for bad responses (4xx or 5xx)
        print("Route() suorittaminen onnistui")
        return response.json()["status"]
    
    except requests.exceptions.ConnectTimeout as e:
        print(f"Connection to {URL} timed out. Please check server availability and response time.")
        pass
    except requests.exceptions.RequestException as e:
        print(f"An error occurred during the request: {e}")
        pass
    return None  