##docker/run.sh --volume ~/jetson-backend:/jetson-backend
##cd /jetson-backend
##pip install python-dotenv
## flask run --host=0.0.0.0 --port=5001
##xkill -> 
#container id: cdd82e268c82
#sudo docker exec -it quirky_moore bash


import jetson.inference
import jetson.utils
from threading import Timer

detection = 0
net = jetson.inference.actionNet("resnet-18") ##, threshold=0.5)
camera = jetson.utils.videoSource("/dev/video0")
display = jetson.utils.videoOutput()
font = jetson.utils.cudaFont()
file_name = "wave_data.txt"

def detect_wave():
	global detection
	print("detect_wave was called")
	if detection == 1:
		response_body = {
			"wave_detected": 1	
		}

		detection = 0
	else:
		response_body = {
			"wave_detected": 0	
		}
	
	file = open(file_name,"w")
	file.write(str(response_body))
	file.close()
			
	return True
	
timer = Timer(0.5,detect_wave)
timer.start()


while True:
	img = camera.Capture()
	class_id, confidence = net.Classify(img)
	class_desc = net.GetClassDesc(class_id)
	
	
	if class_desc == 'waving' and detection == 0:
		detection = 1
		print(class_desc)


	# overlay the result on the image	
	#font.OverlayText(img, img.width, img.height, "{:05.2f}% {:s}".format(confidence * 100, class_desc), 5, 5, font.White, font.Gray40)

	
	display.Render(img)
	display.SetStatus("Object Detection | Network {:.0f} FPS".format(net.GetNetworkFPS()))
	
	# exit on input/output EOS
	if not camera.IsStreaming() or not display.IsStreaming():
		timer.cancel()
		break

