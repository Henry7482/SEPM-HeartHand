from flask import Flask
import requests
from webScraper.webScraper import scrape_news

app = Flask(__name__)

@app.route("/")
def hello():
    return "<p>Welcome to HeartHand's Flask server!</p>"

@app.route("/upload", methods=['POST'])
def uploadData():
    try:
        # Scrape news data
        print('=> Scraping data from websites...')
        dictToSend = scrape_news()
        print('=> Sending data to MongoDB...')
        res = requests.post('https://hearthand.onrender.com/api/v1/scraperdata', json=dictToSend)
        # print ('Response from node server:',res.text)
        if res.status_code == 200:
            return {
                "message": "<p>Successfully upload scraper data to MongoDB!",
                "Response from node server:": res.json().get('message'),
                "Data uploaded:": dictToSend
            }
        else:
            return {
                "message": "Failed to upload scraper data to MongoDB!",
                "Response from node server:": res.json().get('message'),
                "Data uploaded:": dictToSend
            }
    except Exception as e:
        return {
            "message": "An error occurred while uploading scraper data to MongoDB!",
            "Error message:": str(e)
        }

# For local testing purposes
# def create_app():
#    return app