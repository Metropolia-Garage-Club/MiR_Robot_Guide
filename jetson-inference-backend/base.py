from flask import Flask

api = Flask(__name__)

file_name = "wave_data.txt"

@api.route("/jetson_wave",methods=['GET'])
def get_wave():
	file = open(file_name,"r")
	response_body = file.read()
	file.close()
	
	print(response_body)	
	return response_body

if __name__ == "__main__":
	app.run(host='0.0.0.0',port=5001)
