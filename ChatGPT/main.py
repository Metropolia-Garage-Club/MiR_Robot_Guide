import speech_recognition as sr
import pyttsx3
import voice as vc

class Chatbot:
    KEYWORD = "onni opas"
    LOCATIONS = {"kirjasto": 0, "wc": 1, "auditorio": 2, "kahvila": 3, "hissi": 4, "ruokala": 5}

    def __init__(self):
        self.initialize_components()

    def initialize_components(self):
        self.r = sr.Recognizer()
        self.m = sr.Microphone()
        self.engine = pyttsx3.init()
        self.engine.setProperty('rate', 100)
        self.engine.connect('started-utterance', lambda name: self.stop())
        self.engine.connect('finished-utterance', lambda name, completed: self.listen())

    def _callback(self, recognizer, audio):
        try:
            words = recognizer.recognize_google(audio, language="fi-FI").lower()
            print(f">>>Asiakas: {words}\n")
            if self.KEYWORD in words:
                self.handle_keyword(words)
            else:
                print("Onni-Opas: Muista kutsua minua Onni-Oppaaksi kysymyksen alussa.")

        except sr.UnknownValueError:
            print("Admin: OnniTulkki_11928.exe ei käynnisty. Esitä kysymys uudestaan.\n")
        except sr.RequestError as e:
            print(f"Could not request results from Google Speech Recognition service; {e}")

    def handle_keyword(self, words):
        if "hei" in words:
            self.say("Hei olen Onni-Opas, kuinka voin auttaa?")
        elif any(location in words for location in self.LOCATIONS):
            location = next((loc for loc in self.LOCATIONS if loc in words), None)
            print(f"->Paikka jonne sinut johdatan {location}")
            vastaus = vc.route(self.LOCATIONS[location])
            self.say(vastaus)
        else:
            self.say(f'Minulla ei ole lupaa vastata kysymykseen -> "{words}"')

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
        # self.engine.say(msg)

pop = Chatbot()
pop.start()
