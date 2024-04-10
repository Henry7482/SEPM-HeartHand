import requests
from bs4 import BeautifulSoup
from scraper_by_presets import scraper_by_presets

# Function scrape data tu website (demo)
def scrape_news():

    vnexpress_preset = {
        "url": "https://e.vnexpress.net/news/news/environment",
        "article": {
            "tag": "h2",
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
            "tag": "span, p",
            "class": "lead_post_detail row, Normal",
        },
        "publish_date": {
            "tag": "div",
            "class": "author",
        },
    }

    vietnamnews_preset = {
        "url": "https://www.vietnamnews.net/category/303b19022816233b",
        "article": {
            "tag": "h5",
            "class": "",
        },
        "body": {
            "tag": "div",
            "class": "large-12 columns",
        },
        "title": {
            "tag": "a",
            "class": "",
        },
        "content": {
            "number_of_elements": 1,
            "tag": "p",
            "class": "",
        },
        "publish_date": {
            "tag": "p",
            "class": "",
        },
    }


    scraped_data = []
    vnexpress_data = scraper_by_presets(vnexpress_preset)
    vietnamnews_data = scraper_by_presets(vietnamnews_preset)
    
    scraped_data += vnexpress_data
    
    json_data = {"data": scraped_data}
    print('-> Data extracted successfully.')
    return json_data


def tester():
    url = 'https://e.vnexpress.net/news/news/environment'

    response = requests.get(url)

    # If get successful
    if response.status_code == 200:

        soup = BeautifulSoup(response.content, 'html.parser')

        articles_headers = soup.find_all('h2', class_='title_news_site', limit=5) 

        articles_links = [article.find('a')['href'] for article in articles_headers]

        articles = []
        for link in articles_links:
            response = requests.get(link)
            if response.status_code == 200:
                articleDic = {}
                article = BeautifulSoup(response.content, 'html.parser')
                articleDic["data"] = article
                articleDic["link"] = link
                articles.append(articleDic)
            else:
                print('=> Failed to retrieve data from one website.')
                continue

    for article in articles:
        print(article.get("link"))
    

# tester()

data = scrape_news()
print(data)

