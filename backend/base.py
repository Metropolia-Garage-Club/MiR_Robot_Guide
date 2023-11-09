from flask import Flask, render_template
import time
api = Flask(__name__)

wave_detected = False
last_action_time = time.time()

#Check if more than 5 minutes have passed without any new actions
def idle_check():
    current_time = time.time()
    return (current_time - last_action_time) > 300 #300 seconds = 5 minutes
    

@api.route('/detect_wave')

def detect_wave():
    response_body = {
        "wave": True
    }

    return response_body


@api.route('/')
def index():
    global wave_detected, last_action_time
    if not wave_detected and idle_check():
        return render_template('idle.js')
    elif wave_detected:
        return render_template('map1.js')
    elif False:
        return render_template('map2.js')
    else:
        return 'Unknown condition'
    
