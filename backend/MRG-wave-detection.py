##docker/run.sh --volume ~/MiR_Robot_Guide:/MiR_Robot_Guide
##python3 /MiR_Robot_Guide/MRG-wave-detection.py
##xkill -> 

import jetson.inference
import jetson.utils

net = jetson.inference.actionNet("resnet-18") ##, threshold=0.5)
camera = jetson.utils.videoSource("/dev/video0")
display = jetson.utils.videoOutput()
font = jetson.utils.cudaFont()

while True:
	img = camera.Capture()
	class_id, confidence = net.Classify(img)
	class_desc = net.GetClassDesc(class_id)
	
	if class_desc == 'waving':
		# perform a custom action
		#print(class_desc)
		#print('Hello! ^_^')
		
		x = int(img.width/2)
		y = int(img.height/2)
		font.OverlayText(img, img.width, img.height, "Hello! ^_^", x, y, font.White, font.Gray40)


	# overlay the result on the image	
	font.OverlayText(img, img.width, img.height, "{:05.2f}% {:s}".format(confidence * 100, class_desc), 5, 5, font.White, font.Gray40)

	
	display.Render(img)
	display.SetStatus("Object Detection | Network {:.0f} FPS".format(net.GetNetworkFPS()))
	
	# exit on input/output EOS
	if not camera.IsStreaming() or not display.IsStreaming():
		break
