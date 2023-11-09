# -*- coding: utf-8 -*-
"""
Niko Hutri 7.11.2023

PasilaHUB MIR API test
"""

##rom tkinter import *
import requests, json

#get request
ip = '192.168.0.51'
host = 'http://' + ip + '/api/v2.0.0/'

#Format Headers
headers = {}
headers['Content.Type']= 'application/json'
headers['Authorization'] = 'Basic ZGlzdHJpYnV0b3I6YjcyZDlkYzljMWYzNjg2MTBiMzBiZTJjZDc5OTAwOTAzYzk5MDYzNzA3NTY3M2NkMzliYjA4ZmJjYjc2YmIzYQ=='

missions = [
    ""
    ]

#you need one per mission
def post_missions(host, headers):
    mission_id = {"mission_id": "19989020-6757-11ee-8e81-000129922f30"} #Mission guid here
    post_mission = requests.post(host + 'mission_queue', json = mission_id, headers = headers)
    print(post_mission)
    
    
    
def get_status(host, headers):
    status = requests.get(host + 'status', headers = headers)
    print(status)
