from flask import Flask

app = Flask(__name__)

@app.route("/upload")
def uploadData():
    import requests
    dictToSend = {'question':'what is the answer?'}
    res = requests.post('http://localhost:5000/tests/endpoint', json=dictToSend)
    print ('response from server:',res.text)
    dictFromServer = res.json()
    return "<p>Hello, World!</p>"