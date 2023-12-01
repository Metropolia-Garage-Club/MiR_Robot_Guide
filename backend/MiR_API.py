#import pprint
import os
import Jetson.GPIO as GPIO
import requests, json
from flask import Blueprint, request, jsonify
import datetime
import time

#pp = pprint.PrettyPrinter(indent=4)

# Pin Definitions
output_pin = 18  # BCM pin 18, BOARD pin 12
powerbank_flag = False # Global variable to track function calls
status_check = time.time()
log_file_path = "activity_log.txt"
is_force_charging = False
mission_count = 0
mission_queue_id = None

status_json = {"state_id": 3} #json-object used to unpause MiR
error_json = {"clear_error": True}


# Pin Setup:
GPIO.setmode(GPIO.BCM)  # BCM pin-numbering scheme from Raspberry Pi
# set pin as an output pin with optional initial state of HIGH
GPIO.setup(output_pin, GPIO.OUT, initial=GPIO.LOW)

curr_value = 0

# MiR100 address for API calls
ip = '192.168.0.52'
host = 'http://' + ip + '/api/v2.0.0/'

# Format Headers and authentication for API calls
headers = {}
headers['Content-Type']= 'application/json'
headers['Authorization'] = 'Basic ZGlzdHJpYnV0b3I6YjcyZDlkYzljMWYzNjg2MTBiMzBiZTJjZDc5OTAwOTAzYzk5MDYzNzA3NTY3M2NkMzliYjA4ZmJjYjc2YmIzYQ=='

# Populate with Mission GUID#
missions = [
    "62cc1d9f-71ab-11ee-a445-000129922f30",     #0 - Ulyseus
    "150590c1-71ac-11ee-a445-000129922f30",     #1 - WC1 (in Kahvila)
    "37bdd030-71ac-11ee-a445-000129922f30",     #2 - Auditorio
    "c652434b-7254-11ee-a57f-000129922f30",     #3 - Kahvila 
    "e1246867-7254-11ee-a57f-000129922f30",     #4 - Hissit/Kirjasto
    "07417ecd-7255-11ee-a57f-000129922f30",     #5 - Ruokala         
    "bc4bab5e-82cc-11ee-973c-000129922f30",     #6 - WC2 / Ulysseus Toimisto
    "b28d950c-83a1-11ee-ab62-000129922f30",     #7 - Forced charging
    "4e0f7633-83a0-11ee-ab62-000129922f30"      #8 - Do I need to charge (This is called automatically by MiR after every mission, generally this one does not need to be called separately)
]
#create log file with default counts
def initializeLog():
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

#All the diffrent API-blueprints are stored here
mir_api = Blueprint("mir_api",__name__)

@mir_api.route("/feedback",methods=['POST'])
def saveFeedbackData():
    feedback_data = str(request.args.get('selectedFace'))
    updateLog(feedback_data)
    return jsonify({"status": "success"})
    
@mir_api.route("/MiR_api",methods=['POST'])
def post_missions():
    data = json.loads(get_status())
    mission_queue_id = data.get("mission_queue_id")
    mission_text = data.get("mission_text")

    if mission_queue_id == None or mission_text == "Charging... Waiting for new mission...":
        room_num = int(request.args.get('room_num'))
        mission_id = {"mission_id": missions[room_num]} #Mission guid here
        print("mission_id",mission_id)

        post_mission = requests.post(host + 'mission_queue', json = mission_id, headers = headers)
        #post_mission = requests.delete(host + 'mission_queue', headers = headers)
        updateLog("missions_posted")
        return jsonify ({"status": str(post_mission)})
        #return "mission posted"

    else:
        return jsonify({"status": "Mission already in queue"})

@mir_api.route("/MiR_api",methods=['GET'])
def get_missioncomplete():
    #check mission
    triggers = check_triggers()
    startIdle = triggers[0] #charging starts

    if startIdle is True:
        response_body = {
            "returning_home": 1
        }
    else: 
        response_body = {
            "returning_home": 0
        }

    return response_body

# returns the current task MiR is executing  
def get_status():
    status = requests.get(host + 'status', headers = headers)
    print("status",status)
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
    if time.time() - status_check >= 3: #send a new API call to MiR every 3 seconds.
        data = json.loads(get_status())
        status_check = time.time()

    mission_text = data.get("mission_text")
    state_text = data.get("state_text")
    battery = data.get("battery_percentage")
    battery_rounded = int(round(battery))
    string = "Charging until battery reaches 40% (Current: " + str(battery_rounded) + "%)..."
    state_id = int(data.get("state_id"))
    #print(state_id)
    
    #if emergency stop is engaged for atleast 3 seconds deletes the mission queue and checks the battery level and returns to idle or charger
    if state_text == "EmergencyStop":
        requests.delete(host + 'mission_queue', headers = headers)
        returnToIdle()
    
    # if mir is paused(state-id #4), unpause MiR(state-id #3)
    if state_id == 4:
        x = requests.put(host + 'status', json = status_json, headers = headers)
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

    # if battery is under 15% and not already in charger, start charging
    if battery_rounded < 10 and not is_force_charging:
        charge_powerbank()
        is_force_charging = True
    else:
        is_force_charging = False

    # if ready for new mission go to idle screen
    if mission_text == "Waiting for new missions..." and state_text == "Ready":
        triggers[0] = True

    # Check if the current time is past 6 and the function hasn't been called yet
    if current_time.hour > 6 and powerbank_flag:
        returnToIdle()
        powerbank_flag = False

    # Check if the current time is between 2 AM and 6 AM
    if 1 <= current_time.hour <= 5 and not powerbank_flag:
        powerbank_flag = True
        charge_powerbank()
        
    return triggers
