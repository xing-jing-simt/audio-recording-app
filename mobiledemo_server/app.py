from flask import Flask, request
from flask_cors import CORS
import base64
app = Flask(__name__)
CORS(app)

@app.route("/audio", methods=["POST"])
def receive_audio():
    b64 = request.json["base64"]
    if ',' in b64:
        b64 = b64.split(',')[1]
    decoded = base64.b64decode(b64)
    f = open('decoded.aac', 'wb')
    f.write(decoded)
    return {'message': 'success'}, 201
