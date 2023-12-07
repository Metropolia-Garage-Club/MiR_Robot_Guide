import openai
import os

class Chatgpt:
    API_KEY="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"

    from openai import OpenAI


    def __init__(self):
        openai.api_key = self.API_KEY
        self.memory_size = 5
        self.query_history = []      # Säilytetään viisi viimeisintä kysymystä tässä
        self.response_history = []

    def readfile(self, file_path="ChatGPT/CourseInfo.txt"):
        try:
            # Hae nykyinen työhakemisto
            current_directory = os.getcwd()
            
            # Yhdistä nykyinen hakemisto ja tiedostonimi
            file_path = os.path.join(current_directory, file_path)
            print(file_path)


            with open(file_path, "r") as file:
                content = file.read()
            return str(content)
        except FileNotFoundError:
            return "Tiedostoa ei löydy"
        except Exception as e:
            return f"Virhe tiedoston lukemisessa: {e}"

    def gpt_query(self, query):
        # Rajoitetaan muistin pituus viiteen
        if len(self.query_history) == self.memory_size:
            self.query_history.pop(0)
            self.response_history.pop(0)

        # Lisätään uusi kysymys historiaan
        self.query_history.append(query)


        response =openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are Finnish speaking helpful assistant named Onni-opas that answers sarcastically questions only using the information provided in the kurssitiedot below, and if the answer is not contained within the kurssitiedot say 'En osaa vastata kysymykseen'."},
                {"role": "system", "content": "Kurssitiedot: \n\n" + self.readfile()},
            ] + [
                {"role": "user", "content": q} for q in self.query_history
            ] + [
                {"role": "assistant", "content": a} for a in self.response_history
            ] + [
                {"role": "user", "content": query}
            ]
            
        )

        query_response = response.choices[0].message.content

        # Lisätään uusi vastaus historiaan
        self.response_history.append(query_response)

        return query_response

# Käyttöesimerkki
#chatgpt_instance = Chatgpt()
#response = chatgpt_instance.gpt_query("Mitä kursseja on meneillään?")
#print(response)
#print(chatgpt_instance.readfile())