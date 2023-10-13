# -*- coding: utf-8 -*-
"""
Niko Hutri 13.10.2023

PasilaHUB MIR API test
"""

from tkinter import *
import requests, json

#get request
ip = '192.168.0.61'
host = 'http://' + ip + '/api/v2.0.0/'

#Format Headers
headers = {}
headers['Content.Type']= 'application/json'
headers['Authorization'] = 'Basic ZGlzdHJpYnV0b3I6YjcyZDlkYzljMWYzNjg2MTBiMzBiZTJjZDc5OTAwOTAzYzk5MDYzNzA3NTY3M2NkMzliYjA4ZmJjYjc2YmIzYQ=='


def post_missions(host, headers):
    mission_id = {"mission_id": "19989020-6757-11ee-8e81-000129922f30"}
    post_mission = requests.post(host + 'mission_queue', json = mission_id, headers = headers)
    print(post_mission)
window = Tk()
window.title("MiR Rest Commands")
window.geometry("100x150")

btn1 = Button(window, text = "Go to place", command = post_missions(host, headers))
btn1.place(x=10, y=10)
window.mainloop()