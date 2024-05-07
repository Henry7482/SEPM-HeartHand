import requests
from .scraper_by_presets import scraper_by_presets
import json
import sys

# Function scrape data tu website (demo)
def scrape_news():
    # Extend the recursion limit of Python
    sys.setrecursionlimit(10000)

    vnexpress_preset = {
        "article": {
            "tag": "h4",
            "class": "title_news_site",
        },
        "body": {
            "tag": "div",
            "class": "main_fck_detail",
        },
        "title": {
            "tag": "h1",
            "class": "title_post",
        },
        "content": {
            "number_of_elements": 2,
            "tag": "span,p",
            "class": "lead_post_detail row,Normal",
        },
        "publish_date": {
            "tag": "div",
            "class": "author",
        },
    }


    tuoitrenews_preset = {
        "article": {
            "tag": "h3",
            "class": "",
        },
        "body": {
            "tag": "div",
            "class": "containter",
        },
        "title": {
            "parent": "article,art-header",
            "tag": "h1",
            "class": "",
        },
        "content": {
            "parent": "article,art-body",
            "number_of_elements": 1,
            "tag": "p",
            "class": "",
        },
        "publish_date": {
            "parent": "article,art-header",
            "tag": "div",
            "class": "date",
        },
    }

    scraped_data = []
    urls = ['https://e.vnexpress.net/search/q/natural%20disaster', 
            'https://tuoitrenews.vn/search?q=vietnam+flood',
            "https://e.vnexpress.net/search/q/poverty/media_type/all/search_f/title,lead/date_format/month",
            "https://tuoitrenews.vn/search?q=natural+disaster",
            "https://tuoitrenews.vn/search?q=disadvantaged#",
            "https://e.vnexpress.net/search/q/drought"]

    for url in urls:
        if 'vnexpress' in url:
            scraped_data += scraper_by_presets(vnexpress_preset, url)
        elif 'tuoitrenews' in url:
            scraped_data += scraper_by_presets(tuoitrenews_preset, url)
        
    json_data = {"data": scraped_data}
    print("\033[92m=> SUCCESSFULLY EXTRACTED " + str(len(scraped_data)) + " ARTICLES!\033[0m")
    return json_data


# def tester():
#     url = 'https://e.vnexpress.net/news/news/environment'

#     response = requests.get(url)

#     # If get successful
#     if response.status_code == 200:

#         soup = BeautifulSoup(response.content, 'html.parser')

#         articles_headers = soup.find_all('h2', class_='title_news_site', limit=5) 

#         articles_links = [article.find('a')['href'] for article in articles_headers]

#         articles = []
#         for link in articles_links:
#             response = requests.get(link)
#             if response.status_code == 200:
#                 articleDic = {}
#                 article = BeautifulSoup(response.content, 'html.parser')
#                 articleDic["data"] = article
#                 articleDic["link"] = link
#                 articles.append(articleDic)
#             else:
#                 print('=> Failed to retrieve data from one website.')
#                 continue

#     for article in articles:
#         print(article.get("link"))
    

# tester()

# data = scrape_news()
# # Write data to JSON file
# with open('./server/flask/webScraper/data.json', 'w') as file:
#     json.dump(data, file)

# print('-> Data written to data.json file.')

# # Read data from JSON file
# with open('./server/flask/webScraper/data.json', 'r') as file:
#     data = json.load(file)

# # Print out the "title" attribute
# for article in data['data']:
#     print(article['title'])
