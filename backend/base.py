#https://stackoverflow.com/questions/40706854/splitting-a-flask-app-into-multiple-files

from flask import Flask #, Blueprint
from wave_detection import wave_api

main_api = Flask(__name__)

main_api.register_blueprint(wave_api)
#main_app.register_blueprint(mir_api)
