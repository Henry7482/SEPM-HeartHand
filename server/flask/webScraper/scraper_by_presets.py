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
        # print(articles_headers)
        articles_links = [article.find('a')['href'] for article in articles_headers]
        # print(articles_links)
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
                body = article["data"].find(preset["body"]["tag"],id_= preset["body"]["id"], class_=preset["body"]["class"])
                print(body)
                if body:
                    title = body.find(preset["title"]["tag"], id_ = preset["title"]["id"], class_=preset["title"]["class"]).text.strip()

                    if preset["content"]["number_of_elements"] == 1:
                        for p in body.find_all(preset["content"]["tag"], id_ = preset["content"]["id"], class_=re.compile(preset["content"]["class"])):
                            content += "\n" + p.tex4t.strip()
                    else:
                        content = body.find(preset["content"]["tag"].split(",")[0], id_ = preset["content"]["id"].split(",")[0], class_=re.compile(preset["content"]["class"].split(",")[0])).text.strip()
                        for p in body.find_all(preset["content"]["tag"].split(",")[1], id_ = preset["content"]["id"].split(",")[1], class_=re.compile(preset["content"]["class"].split(",")[1])):
                            content += "\n" + p.text.strip()
                    publish_date = body.find(preset["publish_date"]["tag"], id_ = preset["publish_date]"]["id"], class_=preset["publish_date"]["class"]).text.strip()
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
        "id": "",
        "class": "title_news_site",
    },
    "body": {
        "tag": "div",
        "id": "",
        "class": "main_fck_detail",
    },
    "title": {
        "tag": "h1",
        "id": "",
        "class": "title_post",
    },
    "content": {
        "number_of_elements": 2,
        "tag": "span, p",
        "id": "",
        "class": "lead_post_detail row, Normal",
    },
    "publish_date": {
        "tag": "div",
        "id": "",
        "class": "author",
    },
}

vietnamplus_preset = {
    "url": "https://en.vietnamplus.vn/timkiem/vietnam-natural-disaster.vnp",
    "article": {
        "tag": "h3",
        "id": "",
        "class": "",
    },
    "body": {
        "tag": "div",
        "id": "",
        "class": "ExternalClass",
    },
    "title": {
        "tag": "h1",
        "id": "",
        "class": "details__headline cms-title",
    },
    "content": {
        "number_of_elements": 1,
        "tag": "div",
        "id": "",
        "class": "ExternalClass",
    },
    "publish_date": {
        "tag": "div",
        "id": "",
        "class": "source",
    },
}

tuoitrenews_preset = {
    "url": "https://tuoitrenews.vn/search?q=vietnam+flood",
    "article": {
        "tag": "h3",
        "id": "",
        "class": "",
    },
    "body": {
        "tag": "article",
        "id": "",
        "class": "art-body fck ui-rail",
    },
    "title": {
        "tag": "h1",
        "id": "",
        "class": "",
    },
    "content": {
        "number_of_elements": 1,
        "tag": "div",
        "id": "content-body",
        "class": "",
    },
    "publish_date": {
        "tag": "div",
        "id": "",
        "class": "date",
    },
}

data = scraper_by_presets(tuoitrenews_preset)
print(data)

# def tester():
#     data = {
#         "one": 1,
#         "two": 2,
#         "three": 3
#     }

#     data_list = [data, data, data]

#     main_list = [data]

#     main_list += data_list
#     print(main_list)


# tester()