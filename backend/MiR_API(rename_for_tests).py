# -*- coding: utf-8 -*-
"""
Niko Hutri 7.11.2023

PasilaHUB MIR API test
"""

##rom tkinter import *
#import pprint
#import RPi.GPIO as GPIO
import os
import requests, json
from flask import Blueprint, request, jsonify
import datetime

#pp = pprint.PrettyPrinter(indent=4)

# Pin Definitions
output_pin = 18  # BCM pin 18, BOARD pin 12
log_file_path = "activity_log.txt"


# Pin Setup:
#GPIO.setmode(GPIO.BCM)  # BCM pin-numbering scheme from Raspberry Pi
# set pin as an output pin with optional initial state of HIGH
#GPIO.setup(output_pin, GPIO.OUT, initial=GPIO.LOW)

#curr_value = GPIO.LOW
curr_value = False

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
    "150590c1-71ac-11ee-a445-000129922f30",     #1 - WC1 (in Kahvila)
    "37bdd030-71ac-11ee-a445-000129922f30",     #2 - Auditorio
    "c652434b-7254-11ee-a57f-000129922f30",     #3 - Kahvila 
    "e1246867-7254-11ee-a57f-000129922f30",     #4 - Hissit/Kirjasto
    "07417ecd-7255-11ee-a57f-000129922f30",     #5 - Ruokala         
    "bc4bab5e-82cc-11ee-973c-000129922f30"      #6 - WC2 / Ulysseus Toimisto 
]

def initializeLog():
    #Initialize log file with default counts
    with open(log_file_path, "w") as logFile:
        logFile.write("missions_posted: 0\nface-1: 0\nface-2: 0\nface-3: 0\nface-4: 0\nface-5: 0")

def updateLog(type, count=1):
    type = type.lower()

    if not os.path.exists(log_file_path):
        initializeLog()

    with open(log_file_path, "r") as logFile:
        lines = logFile.readlines()

    updated = False

    for i in range(len(lines)):
        if type in lines[i].lower():
            current_count = int(lines[i].split(":")[1])
            lines[i] = f"{type}: {current_count + count}\n"
            updated = True

    
    if not updated:
        lines.append(f"{type}: {count}\n")

    with open(log_file_path, "w") as logFile:
        logFile.writelines(lines)


mir_api = Blueprint("mir_api",__name__)

@mir_api.route("/feedback",methods=['POST'])
def saveFeedbackData():
    feedback_data = str(request.args.get('selectedFace'))

    updateLog(feedback_data)


    return jsonify({"status": "success"})


@mir_api.route("/MiR_api",methods=['POST'])
def post_missions():
    room_num = int(request.args.get('room_num'))
    
    mission_id = {"mission_id": missions[room_num]} #Mission guid here

    print("mission_id",mission_id)
    #post_mission = requests.post(host + 'mission_queue', json = mission_id, headers = headers)
    return mission_id
    #return "mission posted"

@mir_api.route("/MiR_api",methods=['GET'])
def get_missioncomplete():
    #check mission
    triggers = check_triggers()
    startIdle = triggers[0]

    if startIdle is True:
        response_body = {
            "returning_home": 1
        }
    else: 
        response_body = {
            "returning_home": 0
        }

    return response_body


class MockResponse:
    def __init__(self, text):
        self.text = text

  
def get_status():
    #status = requests.get(host + 'status', headers = headers)
    #print("status",status)
    api_response = {
        "battery_percentage": 75,
        "mission_text": "Charging... Waiting for new mission...",
        "state_text": "Executing"
        # Add other fields as needed
    }

    status_string = json.dumps(api_response)
    status = MockResponse(status_string)

    return status.text

data = json.loads(get_status())

# deletes mission queue, then starts charging
def charge_powerbank():
    mission_id = {"mission_id": missions[7]} #Mission guid here
    print("mission_id",mission_id)
    requests.delete(host + 'mission_queue', headers = headers)
    requests.post(host + 'mission_queue', json = mission_id, headers = headers)

def returnToIdle():
    mission_id = {"mission_id": missions[8]} #Mission guid here
    print("mission_id",mission_id)
    requests.post(host + 'mission_queue', json = mission_id, headers = headers)

def check_triggers():
    #Define global variables.
    global powerbank_flag
    global status_check
    global data
    global curr_value
    global is_force_charging
    global mission_count
    global status_json
    
    
    
    current_time = datetime.datetime.now()
    
    triggers = [False, False]   # triggers[0] = True for idle screen / triggers[1] = not used.
    if time.time() - status_check >= 1: #send a new API call to MiR every 3 seconds.
        data = json.loads(get_status())
        status_check = time.time()
        
    
    
    mission_text = data.get("mission_text")
    state_text = data.get("state_text")
    battery = data.get("battery_percentage")
    battery_rounded = int(round(battery))
    string = "Charging until battery reaches 50% (Current: " + str(battery_rounded) + "%)..."
    state_id = int(data.get("state_id"))
    #print(state_id)
    
    
    print("Powerbank flag is " + str(powerbank_flag))
    print("Current relay value is " + str(curr_value))
    print("Current hour is " + str(current_time.hour))
    print("Current battery is " + str(battery_rounded))
    print("is_force_charging is " + str(is_force_charging))
          
    
    
    #if emergency stop is engaged for atleast 3 seconds deletes the mission queue and checks the battery level and returns to idle or charger
    if state_text == "EmergencyStop":
        requests.delete(host + 'mission_queue', headers = headers)
    	#time.sleep(50)
        returnToIdle()
        
    if state_text == "Error":
        requests.delete(host + 'mission_queue', headers = headers)
    	
        requests.put(host + 'status', json = error_json, headers = headers)
        returnToIdle()
    
    # if mir is paused(state-id #4), unpause MiR(state-id #3)
    if state_id == 4:
        requests.put(host + 'status', json = status_json, headers = headers)
    	#print(x)

    # check to make sure that powerbank doesn't drain MiR batteries while not in charger
    if not powerbank_flag and curr_value == 1:
        GPIO.output(output_pin, GPIO.LOW)
        curr_value = 0

    #  While not in charger unhook the powerbank charging  
    if not mission_text == "Charging... Waiting for new mission...":
        GPIO.output(output_pin, GPIO.LOW)
        curr_value = 0
        
    # While mission is running, go to idle screen    
    if mission_text == string and state_text == "Executing":
        triggers[0] = True
        
    
    
    # if MiR is waiting for a mission in charger, set the relay to charge the power-bank
    if mission_text == "Charging... Waiting for new mission...":
        triggers[0] = True

        if powerbank_flag:
            GPIO.output(output_pin, GPIO.HIGH)
            curr_value = 1
    
        else: 
            GPIO.output(output_pin, GPIO.LOW)
            curr_value = 0

    # if battery is under 10% and not already in charger, start charging
    if battery_rounded < 48 and not is_force_charging:
        charge_powerbank()
        is_force_charging = True
        
    if is_force_charging:
    	
    	if battery_rounded >49:
            is_force_charging = False
    

    # if ready for new mission go to idle screen
    if mission_text == "Waiting for new missions..." and state_text == "Ready":
        triggers[0] = True

    # Check if the current time is past 6 and the function hasn't been called yet
    if current_time.hour > 6 and powerbank_flag:
        returnToIdle()
        powerbank_flag = False

    # Check if the current time is between 2 AM and 6 AM
    #if 1 <= current_time.hour <= 5 and not powerbank_flag:
    if current_time.hour > 21 or current_time.hour <= 6 and not powerbank_flag:
        powerbank_flag = True
        charge_powerbank()
        
    return triggers


