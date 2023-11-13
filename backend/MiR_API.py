# -*- coding: utf-8 -*-
"""
Niko Hutri 7.11.2023

PasilaHUB MIR API test
"""

##rom tkinter import *
#import pprint
import requests, json


#pp = pprint.PrettyPrinter(indent=4)

#get request
ip = '192.168.0.50'
host = 'http://' + ip + '/api/v2.0.0/'

#Format Headers
headers = {}
headers['Content-Type']= 'application/json'
headers['Authorization'] = 'Basic ZGlzdHJpYnV0b3I6YjcyZDlkYzljMWYzNjg2MTBiMzBiZTJjZDc5OTAwOTAzYzk5MDYzNzA3NTY3M2NkMzliYjA4ZmJjYjc2YmIzYQ=='

#Populate with Mission GUID#
missions = [
    "62cc1d9f-71ab-11ee-a445-000129922f30",     #0 - Ulyseus
    "150590c1-71ac-11ee-a445-000129922f30",     #1 - WC / Ulyseus toimisto
    "37bdd030-71ac-11ee-a445-000129922f30",     #2 - Auditorio
    "c652434b-7254-11ee-a57f-000129922f30",     #3 - Kahvila
    "e1246867-7254-11ee-a57f-000129922f30",     #4 - Hissit / Kirjasto
    "07417ecd-7255-11ee-a57f-000129922f30"      #5 - Ruokala
    ]



#you need one per mission
def post_missions(mission_num):
    
    mission_id = {"mission_id": missions[mission_num]} #Mission guid here
    post_mission = requests.post(host + 'mission_queue', json = mission_id, headers = headers)
    return post_mission
    
    
    
def get_status():
    status = requests.get(host + 'status', headers = headers)
    return status.text

def battery_val():
    data = json.loads(get_status())
    battery = data.get("battery_percentage")
    return battery


def check_triggers():
    triggers = [False, False]   # triggers[0] = True for idle screen / triggers[1] = setting relay.
    data = json.loads(get_status())
    mission_text = data.get("mission_text")
    state_text = data.get("state_text")
    battery = int(round(battery_val()))
    string = "Charging until battery reaches 95% (Current: " + str(battery) + "%)..."
    print(string)
    
   
    
    if mission_text == string and state_text == "Executing":
        triggers[0] = True
    
    if mission_text == "Charging... Waiting for new mission..." and state_text == "Executing":
        triggers[0] = True
        triggers[1] = True

    return triggers



print(check_triggers())





    
