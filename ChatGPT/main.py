import speech_recognition as sr
import pyttsx3
import voice as vc
from gtts import gTTS
import os
import playsound
import chatGPT
import requests

from pydub import AudioSegment
from pydub.playback import play

class Chatbot:
    KEYWORD = ["onni", "onni opas", "robotti", "palvelija", "orja"]
    LOCATIONS = {"kirjasto": 0, "wc": 1, "auditorio": 2, "kahvila": 3, "hissi": 4, "ruokala": 5}
    ROUTE_TRIGGERS = ["missä", "miten", "vie", "näytä", "johdata", "navigoi", "reitti", "mennään"]
    GREETINGS=["hei", "moi", "moikka", "tere", "terve"]
    GPT_KEYWORD=["kysymys", "kyssäri", "tiedätkö", "kerro", "mitä","kuinka","mihin","mikä", "haluan","voitko"
                 ,"voisitko","viitsitkö","viitsisitkö","kehtaatko","kuka","oletko","onko","haluatko","haluaisitko"]

    def __init__(self):
        self.initialize_components()
        self.chatgpt_instance = chatGPT.Chatgpt()

    def initialize_components(self):
        self.r = sr.Recognizer()
        self.m = sr.Microphone()
        self.engine = pyttsx3.init()
        self.engine.setProperty('rate', 150)
        self.engine.connect('started-utterance', lambda name: self.stop())
        self.engine.connect('finished-utterance', lambda name, completed: self.listen())

    def _callback(self, recognizer, audio):
        try:
            words = recognizer.recognize_google(audio, language="fi-FI").lower()
            print(f">>>Asiakas: {words}\n")
            if any(keywords in words for keywords in self.KEYWORD):
                self.handle_keyword(words)
            elif any(greetings in words for greetings in self.GREETINGS):
                self.say("Hei olen Onni-Opas, kuinka voin auttaa?")
            else:
                print("Onni-Opas: Muista kutsua minua Onni-Oppaaksi kysymyksen alussa.")

        except sr.UnknownValueError:
            print("Admin: OnniTulkki_11928.exe ei käynnisty. Esitä kysymys uudestaan.\n")
        except sr.RequestError as e:
            print(f"Could not request results from Google Speech Recognition service; {e}")

    def communicate_with_mir_api(self, room_num):
        try:
            # Make a request to the MiR API
            api_url = "http://localhost:8000/MiR_api"  # Update the URL based on your actual API endpoint
            payload = {"room_num": room_num}
            response = requests.post(api_url, json=payload)

            # Check the response status and handle accordingly
            if response.status_code == 200:
                result = response.json()
                return {"success": True, "result": result}
            else:
                return {"success": False, "error": f"MiR API request failed with status code {response.status_code}"}

        except Exception as e:
            # Handle exceptions appropriately
            return {"success": False, "error": str(e)}

    def handle_keyword(self, words):
        try:
            if any(keyword in words for keyword in self.ROUTE_TRIGGERS):
                location = next((loc for loc in self.LOCATIONS if loc in words), None)
                print("testi 1 "+location)

                #Ensimmäinen osa chatgpt
                if location:
                    print(f"-> Paikka jonne sinut johdatan: {location}")
                    vastaus = vc.route(self.LOCATIONS[location])
                    result = self.communicate_with_mir_api(self.LOCATIONS[location])
                    self.say("Opastan sinut paikkaan: "+str(location)+". Seuraa minua")
            elif any(keyword in words for keyword in self.GPT_KEYWORD):
                question = next((loc for loc in self.GPT_KEYWORD if loc in words), None)
                if question:
                    self.say("Pieni hetki prosessoin pyyntöä...")
                    response = self.chatgpt_instance.gpt_query(str(words)) # kysely chat GPT:lle
                    self.say(response)

            else:
                self.say(f'tuo ei ollut paikka eikä kysymys! joten en voi auttaa sinua.')
        except Exception as e:
            print(f'Virhe käsittelyssä: {e}')

    def listen(self):
        print("Admin: Muistin pyyhintä protokolla v0.116...")
        self.m = sr.Microphone()
        print("Admin: Uudelleen käynnistetään järjestelmää...")
        with self.m as source:
            self.r.adjust_for_ambient_noise(source)
        self.stop_listening = self.r.listen_in_background(self.m, lambda recognizer, audio: self._callback(recognizer, audio))
        print("Admin: Järjestelmä päivitetty onnistuneesti! OnniOpas.exe käynnistetty. \n")

    def start(self):
        self.listen()
        self.engine.startLoop()
        self.listening = True
        while self.listening:
            self.engine.iterate()
        self.endLoop()
        self.stop()

    def stop(self):
        print("*Kuuntelulaitteiden yhteydet katkaistu*")
        self.stop_listening()

    def say(self, msg):
        print(f"Onni-opas: {msg}")

        try:
            speech = gTTS(msg, lang="fi")
            speech_file = 'speech.mp3'
            speech.save(speech_file)
           # playsound.playsound(speech_file)

            # Lataa äänitiedosto pydubin AudioSegment-objektiin
            sound = AudioSegment.from_mp3(speech_file)

            # Kiihdytä äänentoistoa
            speeded_sound = sound.speedup(playback_speed=1.2)

            # Toista kiihdytetty äänitiedosto
            play(speeded_sound)

            
        except Exception as e:
            print(f'Error while handling speech: {e}')
            #self.engine.say(speech_file) #Tuon avamalla saa puheen takaisin

pop = Chatbot()
pop.start()
