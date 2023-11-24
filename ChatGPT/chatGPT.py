import openai
import numpy as np

#Key
openai.api_key = "APIKEY"

'''----------------------------------------------------------'''
query_list=["Hei"]
queryResponse_list=["Hei miten voin auttaa?"]


def readfile():
    file = open("CourseInfo.txt", "r")
    content = file.read()
    file.close()
    return str(content)

def chatbot(query):

  response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are Finnish speaking helpful assistant named Onni-opas that answers sarcastically questions only using the information provided in the kurssitiedot below, and if the answer is not contained within the kurssitiedot say 'En osaa vastata kysymykseen'." },
        {"role": "system", "content": "Kurssitiedot: \n\n" + readfile()},
        {"role": "user", "content": str(query_list[0])},
        {"role": "assistant","content":str(queryResponse_list[0])},
        {"role": "user", "content": query}
    ]
)
  query_response = response.choices[0].message["content"]
  queryResponse_list[0] = query_response
  query_list[0] = query

  return query_response