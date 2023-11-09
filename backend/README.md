https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i

## Create virtual environment for backend (Windows)
cd backend <br>
py -m venv env

## Create virtual environment for backend (Linux)
cd backend <br>
python3 -m venv env

## Activate virtual environment
cd backend <br>
source env/bin/activate

## Install libraries (only when creating env)
pip install flask <br>
pip install python-dotenv

## Adding APIs
base.py should either have the data to be retrieved with GET, or interface with other python files or APIs to import data.
(Still need to figure out POST/PUT)
<br><br>
C - Create - POST<br>
R - Read - GET<br>
U - Update - PUT<br>
D - Delete - DELETE<br>

## backend/.flaskenv
FLASK_APP=base.py <br>
FLASK_ENV=development
