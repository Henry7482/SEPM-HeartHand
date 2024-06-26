from flask import Flask
from flask_cors import CORS 
import requests
from webScraper.webScraper import scrape_news
from gpt.filterContent import filter_content
from gpt.generateBlogs import generate_blog

import gevent.monkey
gevent.monkey.patch_all()


def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route("/")
    def hello():
        return "<p>Welcome to HeartHand's Flask server!</p>"

    @app.route("/uploadscraper", methods=['POST'])
    def uploadData(dataToSend):
        try:
            print('=> Sending data to MongoDB...')
            res = requests.post('https://hearthand.onrender.com/api/v1/scraperdata', json=dataToSend)
            # print ('Response from node server:',res.text)
            if res.status_code == 200:
                return {
                    "message": "<p>Successfully upload scraper data to MongoDB!",
                    "Response from node server:": res.json().get('message'),
                    "Data uploaded:": dataToSend
                }, res.status_code
            else:
                return {
                    "message": "Failed to upload scraper data to MongoDB!",
                    "Response from node server:": res.json().get('message'),
                    "Data uploaded:": dataToSend
                }, res.status_code
        except Exception as e:
            return {
                "message": "An error occurred while uploading scraper data to MongoDB!",
                "Error message:": str(e)
            }

    @app.route("/generateblogs", methods=['POST'])
    def generateblogs():
        try:
            # Scrap news data
            print('=> Scraping data from websites...')
            newsData = scrape_news()

            # Filter news data
            print('=> Filtering news data...')
            titles = [article['title'] for article in newsData['data']]
            filteredTitles = filter_content(titles)
            filteredNews = []
            for article in newsData['data']:
                for title in filteredTitles:
                    if title in article['title']:
                        filteredNews.append(article)
                        break
            print("\033[92m-> Successfully filtered data.\033[0m")

            # Upload filtered news data to MongoDB
            print("-> Uploading data to MongoDB.")
            res = requests.post('https://hearthand.onrender.com/api/v1/scraperdata', json=filteredNews)
            if res != 200:
                print(res)
            else:
                print("\033[92m-> Successfully uploaded data to MongoDB.\033[0m")

            # Analyze news data
            print('=> Analyzing news data...')
            res = requests.post('http://128.199.116.9:8080/predict', json={"data": filteredNews})
            if res.status_code != 200:
                return {
                    "message": "Failed to analyze data!",
                    "Response from node server:": res.json().get('message'),
                    "Data analyzed:": filteredNews
                }
            prompts = res.json()
            print("\033[92m-> Successfully analyzed data.\033[0m")

            # Generate blogs
            print('=> Generating blogs...')
            generated_blogs = generate_blog(prompts)
            print("\033[92m-> Successfully generated blogs.\033[0m")

            # Upload generated blogs to MongoDB
            print('=> Sending generated blogs to MongoDB...')
            res = requests.post('https://hearthand.onrender.com/api/v1/generatedblogs', json=generated_blogs)
            if res.status_code != 201:
                return             {
                    "message": "Failed to generate blogs!",
                    "Response from node server:": res.json().get('message'),
                    "Generated blogs:": generated_blogs
                }
            else:
                print("\033[92m-> Successfully uploaded generated blogs to MongoDB.\033[0m")
                return {
                    "message": "Successfully generated blogs!",
                    "Response from node server:": res.json().get('message'),
                    "Generated blogs:": generated_blogs
                }

        except Exception as e:
            return {
                "message": "An error occurred while generating data!",
                "Error message:": str(e)
            }
    
    return app
