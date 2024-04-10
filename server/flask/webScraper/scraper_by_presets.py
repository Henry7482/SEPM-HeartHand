import re
import requests 
from bs4 import BeautifulSoup 
import json

def scraper_by_presets(preset):
    # Request access to the website
    response = requests.get(preset["url"])

    # If get successful
    if response.status_code == 200:

        print('-> Extracting data from articles...')
        soup = BeautifulSoup(response.content, 'html.parser')

        # Get articles from the website
        articles_headers = soup.find_all(preset["article"]["tag"], class_=preset["article"]["class"], limit=5)
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
                print('-> Failed to retrieve data from one article.')
                continue

        # Extract data from articles
        scraped_data = []
        for article in articles:
            try:
                body = article["data"].find(preset["body"]["tag"], class_=preset["body"]["class"])
                if body:
                    title = body.find(preset["title"]["tag"], class_=preset["title"]["class"]).text.strip()

                    if preset["content"]["number_of_elements"] == 1:
                        for p in body.find_all(preset["content"]["tag"], class_=re.compile(preset["content"]["class"])):
                            content += "\n" + p.text.strip()
                    else:
                        content = body.find(preset["content"]["tag"].split(",")[0], class_=re.compile(preset["content"]["class"].split(",")[0])).text.strip()
                        for p in body.find_all(preset["content"]["tag"].split(",")[1], class_=re.compile(preset["content"]["class"].split(",")[1])):
                            content += "\n" + p.text.strip()
                    publish_date = body.find(preset["publish_date"]["tag"], class_=preset["publish_date"]["class"]).text.strip()
                    scraped_data.append({
                        "title": title,
                        "content": content,
                        "publish_date": publish_date,
                        "link": article["link"],
                    })
                else:
                    print("- Body element not found in the article.")
            except Exception as e:
                print('-> Failed to extract data from one article.' + ' Reason: ' + str(e))
                continue
        return scraped_data
    
    # If get failed
    else:
        print('-> Failed to retrieve data from the website.')
        return None


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

data = scraper_by_presets(vietnamnews_preset)
print(data)

def tester():
    data = {
        "one": 1,
        "two": 2,
        "three": 3
    }

    data_list = [data, data, data]

    main_list = [data]

    main_list += data_list
    print(main_list)


# tester()