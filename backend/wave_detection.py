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