<<<<<<< HEAD
from flask import Flask, Blueprint
import json

wave_detected = 0
idle_state = 1

wave_api = Blueprint("wave_api", __name__)

@wave_api.route("/detect_wave")
def detect_wave():
    file = open("wave.txt","r")
    wave_data = json.load(file)
    file.close()

    wave_detected = wave_data["wave_detected"]
    
    response_body = {
        "wave_detected": wave_detected
    }

    return response_body
=======
from flask import Blueprint, request
import json

wave_detected = 0
isIdle = 1

wave_api = Blueprint("wave_api", __name__)

@wave_api.route("/detect_wave",methods=['GET'])
def detect_wave():
    global wave_detected
    global isIdle
    print("wave_detected",wave_detected)
    print("isIdle",isIdle)

    if (isIdle == 1):
        ## need to change this from opening a file to an api call
        file = open("wave.txt","r")
        wave_data = json.load(file)
        file.close()
        ##

        print(wave_data)
        wave_detected = wave_data["wave_detected"]
    
    response_body = {
        "wave_detected": wave_detected
    }

    return response_body

@wave_api.route("/detect_wave",methods=['POST'])
def idle_state():
    global wave_detected
    #global idle_state

    data = json.loads(request.data)
    
    if (data["idle_state"] == 0):
        idle_state = data["idle_state"]
        wave_detected = 0

        ##make a put api here
        #file = open("wave.txt","w")
        #file.write('{"wave_detected": '+str(wave_detected)+'}')
        #file.close()

    #print(idle_state)

    if (data["idle_state"] == 1):
        idle_state = data["idle_state"]

    return "idle state posted"
>>>>>>> main
