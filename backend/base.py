from flask import Flask

api = Flask(__name__)

@api.route('/detect_wave')

def detect_wave():
    response_body = {
        "wave": True
    }

    return response_body
