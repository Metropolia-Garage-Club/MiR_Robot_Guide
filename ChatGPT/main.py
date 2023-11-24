import speech_recognition as sr
import pyttsx3
import ChatGPT as cb
class Chatbot:

    def __init__(self):
        self.r = sr.Recognizer()
        self.m = sr.Microphone()
        self.engine = pyttsx3.init()
        self.engine.setProperty('rate', 100)
        self.engine.connect('started-utterance', lambda name: self.stop())
        self.engine.connect('finished-utterance', lambda name, completed: self.listen())

    def _callback(self, recognizer, audio):
        try:
            words = recognizer.recognize_google(audio, language="fi-FI").lower()
            print("Asiakas: "+words+"\n")
            if "onni opas" in words:
                if "hei" in words:
                    self.say("Hei olen Onni-Opas kuinka voin auttaa?")

                elif "mitä" in words or "milloin" in words or "mitkä" in words:
                    vastaus= cb.chatbot(words)
                    self.say(vastaus+"\n")

                else:
                    self.say('Minulla ei ole lupaa vastata kysymykseen -> "' + words+'"')

            else:
                print("Onni-Opas: Muista kutsua minua Onni-Oppaaksi jokaisen kysymykssen alussa tai muuten en osaa vastata kysymkseen...")

        except sr.UnknownValueError:
            print("Admin: OnniTulkki_11928.exe ei käynnisty. Esitä kysymys uudestaan.\n")
        except sr.RequestError as e:
            print("Could not request results from Google Speech Recognition service; {0}".format(e))

    def listen(self):
        print("Admin: Muistin pyyhintä protokolla v0.116...")
        self.m = sr.Microphone()
        print("Admin: Uudelleen käynnistetään järjestelmää...")
        with self.m as source:
            self.r.adjust_for_ambient_noise(source)
        self.stop_listening = self.r.listen_in_background(self.m, lambda recognizer, audio: self._callback(recognizer, audio))
        print("Admin: Järjestelmä päivitetty onnistuneesti! OnniOpas.exe käynnistetty. \n")

    def start(self):
        self.listen();
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
        print("Onni-opas: " + msg)
        self.engine.say(msg)

pop = Chatbot()

pop.start();