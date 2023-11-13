from MiR_API import check_triggers
import RPi.GPIO as GPIO
import time

# Pin Definitions
output_pin = 18  # BCM pin 18, BOARD pin 12

#check trigger for battery.
triggers = check_triggers


def main():
    # Pin Setup:
    GPIO.setmode(GPIO.BCM)  # BCM pin-numbering scheme from Raspberry Pi
    # set pin as an output pin with optional initial state of HIGH
    GPIO.setup(output_pin, GPIO.OUT, initial=GPIO.LOW)

    
    

    curr_value = GPIO.LOW
    try:
        while True:
            if triggers[0] and triggers[1] == True:
                GPIO.output(output_pin, GPIO.HIGH)

            else:
                GPIO.output(output_pin, GPIO.HIGH)


    finally:
        GPIO.cleanup()

if __name__ == '__main__':
    main()
